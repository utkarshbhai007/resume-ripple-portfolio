
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface PortalRingProps {
  radius: number;
  speed: number;
  color: string;
  thickness?: number;
  noiseFrequency?: number;
}

const PortalRing = ({
  radius,
  speed,
  color,
  thickness = 0.2,
  noiseFrequency = 0.5
}: PortalRingProps) => {
  const ringRef = useRef<THREE.Mesh>(null!);
  const vertexCount = 64;
  
  // Create an array of points for the ring
  const points = Array.from({ length: vertexCount + 1 }, (_, i) => {
    const angle = (i / vertexCount) * Math.PI * 2;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    return new THREE.Vector3(x, 0, z);
  });
  
  // Create a curved tube along these points
  const tubeGeometry = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(points),
    72,
    thickness,
    16,
    true
  );
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(t * speed * 0.5) * 0.1;
      ringRef.current.rotation.y = t * speed * 0.3;
      ringRef.current.rotation.z = Math.cos(t * speed * 0.5) * 0.1;
    }
  });
  
  return (
    <mesh ref={ringRef} geometry={tubeGeometry}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
};

// Energy field that surrounds the portal
const EnergyField = ({ radius, color }: { radius: number; color: string }) => {
  const fieldRef = useRef<THREE.Mesh>(null!);
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (fieldRef.current && fieldRef.current.material) {
      fieldRef.current.rotation.y = t * 0.1;
      // Check if material is an array or single material
      const material = fieldRef.current.material as THREE.Material;
      if ('opacity' in material) {
        material.opacity = 0.3 + Math.sin(t * 2) * 0.1;
      }
    }
  });
  
  return (
    <mesh ref={fieldRef}>
      <sphereGeometry args={[radius * 1.2, 32, 32]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// Energy particles floating around the portal
const EnergyParticles = ({ count = 20, radius = 2, color = '#0efcb6' }) => {
  const points = useRef<THREE.Points>(null!);
  
  // Create random positions for the particles
  const particlesPosition = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radiusVariation = radius * (0.8 + Math.random() * 0.4);
    
    particlesPosition[i * 3] = Math.cos(angle) * radiusVariation;
    particlesPosition[i * 3 + 1] = (Math.random() - 0.5) * radius;
    particlesPosition[i * 3 + 2] = Math.sin(angle) * radiusVariation;
  }
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (points.current) {
      points.current.rotation.y = t * 0.05;
      
      // Animate each particle individually for a floating effect
      const positions = points.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(t * (0.5 + i * 0.04)) * 0.002;
      }
      points.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={color}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.8}
      />
    </points>
  );
};

// Complete Portal component
const Portal = () => {
  return (
    <group>
      {/* Multiple rings rotating at different speeds */}
      <PortalRing radius={2} speed={0.2} color="#0efcb6" thickness={0.05} />
      <PortalRing radius={1.7} speed={-0.3} color="#ff0eb6" thickness={0.04} />
      <PortalRing radius={1.4} speed={0.5} color="#ffffff" thickness={0.03} />
      
      {/* Energy field */}
      <EnergyField radius={1.5} color="#0efcb6" />
      
      {/* Floating particles */}
      <EnergyParticles count={30} radius={2.3} color="#0efcb6" />
      
      {/* Light sources */}
      <pointLight position={[0, 0, 0]} intensity={1} color="#0efcb6" distance={4} />
    </group>
  );
};

// Error boundary for catching Three.js errors
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('Three.js Error:', error);
  }

  render() {
    if (this.state.hasError) {
      return <div className="w-full h-full bg-background/50 flex items-center justify-center">
        <p className="text-accent">Loading 3D effects...</p>
      </div>;
    }

    return this.props.children;
  }
}

// Portal 3D component for export
const Portal3D: React.FC<{ className?: string; size?: string }> = ({ 
  className = "",
  size = "h-[250px]" 
}) => {
  return (
    <div className={`${size} w-full ${className}`}>
      <ErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.2} />
          <Portal />
          <Environment preset="night" />
          <ContactShadows
            opacity={0.2}
            scale={5}
            blur={3}
            far={10}
            resolution={256}
            color="#000000"
          />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
};

export default Portal3D;

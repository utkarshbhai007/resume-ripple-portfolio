
import React, { useRef, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { useFrame, Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

// Error boundary for catching Three.js errors
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
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

// Animated sphere component
const AnimatedSphere = () => {
  const sphere = useRef<THREE.Mesh>(null!);
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (sphere.current) {
      sphere.current.rotation.x = t * 0.15;
      sphere.current.rotation.y = t * 0.2;
    }
  });

  return (
    <Sphere ref={sphere} args={[1, 64, 64]} position={[0, 0, 0]} scale={2}>
      <MeshDistortMaterial 
        color="#0efcb6"
        attach="material" 
        distort={0.6} 
        speed={1.5} 
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
};

// Particles system
const ParticleField = () => {
  const particles = useRef<THREE.Points>(null!);
  const count = 1500;
  
  // Create particles
  const particlesPosition = new Float32Array(count * 3);
  const particlesScale = new Float32Array(count);
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    particlesPosition[i3] = (Math.random() - 0.5) * 10;
    particlesPosition[i3 + 1] = (Math.random() - 0.5) * 10;
    particlesPosition[i3 + 2] = (Math.random() - 0.5) * 10;
    particlesScale[i] = Math.random();
  }
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (particles.current) {
      particles.current.rotation.x = t * 0.05;
      particles.current.rotation.y = t * 0.075;
    }
  });

  // Create a simple texture for particles if spark1.png isn't loading
  const particleTexture = new THREE.TextureLoader().load('/spark1.png', 
    undefined, 
    (error) => {
      console.log("Fallback to default particle");
    }
  );

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          count={count}
          array={particlesScale}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ff0eb6"
        sizeAttenuation={true}
        transparent={true}
        alphaMap={particleTexture}
        depthWrite={false}
      />
    </points>
  );
};

// Main 3D background component
const HeroBackground3D: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-10 w-full h-full">
      <ErrorBoundary>
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1} color="#fff" />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ff0eb6" />
            <pointLight position={[0, 0, 0]} intensity={1} color="#0efcb6" />
            
            <AnimatedSphere />
            <ParticleField />
            
            <OrbitControls 
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.6}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
};

export default HeroBackground3D;

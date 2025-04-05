
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// DNA tech helix component
const TechHelix = (props: any) => {
  const group = useRef<THREE.Group>(null!);
  const particleCount = 50;
  const spread = 2;
  const radius = 1.2;
  const rotationSpeed = 0.2;
  const hoverDistance = 0.1;
  
  // Create particles for DNA strands
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 4;
      const helixX = Math.cos(angle) * radius;
      const helixY = (i / particleCount) * spread - spread / 2;
      const helixZ = Math.sin(angle) * radius;
      
      // Alternating particles for DNA strand connections
      if (i % 2 === 0) {
        temp.push({
          position: [helixX, helixY, helixZ],
          color: '#0efcb6',
          size: 0.05 + Math.random() * 0.05,
        });
      } else {
        temp.push({
          position: [helixX, helixY, helixZ],
          color: '#ff0eb6',
          size: 0.05 + Math.random() * 0.05,
        });
      }
      
      // Add connectors between strands
      if (i % 4 === 0 && i < particleCount - 2) {
        const nextAngle = ((i + 2) / particleCount) * Math.PI * 4;
        const nextX = Math.cos(nextAngle) * radius;
        const nextZ = Math.sin(nextAngle) * radius;
        
        // Connection points for the DNA "rungs"
        temp.push({
          position: [helixX, helixY, helixZ],
          connection: [nextX, helixY, nextZ],
          color: '#ffffff',
        });
      }
    }
    return temp;
  }, []);
  
  // Create floating code fragments
  const codeFragments = useMemo(() => {
    const fragments = [];
    const codeSnippets = [
      'const future = await skills.build()',
      '{ innovation, creativity }',
      'export default Success',
      '<Future />',
      'while(learning) { grow(); }',
    ];
    
    for (let i = 0; i < 5; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 1 + Math.random() * 2;
      
      fragments.push({
        position: [
          Math.cos(angle) * distance,
          (Math.random() * spread) - spread / 2,
          Math.sin(angle) * distance
        ],
        text: codeSnippets[i],
        rotation: [Math.random(), Math.random(), Math.random()],
        speed: 0.2 + Math.random() * 0.3,
      });
    }
    
    return fragments;
  }, []);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Rotate the entire structure
    if (group.current) {
      group.current.rotation.y = t * rotationSpeed;
      group.current.position.y = Math.sin(t * 0.5) * 0.05;
    }
    
    // Update positions of child meshes for animation effects
    if (group.current && group.current.children.length > 0) {
      group.current.children.forEach((child, i) => {
        // Apply subtle hover effect to particles
        if (i < particleCount * 2) {
          const idx = i % particleCount;
          const pulseSpeed = 1 + (idx % 5) * 0.2;
          const hoverOffset = Math.sin(t * pulseSpeed) * hoverDistance;
          
          // Access directly as a mesh
          const mesh = child as THREE.Mesh;
          if (mesh.position && i < particles.length) {
            const [x, y, z] = particles[i % particles.length].position;
            mesh.position.y = y + hoverOffset;
          }
        }
      });
    }
  });

  return (
    <group ref={group} {...props}>
      {/* Particle nodes */}
      {particles.map((particle, i) => (
        <mesh key={`particle-${i}`} position={new THREE.Vector3(...particle.position)}>
          <sphereGeometry args={[particle.size || 0.05, 16, 16]} />
          <meshStandardMaterial 
            color={particle.color} 
            emissive={particle.color} 
            emissiveIntensity={0.8} 
          />
        </mesh>
      ))}
      
      {/* Connection lines */}
      {particles
        .filter(p => p.connection)
        .map((particle, i) => {
          const start = new THREE.Vector3(...particle.position);
          const end = new THREE.Vector3(...(particle.connection as number[]));
          
          // Create a line connecting two DNA strand points
          const points = [start, end];
          const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
          
          return (
            <line key={`connection-${i}`} geometry={lineGeometry}>
              <lineBasicMaterial color={particle.color} opacity={0.6} transparent />
            </line>
          );
      })}
      
      {/* Holographic code fragments */}
      {codeFragments.map((fragment, i) => (
        <group 
          key={`fragment-${i}`} 
          position={new THREE.Vector3(...fragment.position)}
          rotation={new THREE.Euler(...fragment.rotation)}
        >
          <mesh>
            <planeGeometry args={[1, 0.2]} />
            <meshBasicMaterial 
              color="#0efcb6" 
              opacity={0.7} 
              transparent 
              side={THREE.DoubleSide} 
            />
          </mesh>
          {/* Text is simulated by the plane above - real text would require text geometries */}
        </group>
      ))}
      
      {/* Central core */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial 
          color="#ffffff"
          emissive="#0efcb6"
          emissiveIntensity={0.8}
          metalness={1}
          roughness={0.2}
        />
      </mesh>
      
      {/* Energy beams */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2;
        const x = Math.cos(angle) * 0.1;
        const z = Math.sin(angle) * 0.1;
        
        return (
          <mesh 
            key={`beam-${i}`}
            position={[x, 0, z]}
            rotation={[Math.PI/2, 0, angle]}
          >
            <cylinderGeometry args={[0.02, 0.02, spread, 8, 1, true]} />
            <meshStandardMaterial 
              color="#0efcb6"
              emissive="#0efcb6"
              emissiveIntensity={0.8}
              transparent
              opacity={0.4}
            />
          </mesh>
        );
      })}
      
      {/* Glowing light source */}
      <pointLight position={[0, 0, 0]} intensity={2} color="#0efcb6" distance={5} decay={2} />
    </group>
  );
};

// Main model viewer component
const ModelViewer: React.FC = () => {
  return (
    <div className="w-full h-[300px] md:h-[400px]">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 40 }}
      >
        <ambientLight intensity={0.3} />
        <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} castShadow />
        
        <TechHelix position={[0, 0, 0]} scale={1.2} />
        
        <Environment preset="city" />
        <ContactShadows 
          opacity={0.4} 
          scale={10} 
          blur={2} 
          far={10} 
          resolution={256} 
          color="#000000" 
        />
        
        <OrbitControls 
          enablePan={false} 
          enableZoom={false} 
          minPolarAngle={Math.PI / 3} 
          maxPolarAngle={Math.PI / 2.5}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default ModelViewer;

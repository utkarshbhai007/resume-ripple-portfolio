
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Laptop model component
const LaptopModel = (props: any) => {
  const group = useRef<THREE.Group>(null!);
  // NOTE: This path would need to be updated with a real laptop GLTF model
  // Since we don't have a real model, we'll create a simple 3D shape instead
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = Math.sin(t / 2) * 0.2;
      group.current.position.y = Math.sin(t / 1.5) * 0.1;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Laptop base */}
      <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.2, 2]} />
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Screen */}
      <group position={[0, 0.6, -0.9]} rotation={[Math.PI/6, 0, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3, 0.1, 2]} />
          <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Screen content - Using meshStandardMaterial instead of meshBasicMaterial */}
        <mesh position={[0, 0.06, 0]}>
          <planeGeometry args={[2.8, 1.8]} />
          <meshStandardMaterial 
            color="#0efcb6" 
            emissive="#0efcb6" 
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>
      
      {/* Keyboard */}
      <mesh position={[0, 0, 0.2]} rotation={[0, 0, 0]} castShadow receiveShadow>
        <planeGeometry args={[2.8, 1.4]} />
        <meshStandardMaterial color="#222" metalness={0.5} roughness={0.5} />
      </mesh>
      
      {/* Keyboard keys simulation */}
      {Array.from({ length: 6 }).map((_, row) => (
        Array.from({ length: 10 }).map((_, col) => (
          <mesh 
            key={`key-${row}-${col}`}
            position={[
              -1.2 + col * 0.25, 
              0.01, 
              -0.3 + row * 0.25
            ]} 
            castShadow
          >
            <boxGeometry args={[0.2, 0.05, 0.2]} />
            <meshStandardMaterial color="#333" metalness={0.5} roughness={0.5} />
          </mesh>
        ))
      ))}
      
      {/* Glowing elements */}
      <pointLight position={[0, 0.5, 0]} intensity={1} color="#0efcb6" />
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
        camera={{ position: [0, 1, 5], fov: 40 }}
      >
        <ambientLight intensity={0.3} />
        <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} castShadow />
        
        <LaptopModel position={[0, -0.8, 0]} scale={0.6} />
        
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
        />
      </Canvas>
    </div>
  );
};

export default ModelViewer;

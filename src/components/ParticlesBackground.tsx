
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticlesBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);
    
    camera.position.z = 30;

    // Create particles
    const particlesCount = window.innerWidth < 768 ? 500 : 1000;
    const particlesGeometry = new THREE.BufferGeometry();
    
    const positionArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    
    const colors = [
      new THREE.Color('#0efcb6'),  // Primary - neon teal
      new THREE.Color('#ff0eb6'),  // Secondary - neon pink
      new THREE.Color('#fffc0e'),  // Accent - neon yellow
    ];

    for (let i = 0; i < particlesCount; i++) {
      // Position
      positionArray[i * 3] = (Math.random() - 0.5) * 100;       // x
      positionArray[i * 3 + 1] = (Math.random() - 0.5) * 100;   // y
      positionArray[i * 3 + 2] = (Math.random() - 0.5) * 100;   // z
      
      // Color
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      colorArray[i * 3] = randomColor.r;
      colorArray[i * 3 + 1] = randomColor.g;
      colorArray[i * 3 + 2] = randomColor.b;
    }
    
    particlesGeometry.setAttribute(
      'position', 
      new THREE.BufferAttribute(positionArray, 3)
    );
    
    particlesGeometry.setAttribute(
      'color', 
      new THREE.BufferAttribute(colorArray, 3)
    );
    
    // Create material and points
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Mouse effect variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    // Handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    // Animation function
    const animate = () => {
      targetX = mouseX * 0.2;
      targetY = mouseY * 0.2;
      
      particles.rotation.x += 0.0003;
      particles.rotation.y += 0.0005;
      
      // Smooth follow for mouse movement
      particles.rotation.x += 0.05 * (targetY - particles.rotation.x);
      particles.rotation.y += 0.05 * (targetX - particles.rotation.y);
      
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      // Dispose resources
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10 pointer-events-none opacity-40"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default ParticlesBackground;

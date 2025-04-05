
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

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
    console.error('Particles Error:', error);
  }

  render() {
    if (this.state.hasError) {
      return <div className="fixed inset-0 -z-10 pointer-events-none opacity-40 bg-background"></div>;
    }

    return this.props.children;
  }
}

const ParticlesContent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
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

      // Create multiple particle systems for a more unique look
      const createParticleSystem = (count: number, size: number, color: THREE.Color, speedFactor: number) => {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        
        for (let i = 0; i < count * 3; i += 3) {
          // Create a spiral pattern
          const angle = (i / 3) * 0.01 * Math.PI * 2;
          const radius = Math.random() * 100;
          
          positions[i] = Math.cos(angle) * radius; // x
          positions[i + 1] = Math.sin(angle) * radius; // y
          positions[i + 2] = (Math.random() - 0.5) * 50; // z
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const material = new THREE.PointsMaterial({
          size: size,
          color: color,
          transparent: true,
          opacity: 0.7,
          sizeAttenuation: true,
        });
        
        const particles = new THREE.Points(geometry, material);
        particles.userData.speedFactor = speedFactor;
        scene.add(particles);
        
        return particles;
      };
      
      // Create three different particle systems
      const particlesSystem1 = createParticleSystem(200, 0.3, new THREE.Color('#0efcb6'), 1); // Primary (teal)
      const particlesSystem2 = createParticleSystem(150, 0.2, new THREE.Color('#ff0eb6'), 0.7); // Secondary (pink)
      const particlesSystem3 = createParticleSystem(100, 0.15, new THREE.Color('#fffc0e'), 0.5); // Accent (yellow)
      
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
        
        // Different rotation patterns for each system
        particlesSystem1.rotation.x += 0.0001 * particlesSystem1.userData.speedFactor;
        particlesSystem1.rotation.y += 0.0003 * particlesSystem1.userData.speedFactor;
        
        particlesSystem2.rotation.y += 0.0002 * particlesSystem2.userData.speedFactor;
        particlesSystem2.rotation.z += 0.0001 * particlesSystem2.userData.speedFactor;
        
        particlesSystem3.rotation.x += 0.0002 * particlesSystem3.userData.speedFactor;
        particlesSystem3.rotation.z -= 0.0001 * particlesSystem3.userData.speedFactor;
        
        // Smooth follow for mouse movement
        particlesSystem1.rotation.x += 0.03 * (targetY - particlesSystem1.rotation.x);
        particlesSystem1.rotation.y += 0.03 * (targetX - particlesSystem1.rotation.y);
        
        particlesSystem2.rotation.x += 0.02 * (targetY - particlesSystem2.rotation.x);
        particlesSystem2.rotation.y += 0.02 * (targetX - particlesSystem2.rotation.y);
        
        particlesSystem3.rotation.x += 0.01 * (targetY - particlesSystem3.rotation.x);
        particlesSystem3.rotation.y += 0.01 * (targetX - particlesSystem3.rotation.y);
        
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
        [particlesSystem1, particlesSystem2, particlesSystem3].forEach(system => {
          system.geometry.dispose();
          (system.material as THREE.PointsMaterial).dispose();
        });
        
        renderer.dispose();
      };
    } catch (error) {
      console.error("Error initializing particles:", error);
      return () => {}; // Empty cleanup function if we fail to initialize
    }
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10 pointer-events-none opacity-50"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

const ParticlesBackground: React.FC = () => {
  return (
    <ErrorBoundary>
      <ParticlesContent />
    </ErrorBoundary>
  );
};

export default ParticlesBackground;

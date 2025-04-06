
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
        antialias: true,
        powerPreference: "high-performance"
      });
      
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current.appendChild(renderer.domElement);
      
      camera.position.z = 30;

      // Create a DNA-like double helix structure
      const createDoubleHelix = (
        count: number, 
        radius: number, 
        height: number, 
        turns: number, 
        color1: THREE.Color, 
        color2: THREE.Color
      ) => {
        const strand1Points: THREE.Vector3[] = [];
        const strand2Points: THREE.Vector3[] = [];
        const connectionPoints: THREE.Vector3[][] = [];
        
        for (let i = 0; i <= count; i++) {
          const t = i / count;
          const angle = turns * Math.PI * 2 * t;
          
          // First strand
          const x1 = Math.cos(angle) * radius;
          const z1 = Math.sin(angle) * radius;
          const y1 = height * (t - 0.5);
          
          // Second strand (180 degrees offset)
          const x2 = Math.cos(angle + Math.PI) * radius;
          const z2 = Math.sin(angle + Math.PI) * radius;
          const y2 = height * (t - 0.5);
          
          strand1Points.push(new THREE.Vector3(x1, y1, z1));
          strand2Points.push(new THREE.Vector3(x2, y2, z2));
          
          // Create "rungs" of the DNA ladder every few points
          if (i % 5 === 0 && i < count) {
            connectionPoints.push([
              new THREE.Vector3(x1, y1, z1),
              new THREE.Vector3(x2, y2, z2)
            ]);
          }
        }
        
        // Create the first strand
        const strand1Geometry = new THREE.BufferGeometry().setFromPoints(strand1Points);
        const strand1Material = new THREE.LineBasicMaterial({ 
          color: color1,
          linewidth: 2,
        });
        const strand1 = new THREE.Line(strand1Geometry, strand1Material);
        
        // Create the second strand
        const strand2Geometry = new THREE.BufferGeometry().setFromPoints(strand2Points);
        const strand2Material = new THREE.LineBasicMaterial({ 
          color: color2,
          linewidth: 2,
        });
        const strand2 = new THREE.Line(strand2Geometry, strand2Material);
        
        // Create the connections (rungs)
        const connections: THREE.Line[] = [];
        connectionPoints.forEach(points => {
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const material = new THREE.LineBasicMaterial({ 
            color: new THREE.Color(0xffffff),
            linewidth: 1,
            opacity: 0.5,
            transparent: true
          });
          const line = new THREE.Line(geometry, material);
          connections.push(line);
        });
        
        const helixGroup = new THREE.Group();
        helixGroup.add(strand1);
        helixGroup.add(strand2);
        connections.forEach(connection => helixGroup.add(connection));
        
        return helixGroup;
      };
      
      // Create multiple double helices
      const helix1 = createDoubleHelix(
        100, // count
        8,   // radius
        60,  // height
        3,   // turns
        new THREE.Color("#0efcb6"), // Primary (teal)
        new THREE.Color("#ff0eb6")  // Secondary (pink)
      );
      scene.add(helix1);
      
      const helix2 = createDoubleHelix(
        80,  // count
        5,   // radius
        50,  // height
        2.5, // turns
        new THREE.Color("#fffc0e"), // Accent (yellow)
        new THREE.Color("#0efcb6")  // Primary (teal)
      );
      helix2.position.x = 20;
      helix2.position.y = -15;
      helix2.position.z = -10;
      helix2.rotation.y = Math.PI / 4;
      scene.add(helix2);
      
      const helix3 = createDoubleHelix(
        60,  // count
        4,   // radius
        40,  // height
        2,   // turns
        new THREE.Color("#ff0eb6"),  // Secondary (pink)
        new THREE.Color("#fffc0e")   // Accent (yellow)
      );
      helix3.position.x = -20;
      helix3.position.y = 10;
      helix3.position.z = -5;
      helix3.rotation.y = -Math.PI / 6;
      scene.add(helix3);
      
      // Add floating particles
      const createParticles = (count: number, spread: number, color: THREE.Color) => {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const velocities = new Float32Array(count * 3);
        
        for (let i = 0; i < count * 3; i += 3) {
          // Random positions within a sphere
          const theta = 2 * Math.PI * Math.random();
          const phi = Math.acos(2 * Math.random() - 1);
          const r = spread * Math.pow(Math.random(), 1/3);
          
          positions[i] = r * Math.sin(phi) * Math.cos(theta);
          positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
          positions[i + 2] = r * Math.cos(phi);
          
          // Random velocities
          velocities[i] = (Math.random() - 0.5) * 0.02;
          velocities[i + 1] = (Math.random() - 0.5) * 0.02;
          velocities[i + 2] = (Math.random() - 0.5) * 0.02;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        // Store velocities in userData for animation
        const material = new THREE.PointsMaterial({
          color,
          size: 0.2,
          transparent: true,
          opacity: 0.7,
          sizeAttenuation: true,
        });
        
        const particles = new THREE.Points(geometry, material);
        particles.userData.velocities = velocities;
        
        return particles;
      };
      
      const particles1 = createParticles(300, 40, new THREE.Color("#0efcb6"));
      const particles2 = createParticles(200, 30, new THREE.Color("#ff0eb6"));
      const particles3 = createParticles(150, 25, new THREE.Color("#fffc0e"));
      
      scene.add(particles1);
      scene.add(particles2);
      scene.add(particles3);
      
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
        
        // Rotate helices
        helix1.rotation.y += 0.002;
        helix2.rotation.y += 0.0015;
        helix3.rotation.y += 0.0025;
        
        // Smooth follow for mouse movement
        const easing = 0.05;
        helix1.rotation.x += easing * (targetY - helix1.rotation.x);
        helix1.rotation.z += easing * (targetX - helix1.rotation.z);
        
        helix2.rotation.x += easing * 0.7 * (targetY - helix2.rotation.x);
        helix2.rotation.z += easing * 0.7 * (targetX - helix2.rotation.z);
        
        helix3.rotation.x += easing * 1.3 * (targetY - helix3.rotation.x);
        helix3.rotation.z += easing * 1.3 * (targetX - helix3.rotation.z);
        
        // Animate particles
        [particles1, particles2, particles3].forEach(particles => {
          const positions = particles.geometry.attributes.position;
          const velocities = particles.userData.velocities;
          
          for (let i = 0; i < positions.count; i++) {
            const ix = i * 3;
            const iy = i * 3 + 1;
            const iz = i * 3 + 2;
            
            // Update position with velocity
            positions.array[ix] += velocities[ix];
            positions.array[iy] += velocities[iy];
            positions.array[iz] += velocities[iz];
            
            // Boundary check and bounce
            const boundary = 40;
            
            if (Math.abs(positions.array[ix]) > boundary) {
              velocities[ix] = -velocities[ix];
            }
            
            if (Math.abs(positions.array[iy]) > boundary) {
              velocities[iy] = -velocities[iy];
            }
            
            if (Math.abs(positions.array[iz]) > boundary) {
              velocities[iz] = -velocities[iz];
            }
          }
          
          positions.needsUpdate = true;
        });
        
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
        renderer.dispose();
      };
    } catch (error) {
      console.error("Error initializing DNA particles:", error);
      return () => {}; // Empty cleanup function if we fail to initialize
    }
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ opacity: 0.7, mixBlendMode: 'screen' }}
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

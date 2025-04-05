
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Achievements from '../components/Achievements';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Cursor from '../components/Cursor';
import Chatbot from '../components/Chatbot';
import ParticlesBackground from '../components/ParticlesBackground';

const Index = () => {
  useEffect(() => {
    // Add smooth scrolling for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.hash && link.hash.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(link.hash);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden digital-rain scanlines">
      {/* Custom cursor */}
      <Cursor />
      
      {/* Background elements */}
      <ParticlesBackground />
      
      {/* Circuit patterns - additional background decoration */}
      <div className="fixed inset-0 pointer-events-none -z-5 opacity-5">
        {/* Horizontal circuit lines */}
        {Array.from({ length: 5 }).map((_, index) => (
          <div 
            key={`h-line-${index}`}
            className="absolute h-px bg-primary/80" 
            style={{ 
              width: '100%',
              top: `${15 + index * 20}%`,
              left: 0,
            }}
          />
        ))}
        
        {/* Vertical circuit lines */}
        {Array.from({ length: 5 }).map((_, index) => (
          <div 
            key={`v-line-${index}`}
            className="absolute w-px bg-primary/80" 
            style={{ 
              height: '100%',
              left: `${15 + index * 20}%`,
              top: 0,
            }}
          />
        ))}
        
        {/* Circuit nodes */}
        {Array.from({ length: 10 }).map((_, index) => (
          <div 
            key={`node-${index}`}
            className="absolute w-2 h-2 rounded-full bg-primary/80" 
            style={{ 
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      
      <Navbar />
      <main>
        <Hero />
        <About />
        <Achievements />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;

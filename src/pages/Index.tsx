
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
import Portal3D from '../components/Portal3D';

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
    <div className="min-h-screen bg-background text-foreground relative">
      <Cursor />
      <ParticlesBackground />
      
      {/* Ambient 3D elements positioned throughout the page */}
      <div className="fixed left-5 top-[20%] -z-10 opacity-50 transform scale-50 hidden md:block">
        <Portal3D size="h-[200px]" />
      </div>
      
      <div className="fixed right-5 top-[60%] -z-10 opacity-50 transform scale-50 hidden md:block">
        <Portal3D size="h-[200px]" />
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

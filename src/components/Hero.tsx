
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin } from 'lucide-react';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 px-4"
    >
      {/* Background blur effect */}
      <div 
        className="absolute bg-gradient-to-br from-primary/40 to-transparent rounded-full blur-3xl opacity-20"
        style={{
          width: '60%',
          height: '60%',
          top: mousePosition.y * 0.05, 
          left: mousePosition.x * 0.05,
          transition: 'top 0.5s ease-out, left 0.5s ease-out',
        }}
      />

      {/* Animated Grid Lines */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="mb-6 inline-block">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="px-4 py-1 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm text-sm"
            >
              Python & Full Stack Developer
            </motion.div>
          </div>

          <motion.h1 
            className="text-4xl md:text-7xl font-bold tracking-tighter mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="block">Hi, I'm </span>
            <span className="text-gradient">Utkarsh Barad</span>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Aspiring Python Developer and Full Stack Developer with expertise in building
            scalable applications and emerging technologies.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/80"
            >
              Get in touch <ArrowRight size={16} />
            </a>
            <a 
              href="/lovable-uploads/57de046a-f571-4b59-b9a2-90a7a9353858.png" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-secondary text-secondary-foreground font-medium transition-all hover:bg-secondary/80"
              download="Utkarsh_Barad_Resume.png"
            >
              Download Resume <Download size={16} />
            </a>
          </motion.div>

          <motion.div 
            className="mt-12 flex items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <a 
              href="https://linkedin.com/in/utkarsh-barad" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-foreground/10 bg-secondary hover:bg-secondary/60 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="https://github.com/utkarshbhai007" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-foreground/10 bg-secondary hover:bg-secondary/60 transition-colors"
              aria-label="GitHub Profile"
            >
              <Github size={20} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block"
        >
          <div className="w-6 h-10 rounded-full border-2 border-foreground/20 flex justify-center">
            <div className="w-1 h-2 bg-foreground/60 rounded-full mt-2 animate-float" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

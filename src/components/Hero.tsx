
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Terminal, Sparkles, Zap } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Text to type
  const fullText = "Building scalable applications with emerging technologies.";
  
  useEffect(() => {
    // Handle typing animation
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.substring(0, typedText.length + 1));
      }, 50); // Speed of typing
      
      return () => clearTimeout(timeout);
    } else {
      setTypingComplete(true);
      
      // Add occasional glitch effect
      const glitchInterval = setInterval(() => {
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 200);
      }, 3000);
      
      return () => clearInterval(glitchInterval);
    }
  }, [typedText, fullText]);
  
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
  
  // Digital rain effect (Matrix-style)
  const DigitalRain = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div 
            key={i}
            className="absolute font-mono text-xs text-primary opacity-20"
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: -20 
            }}
            animate={{ 
              y: '100%',
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: Math.random() * 10 + 5,
              delay: Math.random() * 2,
              ease: "linear"
            }}
            style={{ color: i % 3 === 0 ? '#0efcb6' : i % 3 === 1 ? '#ff0eb6' : '#fffc0e' }}
          >
            {Array.from({ length: 10 }).map(() => 
              String.fromCharCode(Math.floor(Math.random() * 74) + 48)
            ).join('')}
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 px-4 cyber-grid"
    >
      {/* Digital Rain Effect */}
      <DigitalRain />
      
      {/* Circuit board pattern background */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div className="absolute left-0 top-0 w-full h-full" style={{ 
          backgroundImage: `
            linear-gradient(to right, rgba(14, 252, 182, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(14, 252, 182, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }}></div>
        
        {/* Circuit paths */}
        {!isMobile && Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-primary/20"
            style={{
              height: '2px',
              width: `${Math.random() * 200 + 100}px`,
              left: `${Math.random() * 80}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </div>

      {/* Reactive gradient background */}
      <div 
        className="absolute bg-gradient-to-br from-primary/20 via-accent/5 to-secondary/20 rounded-full blur-3xl"
        style={{
          width: '70%',
          height: '70%',
          top: mousePosition.y * 0.05, 
          left: mousePosition.x * 0.05,
          transition: 'top 0.5s ease-out, left 0.5s ease-out',
        }}
      />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="mb-6 inline-block">
            <motion.div
              initial={{ scale: 0, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="px-4 py-1 rounded-full cyber-border bg-primary/5 backdrop-blur-sm text-sm flex items-center gap-2"
            >
              <Zap size={14} className="text-primary animate-pulse" />
              <span className="text-gradient">Full Stack Developer</span>
              <Zap size={14} className="text-primary animate-pulse" />
            </motion.div>
          </div>

          <motion.h1 
            className={`text-4xl md:text-7xl font-bold mb-6 tracking-tighter ${glitchEffect ? 'animate-glitch' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="block">Hi, I'm </span>
            <motion.div 
              className="text-gradient neon-text relative inline-block"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.6 }}
            >
              <span className="relative z-10">Utkarsh Barad</span>
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-secondary opacity-30 blur-lg -z-10 rounded-lg"></div>
            </motion.div>
            <motion.span 
              className="block text-2xl md:text-3xl mt-2 text-primary/80"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.8 }}
            >
              <Sparkles className="inline mr-2 text-accent" size={18} />
              7x Hackathon Winner
              <Sparkles className="inline ml-2 text-accent" size={18} />
            </motion.span>
          </motion.h1>

          <motion.div 
            className={`text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto min-h-[60px] font-mono ${glitchEffect ? 'animate-glitch' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <span>{typedText}</span>
            <span className={`inline-block w-2 h-5 bg-primary ml-1 ${typingComplete ? 'animate-pulse' : ''}`}></span>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.a 
              href="#contact" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md cyber-border bg-primary/10 text-primary hover:bg-primary/20 backdrop-blur-sm font-medium transition-all relative group overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Get in touch</span>
              <ArrowRight size={16} className="relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/10 to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.a>
            <motion.a 
              href="/lovable-uploads/6a98d248-6db3-4217-8228-af0e94bb5397.png" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md cyber-border bg-secondary/10 text-secondary hover:bg-secondary/20 backdrop-blur-sm font-medium transition-all relative group overflow-hidden"
              download="Utkarsh_Barad_Resume.png"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Download Resume</span>
              <Download size={16} className="relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/30 via-secondary/10 to-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.a>
          </motion.div>

          <motion.div 
            className="mt-12 flex items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <motion.a 
              href="https://linkedin.com/in/utkarsh-barad" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full cyber-border bg-background/50 hover:bg-secondary/20 backdrop-blur-sm transition-colors relative group"
              aria-label="LinkedIn Profile"
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin size={20} />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity blur-md -z-10"></div>
            </motion.a>
            <motion.a 
              href="https://github.com/utkarshbhai007" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full cyber-border bg-background/50 hover:bg-secondary/20 backdrop-blur-sm transition-colors relative group"
              aria-label="GitHub Profile"
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={20} />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity blur-md -z-10"></div>
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block"
        >
          <div className="w-6 h-10 rounded-full border-2 border-foreground/20 flex justify-center cyber-border">
            <div className="w-1 h-2 bg-primary rounded-full mt-2 animate-bounce-small" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

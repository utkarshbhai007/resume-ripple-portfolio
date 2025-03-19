
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Terminal } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import HeroBackground3D from './HeroBackground3D';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
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
  
  // Floating code snippets animation
  const codeSnippets = [
    'import React from "react";', 
    'const App = () => { ... }', 
    'npm install', 
    'git push origin main', 
    '<div className="flex">',
    'function calculateSum() {',
    'useEffect(() => {',
    'return () => {',
    'const [state, setState] =',
    'async/await',
    'export default App;',
    'npm run build',
    'docker-compose up',
    'git commit -m "feat"',
  ];

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 px-4"
    >
      {/* 3D Background */}
      <HeroBackground3D />
      
      {/* Interactive background effect */}
      <div 
        className="absolute bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl opacity-20"
        style={{
          width: '60%',
          height: '60%',
          top: mousePosition.y * 0.05, 
          left: mousePosition.x * 0.05,
          transition: 'top 0.5s ease-out, left 0.5s ease-out',
        }}
      />

      {/* Floating code snippets */}
      {!isMobile && codeSnippets.map((snippet, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-xs opacity-10 text-primary pointer-events-none"
          initial={{ 
            x: Math.random() * 100 - 50 + '%', 
            y: Math.random() * 100 - 50 + '%',
          }}
          animate={{ 
            x: [
              Math.random() * 100 - 50 + '%', 
              Math.random() * 100 - 50 + '%',
              Math.random() * 100 - 50 + '%'
            ],
            y: [
              Math.random() * 100 - 50 + '%', 
              Math.random() * 100 - 50 + '%',
              Math.random() * 100 - 50 + '%'
            ],
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: Math.random() * 20 + 20,
            times: [0, 0.5, 1],
            ease: "linear"
          }}
        >
          {snippet}
        </motion.div>
      ))}

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
              initial={{ scale: 0, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="px-4 py-1 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm text-sm flex items-center gap-2"
            >
              <Terminal size={14} className="text-primary" />
              Full Stack Developer
            </motion.div>
          </div>

          <motion.h1 
            className="text-4xl md:text-7xl font-bold mb-6 tracking-tighter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="block">Hi, I'm </span>
            <motion.span 
              className="text-gradient neon-text"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.6 }}
            >
              Utkarsh Barad
            </motion.span>
            <motion.span 
              className="block text-2xl md:text-3xl mt-2 text-primary/80"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.8 }}
            >
              7x Hackathon Winner
            </motion.span>
          </motion.h1>

          <motion.div 
            className="text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto min-h-[60px] font-mono"
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/80"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in touch <ArrowRight size={16} />
            </motion.a>
            <motion.a 
              href="/lovable-uploads/6a98d248-6db3-4217-8228-af0e94bb5397.png" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-secondary text-secondary-foreground font-medium transition-all hover:bg-secondary/80"
              download="Utkarsh_Barad_Resume.png"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume <Download size={16} />
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
              className="p-3 rounded-full border border-foreground/10 bg-secondary hover:bg-secondary/60 transition-colors"
              aria-label="LinkedIn Profile"
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.a 
              href="https://github.com/utkarshbhai007" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-foreground/10 bg-secondary hover:bg-secondary/60 transition-colors"
              aria-label="GitHub Profile"
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={20} />
            </motion.a>
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

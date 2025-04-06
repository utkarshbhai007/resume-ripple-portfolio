
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Terminal, Sparkles, Zap, Code } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Text to type
  const fullText = "Building innovative digital experiences with emerging technologies.";
  
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
  
  // DNA code animation
  const DNACodeRain = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid opacity-5"></div>
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div 
            key={i}
            className="absolute font-mono text-xs"
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: -20 
            }}
            animate={{ 
              y: '100%',
            }}
            transition={{ 
              repeat: Infinity, 
              duration: Math.random() * 10 + 5,
              delay: Math.random() * 5,
              ease: "linear"
            }}
            style={{ 
              color: i % 4 === 0 ? '#0efcb6' : i % 4 === 1 ? '#ff0eb6' : i % 4 === 2 ? '#fffc0e' : 'rgba(255,255,255,0.5)',
              opacity: Math.random() * 0.5 + 0.1
            }}
          >
            {['A', 'T', 'G', 'C'].sort(() => Math.random() - 0.5).join('')}
          </motion.div>
        ))}
      </div>
    );
  };

  // Binary base pairs animation
  const BinaryPairs = () => {
    return (
      <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="text-primary/20 font-mono text-6xl md:text-8xl select-none"
          style={{ letterSpacing: '0.5em' }}
        >
          01
        </motion.div>
      </div>
    );
  };

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 px-4"
    >
      {/* DNA Code rain background */}
      <DNACodeRain />
      
      {/* Binary code background */}
      <BinaryPairs />
      
      {/* Background grid pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `
            linear-gradient(to right, rgba(14, 252, 182, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(14, 252, 182, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }}></div>
      </div>
      
      {/* Reactive gradient background */}
      <motion.div 
        className="absolute bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 rounded-full blur-3xl"
        animate={{
          x: mousePosition.x * 0.05 - 200,
          y: mousePosition.y * 0.05 - 200,
        }}
        transition={{
          type: "spring",
          damping: 40,
          stiffness: 50,
          restDelta: 0.001
        }}
        style={{
          width: '80%',
          height: '80%',
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
              <Code size={14} className="text-primary" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-background to-secondary relative">
                <span className="relative z-10">Full Stack Developer & Designer</span>
                {/* DNA strand animation */}
                <motion.span 
                  className="absolute inset-0 overflow-hidden"
                  initial={{ width: "0%" }}
                  animate={{ width: ["0%", "100%", "0%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut", repeatDelay: 1 }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary via-background to-primary">
                    Full Stack Developer & Designer
                  </span>
                </motion.span>
              </span>
              <Code size={14} className="text-secondary" />
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
              className="relative inline-block"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.6 }}
            >
              <span className="relative z-10 text-gradient">Utkarsh Barad</span>
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-secondary opacity-30 blur-lg -z-10 rounded-lg"></div>
              
              {/* DNA helix animation around name */}
              <div className="absolute -inset-4 -z-10 opacity-30">
                <motion.div 
                  className="w-full h-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-full h-0.5"
                      style={{ 
                        transformOrigin: 'center',
                        rotate: `${i * 30}deg`,
                        background: i % 2 === 0 ? 
                          'linear-gradient(90deg, transparent 0%, #0efcb6 50%, transparent 100%)' : 
                          'linear-gradient(90deg, transparent 0%, #ff0eb6 50%, transparent 100%)'
                      }}
                    />
                  ))}
                </motion.div>
              </div>
            </motion.div>
            
            <motion.span 
              className="block text-2xl md:text-3xl mt-2"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.8 }}
            >
              <Sparkles className="inline mr-2 text-accent" size={18} />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                7x Hackathon Winner
              </span>
              <Sparkles className="inline ml-2 text-accent" size={18} />
            </motion.span>
          </motion.h1>

          <motion.div 
            className={`text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto min-h-[60px] font-mono relative ${glitchEffect ? 'animate-glitch' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <span className="relative">{typedText}</span>
            <span className={`inline-block w-2 h-5 bg-primary ml-1 ${typingComplete ? 'animate-pulse' : ''}`}></span>
            
            {/* DNA code floating up from the text */}
            {typingComplete && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute bottom-0 font-mono text-xs text-primary/50"
                    initial={{ 
                      x: 100 + Math.random() * 200, 
                      y: 0,
                      opacity: 0.7
                    }}
                    animate={{ 
                      y: [0, -60],
                      opacity: [0.7, 0]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2 + Math.random() * 3,
                      delay: Math.random() * 5,
                      ease: "easeOut"
                    }}
                  >
                    {['A', 'T', 'G', 'C'][Math.floor(Math.random() * 4)]}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.a 
              href="#contact" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-gradient-to-r from-primary/20 to-primary/5 backdrop-blur-sm border-2 border-primary/30 text-primary hover:border-primary/50 font-medium transition-all relative group overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* DNA animation inside button */}
              <div className="absolute inset-0 overflow-hidden opacity-20">
                <motion.div
                  className="w-full h-full flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-full h-0.5 bg-primary/50"
                      style={{ transform: `rotate(${i * 30}deg)` }}
                    />
                  ))}
                </motion.div>
              </div>
              
              <span className="relative z-10">Get in touch</span>
              <ArrowRight size={16} className="relative z-10" />
            </motion.a>
            
            <motion.a 
              href="/lovable-uploads/6a98d248-6db3-4217-8228-af0e94bb5397.png" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-gradient-to-r from-secondary/20 to-secondary/5 backdrop-blur-sm border-2 border-secondary/30 text-secondary hover:border-secondary/50 font-medium transition-all relative group overflow-hidden"
              download="Utkarsh_Barad_Resume.png"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* DNA animation inside button */}
              <div className="absolute inset-0 overflow-hidden opacity-20">
                <motion.div
                  className="w-full h-full flex items-center justify-center" 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-full h-0.5 bg-secondary/50"
                      style={{ transform: `rotate(${i * 30}deg)` }}
                    />
                  ))}
                </motion.div>
              </div>
              
              <span className="relative z-10">Download Resume</span>
              <Download size={16} className="relative z-10" />
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
              className="p-3 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-colors relative group"
              aria-label="LinkedIn Profile"
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin size={20} className="text-primary" />
              <motion.div 
                className="absolute inset-0 rounded-full bg-primary opacity-0 group-hover:opacity-10 blur-md -z-10"
                animate={{ scale: [0.8, 1.2, 0.8] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              ></motion.div>
            </motion.a>
            <motion.a 
              href="https://github.com/utkarshbhai007" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gradient-to-br from-secondary/10 to-secondary/5 backdrop-blur-sm border border-secondary/20 hover:border-secondary/40 transition-colors relative group"
              aria-label="GitHub Profile"
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={20} className="text-secondary" />
              <motion.div 
                className="absolute inset-0 rounded-full bg-secondary opacity-0 group-hover:opacity-10 blur-md -z-10"
                animate={{ scale: [0.8, 1.2, 0.8] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.2 }}
              ></motion.div>
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block"
        >
          <motion.div 
            className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center"
            animate={{ boxShadow: ["0 0 0px rgba(14, 255, 182, 0.3)", "0 0 15px rgba(14, 255, 182, 0.5)", "0 0 0px rgba(14, 255, 182, 0.3)"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div 
              className="w-1 h-2 bg-primary rounded-full mt-2"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

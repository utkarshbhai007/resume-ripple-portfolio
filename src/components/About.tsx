
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Github, Linkedin, Mail, Phone, Zap, Terminal, Database, Server } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const About = () => {
  const isMobile = useIsMobile();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 }
    }
  };

  const codeBlockVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        delay: 0.3,
        damping: 10
      }
    }
  };

  // Floating icons for tech visualization
  const TechIcons = () => {
    const icons = [
      { icon: <Terminal className="text-primary" size={24} />, delay: 0 },
      { icon: <Database className="text-secondary" size={24} />, delay: 2 },
      { icon: <Server className="text-accent" size={24} />, delay: 4 },
      { icon: <Code className="text-primary" size={24} />, delay: 6 },
    ];
    
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {icons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute"
            initial={{ 
              x: `${25 * (index + 1)}%`, 
              y: '110%',
              opacity: 0 
            }}
            animate={{ 
              y: ['110%', '0%', '110%'],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 10, 
              delay: item.delay,
              ease: "easeInOut"
            }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <section id="about" className="py-16 md:py-20 relative overflow-hidden noise-bg cyber-grid">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-50 animate-spin-slow" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-secondary/20 rounded-full blur-3xl opacity-50 animate-spin-slow" />
      
      {/* Floating Tech Icons */}
      <TechIcons />
      
      {/* Code Matrix Effect - Animated dots in background */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div 
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: -20,
              opacity: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              y: '120%',
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: Math.random() * 10 + 10,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Zap className="text-accent neon-text" />
            <span className="text-gradient neon-text">About Me</span>
            <Zap className="text-accent neon-text" />
          </h2>
          <div className="h-1 w-32 mx-auto mb-6 rounded-full animate-background-shine bg-[length:400%_100%] bg-gradient-to-r from-primary via-accent to-secondary" />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto overflow-hidden"
        >
          {/* Code Block Styling */}
          <motion.div 
            variants={codeBlockVariants}
            className="mb-10 relative overflow-hidden glass-card p-6 rounded-xl cyber-border group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-2 mb-4 text-xs text-foreground/70">
              <div className="w-3 h-3 rounded-full bg-destructive"></div>
              <div className="w-3 h-3 rounded-full bg-accent"></div>
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="ml-2 text-primary/80 font-mono">about.tsx</span>
            </div>
            
            {/* Animated terminals dots in background */}
            <div className="absolute inset-0 -z-10 opacity-5 pointer-events-none overflow-hidden">
              {Array.from({ length: 50 }).map((_, index) => (
                <motion.div
                  key={index}
                  className="absolute h-1 w-1 rounded-full bg-primary"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{ opacity: 0.2 }}
                  animate={{ opacity: [0.2, 0.8, 0.2] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2 + Math.random() * 3,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
            
            {/* Glow effect on hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl -z-10"></div>
            
            <pre className="font-mono text-sm md:text-base overflow-x-auto text-left">
              <code>
                <span className="text-secondary">class</span> <span className="text-primary">UtkarshBarad</span> <span className="text-secondary">extends</span> <span className="text-primary">Developer</span> &#123;<br/>
                <span className="ml-4 text-secondary">constructor</span>() &#123;<br/>
                <span className="ml-8">super();</span><br/>
                <span className="ml-8"><span className="text-accent">this</span>.specialty = <span className="text-primary">"Full Stack Developer"</span>;</span><br/>
                <span className="ml-8"><span className="text-accent">this</span>.experience = <span className="text-primary">"Building scalable applications"</span>;</span><br/>
                <span className="ml-8"><span className="text-accent">this</span>.achievements = <span className="text-primary">"7x Hackathon Winner"</span>;</span><br/>
                <span className="ml-4">&#125;</span><br/><br/>
                <span className="ml-4 text-secondary">getSkills</span>() &#123;<br/>
                <span className="ml-8 text-secondary">return</span> [<span className="text-primary">"React"</span>, <span className="text-primary">"Node.js"</span>, <span className="text-primary">"MongoDB"</span>, <span className="text-primary">"Next.js"</span>];<br/>
                <span className="ml-4">&#125;</span><br/><br/>
                <span className="ml-4 text-secondary">getPhilosophy</span>() &#123;<br/>
                <span className="ml-8 text-secondary">return</span> <span className="text-primary">"Success through excellence in development."</span>;<br/>
                <span className="ml-4">&#125;</span><br/>
                &#125;
              </code>
            </pre>
            
            {/* Animated cursor */}
            <motion.div
              className="absolute bottom-6 right-8 w-2 h-5 bg-primary/80"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <motion.div
              variants={itemVariants}
              className="glass-card p-6 rounded-xl cyber-border transition-all hover:yellow-glow relative group overflow-hidden"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-accent">
                <Mail className="text-primary" size={20} />
                Contact Information
              </h3>
              <ul className="space-y-4 text-foreground/70">
                <li className="flex items-center gap-3 group/item">
                  <Mail size={16} className="text-primary group-hover/item:text-accent transition-colors" />
                  <a href="mailto:utkarshbarad11@gmail.com" className="hover:text-primary transition-colors">
                    utkarshbarad11@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-3 group/item">
                  <Phone size={16} className="text-primary group-hover/item:text-accent transition-colors" />
                  <a href="tel:+919898588556" className="hover:text-primary transition-colors">
                    +91 9898585555
                  </a>
                </li>
                <li className="flex items-center gap-3 group/item">
                  <Linkedin size={16} className="text-primary group-hover/item:text-accent transition-colors" />
                  <a 
                    href="https://linkedin.com/in/utkarsh-barad" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-primary transition-colors"
                  >
                    linkedin.com/in/utkarsh-barad
                  </a>
                </li>
                <li className="flex items-center gap-3 group/item">
                  <Github size={16} className="text-primary group-hover/item:text-accent transition-colors" />
                  <a 
                    href="https://github.com/utkarshbhai007" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-primary transition-colors"
                  >
                    github.com/utkarshbhai007
                  </a>
                </li>
              </ul>
              
              {/* Circuit board design in the background */}
              <div className="absolute bottom-0 right-0 w-24 h-24 opacity-10 pointer-events-none">
                <div className="absolute w-full h-full" style={{ 
                  backgroundImage: `
                    radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px),
                    linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
                  `,
                  backgroundSize: '8px 8px, 16px 16px, 16px 16px'
                }}></div>
              </div>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="glass-card p-6 rounded-xl cyber-border transition-all hover:magenta-glow relative group overflow-hidden"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
              <h3 className="text-xl font-semibold mb-4 text-accent">Education</h3>
              <ul className="space-y-4 text-foreground/70">
                <li className="border-l-2 border-secondary/50 pl-4 py-1 hover:border-secondary transition-colors">
                  <p className="font-medium text-foreground">BSC-CS/IT</p>
                  <p>Silver Oak University, Ahmedabad</p>
                  <p className="text-sm opacity-70">Aug 2023 - Present</p>
                </li>
                <li className="border-l-2 border-secondary/50 pl-4 py-1 hover:border-secondary transition-colors">
                  <p className="font-medium text-foreground">HSC</p>
                  <p>Shree Swaminarayan Gurukul, Gandhinagar</p>
                  <p className="text-sm opacity-70">2021 - 2022</p>
                </li>
              </ul>
              
              {/* Binary code in background */}
              <div className="absolute bottom-0 right-0 font-mono text-xs text-secondary/20 w-32 h-32 overflow-hidden pointer-events-none">
                {Array.from({ length: 8 }).map((_, rowIndex) => (
                  <div key={rowIndex} className="flex justify-end">
                    {Array.from({ length: 8 }).map((_, colIndex) => (
                      <span key={colIndex} className="opacity-20">
                        {Math.random() > 0.5 ? '1' : '0'}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;


import React from 'react';
import { motion } from 'framer-motion';
import { Code, Github, Linkedin, Mail, Phone } from 'lucide-react';
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

  return (
    <section id="about" className="py-16 md:py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-50 animate-spin-slow" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50 animate-spin-slow" />
      
      {/* Code Matrix Effect - Animated dots in background */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
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
            <Code className="text-primary animate-pulse" />
            <span>About Me</span>
            <Code className="text-primary animate-pulse" />
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-6 rounded-full animate-background-shine bg-[length:400%_100%] bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
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
            className="mb-10 relative overflow-hidden glass-card p-6 rounded-xl border border-primary/20 blue-glow"
          >
            <div className="flex items-center gap-2 mb-4 text-xs text-foreground/70">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-2 text-foreground/60">about.tsx</span>
            </div>
            <pre className="font-mono text-sm md:text-base overflow-x-auto text-left">
              <code>
                <span className="text-blue-400">class</span> <span className="text-green-400">UtkarshBarad</span> <span className="text-blue-400">extends</span> <span className="text-green-400">Developer</span> &#123;<br/>
                <span className="ml-4 text-blue-400">constructor</span>() &#123;<br/>
                <span className="ml-8">super();</span><br/>
                <span className="ml-8"><span className="text-purple-400">this</span>.specialty = <span className="text-orange-400">"Full Stack Developer"</span>;</span><br/>
                <span className="ml-8"><span className="text-purple-400">this</span>.experience = <span className="text-orange-400">"Building scalable applications"</span>;</span><br/>
                <span className="ml-8"><span className="text-purple-400">this</span>.achievements = <span className="text-orange-400">"7x Hackathon Winner"</span>;</span><br/>
                <span className="ml-4">&#125;</span><br/><br/>
                <span className="ml-4 text-blue-400">getSkills</span>() &#123;<br/>
                <span className="ml-8 text-blue-400">return</span> [<span className="text-orange-400">"React"</span>, <span className="text-orange-400">"Node.js"</span>, <span className="text-orange-400">"MongoDB"</span>, <span className="text-orange-400">"Next.js"</span>];<br/>
                <span className="ml-4">&#125;</span><br/><br/>
                <span className="ml-4 text-blue-400">getPhilosophy</span>() &#123;<br/>
                <span className="ml-8 text-blue-400">return</span> <span className="text-orange-400">"Success through excellence in development."</span>;<br/>
                <span className="ml-4">&#125;</span><br/>
                &#125;
              </code>
            </pre>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <motion.div
              variants={itemVariants}
              className="glass-card p-6 rounded-xl border border-primary/20 transition-all hover:blue-glow"
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Mail className="text-primary" size={20} />
                Contact Information
              </h3>
              <ul className="space-y-4 text-foreground/70">
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-primary" />
                  <a href="mailto:utkarshbarad11@gmail.com" className="hover:text-primary transition-colors">
                    utkarshbarad11@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-primary" />
                  <a href="tel:+919898588556" className="hover:text-primary transition-colors">
                    +91 9898585555
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Linkedin size={16} className="text-primary" />
                  <a 
                    href="https://linkedin.com/in/utkarsh-barad" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-primary transition-colors"
                  >
                    linkedin.com/in/utkarsh-barad
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Github size={16} className="text-primary" />
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
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="glass-card p-6 rounded-xl border border-primary/20 transition-all hover:blue-glow"
            >
              <h3 className="text-xl font-semibold mb-4">Education</h3>
              <ul className="space-y-4 text-foreground/70">
                <li className="border-l-2 border-primary/30 pl-4 py-1">
                  <p className="font-medium text-foreground">BSC-CS/IT</p>
                  <p>Silver Oak University, Ahmedabad</p>
                  <p className="text-sm opacity-70">Aug 2023 - Present</p>
                </li>
                <li className="border-l-2 border-primary/30 pl-4 py-1">
                  <p className="font-medium text-foreground">HSC</p>
                  <p>Shree Swaminarayan Gurukul, Gandhinagar</p>
                  <p className="text-sm opacity-70">2021 - 2022</p>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

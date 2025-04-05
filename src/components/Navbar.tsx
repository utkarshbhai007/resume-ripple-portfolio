
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Determine which section is currently in view
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navItems]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'py-3 backdrop-blur-lg bg-background/60 cyber-border border-t-0 border-x-0' : 'py-6 bg-transparent'
        }`}
      >
        <div className="container px-4 md:px-6 mx-auto flex items-center justify-between">
          <a
            href="#home"
            className="text-xl font-bold tracking-tighter relative group"
          >
            <span className="text-gradient">Utkarsh Barad</span>
            {/* Logo hover effect */}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-primary via-accent to-secondary group-hover:w-full transition-all duration-300"></span>
            <Zap className="inline-block ml-1 text-accent animate-pulse" size={14} />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`relative text-sm font-medium group py-2 px-1 ${
                  activeSection === item.href.substring(1) 
                    ? 'text-primary' 
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                <span className="relative z-10 transition-colors duration-300">
                  {item.name}
                </span>
                {/* Active indicator */}
                <span 
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-primary transform origin-bottom-right transition-transform duration-300 ${
                    activeSection === item.href.substring(1) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                ></span>
                
                {/* Glow effect for active item */}
                {activeSection === item.href.substring(1) && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary blur-sm"></span>
                )}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-foreground p-2 rounded-md"
            aria-label="Toggle mobile menu"
            whileTap={{ scale: 0.95 }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden bg-background/80"
          >
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 20 }}
              className="absolute right-0 top-0 h-full w-3/4 bg-background cyber-border border-r-0 border-t-0 border-b-0"
            >
              <div className="flex flex-col items-center justify-center space-y-6 p-8 h-full">
                {navItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-foreground text-xl font-medium relative group ${
                      activeSection === item.href.substring(1) ? 'text-primary' : ''
                    }`}
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
                    
                    {/* Active indicator for mobile */}
                    {activeSection === item.href.substring(1) && (
                      <motion.span 
                        layoutId="activeMobile"
                        className="absolute -left-4 top-1/2 w-2 h-2 bg-primary rounded-full -translate-y-1/2"
                      />
                    )}
                  </motion.a>
                ))}
              </div>
            </motion.div>
            
            {/* Close area */}
            <motion.div 
              className="absolute left-0 top-0 h-full w-1/4"
              onClick={() => setMobileMenuOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

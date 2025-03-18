
import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative pt-20 pb-10 overflow-hidden">
      {/* Background elements */}
      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-full h-80 bg-gradient-to-t from-primary/5 to-transparent opacity-30" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="relative">
          {/* Back to top button */}
          <button 
            onClick={scrollToTop}
            className="absolute right-4 -top-14 p-3 rounded-full glass-card hover:blue-glow transition-all duration-300 group"
            aria-label="Back to top"
          >
            <ArrowUp size={20} className="transition-transform duration-300 group-hover:-translate-y-1" />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gradient">Utkarsh Barad</h3>
              <p className="text-foreground/70 max-w-xs">
                Python Developer and Full Stack Developer creating scalable applications with emerging technologies.
              </p>
              
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/utkarshe" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-foreground/10 bg-secondary hover:bg-secondary/60 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github size={18} />
                </a>
                <a 
                  href="https://linkedin.com/in/utkarsh-barad" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-foreground/10 bg-secondary hover:bg-secondary/60 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={18} />
                </a>
                <a 
                  href="mailto:utkarshbarad11@gmail.com" 
                  className="p-2 rounded-full border border-foreground/10 bg-secondary hover:bg-secondary/60 transition-colors"
                  aria-label="Email"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#home" className="text-foreground/70 hover:text-primary transition-colors">Home</a>
                </li>
                <li>
                  <a href="#about" className="text-foreground/70 hover:text-primary transition-colors">About</a>
                </li>
                <li>
                  <a href="#experience" className="text-foreground/70 hover:text-primary transition-colors">Experience</a>
                </li>
                <li>
                  <a href="#projects" className="text-foreground/70 hover:text-primary transition-colors">Projects</a>
                </li>
                <li>
                  <a href="#skills" className="text-foreground/70 hover:text-primary transition-colors">Skills</a>
                </li>
                <li>
                  <a href="#contact" className="text-foreground/70 hover:text-primary transition-colors">Contact</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-foreground/70">
                  <Mail size={16} className="text-primary" />
                  <a href="mailto:utkarshbarad11@gmail.com" className="hover:text-primary transition-colors">
                    utkarshbarad11@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-2 text-foreground/70">
                  <Linkedin size={16} className="text-primary" />
                  <a href="https://linkedin.com/in/utkarsh-barad" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    linkedin.com/in/utkarsh-barad
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-foreground/10 text-center text-foreground/60 text-sm">
            <p>&copy; {new Date().getFullYear()} Utkarsh Barad. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

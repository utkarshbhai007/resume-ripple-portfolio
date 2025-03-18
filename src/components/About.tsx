
import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50" />

      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-6 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="md:col-span-2"
          >
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-2xl gradient-border blue-glow">
                <img 
                  src="/lovable-uploads/af86f004-3645-4186-8205-fbfb28709d27.png" 
                  alt="Utkarsh Barad" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-20 rounded-2xl" />
              
              {/* Decorative elements */}
              <div className="absolute -top-3 -right-3 w-16 h-16 border border-primary/20 rounded-lg" />
              <div className="absolute -bottom-3 -left-3 w-16 h-16 border border-primary/20 rounded-lg" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="md:col-span-3"
          >
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-foreground/80">
                As an aspiring Python Developer and Full Stack Developer, I possess proficiency in both front-end and back-end technologies. I am eager to leverage my Python capabilities in developing scalable applications and stay updated with emerging technologies to provide value to any organization.
              </p>
              <p className="text-lg leading-relaxed text-foreground/80">
                I believe that success is achieved through excellence in software development, contributing positively to the teams and companies I engage with.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Contact</h3>
                  <ul className="space-y-2 text-foreground/70">
                    <li className="flex items-start gap-2">
                      <span className="font-medium">Email:</span>
                      <a href="mailto:utkarshbarad11@gmail.com" className="hover:text-primary transition-colors">utkarshbarad11@gmail.com</a>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-medium">Phone:</span>
                      <a href="tel:+919898585555" className="hover:text-primary transition-colors">+91 9898585555</a>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-medium">LinkedIn:</span>
                      <a href="https://linkedin.com/in/utkarsh-barad" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">linkedin.com/in/utkarsh-barad</a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Education</h3>
                  <ul className="space-y-2 text-foreground/70">
                    <li>
                      <p className="font-medium">BSC-CS/IT</p>
                      <p>Silver Oak University, Ahmedabad</p>
                      <p className="text-sm">Aug 2023 - Present</p>
                    </li>
                    <li>
                      <p className="font-medium">HSC</p>
                      <p>Shree Swaminarayan Gurukul, Gandhinagar</p>
                      <p className="text-sm">2021 - 2022</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

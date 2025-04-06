
import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Technical Skills',
      skills: [
        'Full Stack Development', 'Java', 'Python', 'Go', 'Algorithms', 'API Development',
        'Database Management', 'MySQL', 'Flask', 'Django', 'FastAPI', 'Ruby on Rails',
        'NestJS', 'AngularJS', 'UI/UX Design', 'SEO', 'Open Source', 'Web3', 'Solidity',
        'Solana', 'Three.js', 'GSAP', 'Natural Language Processing'
      ]
    },
    {
      title: 'Tools',
      skills: [
        'Illustrator', 'Photoshop', 'Figma', 'Canva', 'Blender', 'Unity', 'GitHub', 
        'Laravel', 'Excel', 'Google Sheets'
      ]
    }
  ];

  // DNA Base pair representations for skills
  const DNABases = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              opacity: [0.05, 0.2, 0.05],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            <div className="font-mono text-5xl md:text-7xl">
              {['A', 'T', 'G', 'C'][Math.floor(Math.random() * 4)]}
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* DNA bases background */}
      <DNABases />
      
      {/* Background elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-70" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-70" />

      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary via-accent to-secondary mx-auto mb-6 rounded-full" />
          <p className="text-foreground/70">The technologies and tools I specialize in.</p>
        </motion.div>

        <div className="grid gap-10 md:gap-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div 
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              className="relative"
            >
              <h3 className="text-2xl font-semibold mb-8 text-center relative inline-block">
                {category.title}
                <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary"></div>
              </h3>
              
              <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div 
                    key={skillIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.1 + (skillIndex * 0.03),
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="relative overflow-hidden"
                  >
                    <div className="glass-card p-4 rounded-lg hover:blue-glow transition-all duration-300 relative">
                      <p className="text-center font-medium relative z-10">{skill}</p>
                      
                      {/* DNA strand animation in the skill card */}
                      <div className="absolute inset-0 -z-0 opacity-20 overflow-hidden">
                        <motion.div
                          className="absolute inset-0"
                          animate={{
                            backgroundPosition: ['0% 0%', '100% 100%']
                          }}
                          transition={{
                            duration: 10,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            ease: "linear"
                          }}
                          style={{
                            backgroundImage: `repeating-linear-gradient(
                              45deg,
                              transparent,
                              transparent 5px,
                              ${skillIndex % 3 === 0 ? '#0efcb6' : skillIndex % 3 === 1 ? '#ff0eb6' : '#fffc0e'} 5px,
                              ${skillIndex % 3 === 0 ? '#0efcb6' : skillIndex % 3 === 1 ? '#ff0eb6' : '#fffc0e'} 10px
                            )`,
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Accomplishments */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-semibold mb-8 text-center relative inline-block">
            Accomplishments
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary"></div>
          </h3>
          
          <div className="max-w-3xl mx-auto glass-card p-8 rounded-lg relative overflow-hidden">
            {/* DNA helix background for accomplishments */}
            <div className="absolute inset-0 -z-0 opacity-5 overflow-hidden">
              <motion.div
                className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-[200%] h-0.5"
                    style={{ 
                      transformOrigin: 'center',
                      transform: `rotate(${i * 30}deg)`,
                      background: i % 2 === 0 ? 
                        'linear-gradient(90deg, transparent 0%, rgba(14, 255, 182, 0.5) 50%, transparent 100%)' : 
                        'linear-gradient(90deg, transparent 0%, rgba(255, 14, 182, 0.5) 50%, transparent 100%)'
                    }}
                  />
                ))}
              </motion.div>
            </div>

            <ul className="space-y-6 relative z-10">
              <motion.li 
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="min-w-8 h-8 rounded-full bg-gradient-to-r from-primary/40 to-primary/10 backdrop-blur-sm flex items-center justify-center border border-primary/30">
                  <span className="text-primary font-semibold">1</span>
                </div>
                <div className="pt-1">
                  <p className="font-medium text-lg">1st place in Start-up Weekend</p>
                  <p className="text-foreground/70 text-sm mt-1">Led team to victory with innovative product solution</p>
                </div>
              </motion.li>
              
              <motion.li 
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="min-w-8 h-8 rounded-full bg-gradient-to-r from-secondary/40 to-secondary/10 backdrop-blur-sm flex items-center justify-center border border-secondary/30">
                  <span className="text-secondary font-semibold">2</span>
                </div>
                <div className="pt-1">
                  <p className="font-medium text-lg">2nd place in Anveshana Hackathon</p>
                  <p className="text-foreground/70 text-sm mt-1">Developed cutting-edge solution under tight deadlines</p>
                </div>
              </motion.li>
              
              <motion.li 
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="min-w-8 h-8 rounded-full bg-gradient-to-r from-accent/40 to-accent/10 backdrop-blur-sm flex items-center justify-center border border-accent/30">
                  <span className="text-accent font-semibold">3</span>
                </div>
                <div className="pt-1">
                  <p className="font-medium text-lg">3rd place in Codefiesta Hackathon 3.0 & Business Idea Competition</p>
                  <p className="text-foreground/70 text-sm mt-1">Created a sustainable business model with technical implementation</p>
                </div>
              </motion.li>
              
              <motion.li 
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="min-w-8 h-8 rounded-full bg-gradient-to-r from-primary/40 via-secondary/20 to-accent/40 backdrop-blur-sm flex items-center justify-center border border-primary/30">
                  <span className="text-primary font-semibold">🏆</span>
                </div>
                <div className="pt-1">
                  <p className="font-medium text-lg">Top 5% internationally at NASA Space App Challenge</p>
                  <p className="text-foreground/70 text-sm mt-1">Recognized for innovative space technology applications</p>
                </div>
              </motion.li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

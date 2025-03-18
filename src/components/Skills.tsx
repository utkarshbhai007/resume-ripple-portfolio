
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

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
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
          <div className="h-1 w-20 bg-primary mx-auto mb-6 rounded-full" />
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
            >
              <h3 className="text-2xl font-semibold mb-8 text-center">{category.title}</h3>
              
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
                    className="glass-card p-4 rounded-lg hover:blue-glow transition-all duration-300"
                  >
                    <p className="text-center font-medium">{skill}</p>
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
          <h3 className="text-2xl font-semibold mb-8 text-center">Accomplishments</h3>
          
          <div className="max-w-3xl mx-auto glass-card p-8 rounded-lg blue-glow">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="min-w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-semibold">1</span>
                </div>
                <p><span className="font-medium">1st place</span> in Start-up Weekend</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="min-w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-semibold">2</span>
                </div>
                <p><span className="font-medium">2nd place</span> in Anveshana Hackathon</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="min-w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-semibold">3</span>
                </div>
                <p><span className="font-medium">3rd place</span> in Codefiesta Hackathon 3.0 & Business Idea Competition</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="min-w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-semibold">🏆</span>
                </div>
                <p><span className="font-medium">Top 5%</span> internationally at Nasa Space App Challenge</p>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

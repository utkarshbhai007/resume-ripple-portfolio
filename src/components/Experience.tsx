
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Pin } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      company: 'Learnx',
      position: 'HRM Intern',
      period: 'April 2024 - Sep 2024',
      description: 'Organized 10+ skill development events, led teams to achieve goals, and promoted initiatives to drive engagement and user adoption on Learnx.org.',
      icon: 'briefcase'
    },
    {
      company: 'JG Solutions',
      position: 'Intern',
      period: 'April 2024 - June 2024',
      description: 'Developed 4+ full-stack applications for a digital marketing agency and other brands, collaborating with teams to deliver impactful, scalable solutions.',
      icon: 'code'
    },
    {
      company: 'Zuno',
      position: 'Community Captain',
      period: 'March 2024 - Sep 2024',
      description: 'Led community marketing efforts by organizing 10+ events, fostering relationships with 15+ brands, and integrating feedback to enhance opportunities for freshers on the Zuno platform.',
      icon: 'users'
    },
    {
      company: 'DevBros',
      position: 'Freelancer',
      period: 'April 2024 - June 2024',
      description: 'Led the design and deployment of websites for 15+ clients like Razzen, etc, ensuring seamless user experiences and tailored solutions to meet client needs increasing their website rank in top 3% in google.',
      icon: 'globe'
    }
  ];

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl opacity-70" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-70" />

      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Work Experience</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-6 rounded-full" />
          <p className="text-foreground/70">My professional journey and the valuable experience I've gained along the way.</p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/30 to-primary/5 transform md:translate-x-px" />

          {/* Timeline items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-start flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-5 h-5 rounded-full bg-primary border-4 border-background shadow-lg transform -translate-x-1/2 md:-translate-x-1/2" />
                
                {/* Content container */}
                <div className={`glass-card rounded-lg p-6 shadow-lg ml-8 md:ml-0 transition-all duration-300 w-full md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                }`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/20">
                      {exp.icon === 'briefcase' && <briefcase size={18} className="text-primary" />}
                      {exp.icon === 'code' && <code size={18} className="text-primary" />}
                      {exp.icon === 'users' && <users size={18} className="text-primary" />}
                      {exp.icon === 'globe' && <globe size={18} className="text-primary" />}
                    </span>
                    <div>
                      <h3 className="font-bold text-xl">{exp.position}</h3>
                      <p className="text-foreground/70">{exp.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-foreground/60 mb-4">
                    <Calendar size={14} />
                    <span>{exp.period}</span>
                  </div>
                  
                  <p className="text-foreground/80">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

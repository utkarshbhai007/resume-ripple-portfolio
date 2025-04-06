
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, Code } from 'lucide-react';

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      title: 'Pulse AI',
      description: 'An AI and blockchain-powered healthcare platform that automates around 100+ health reports handling, enhances early symptom detection, and delivers personalized treatment plans while ensuring robust data security.',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      tech: ['Python', 'AI', 'Blockchain', 'Data Security'],
      github: 'https://github.com/utkarshbhai007/Pulse-Ai',
      live: null
    },
    {
      title: 'DeepFake Detection Portal',
      description: 'Developed a deepfake detection model with over 80% accuracy, integrating API functionality and algorithms for detecting image and video-based deepfakes, ensuring comprehensive coverage of diverse scenarios.',
      image: 'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
      tech: ['Machine Learning', 'Computer Vision', 'API Development', 'Python'],
      github: 'https://github.com/utkarshbhai007/Deepfake-detection-portal',
      live: null
    },
    {
      title: 'Uber Clone',
      description: 'Developed a fully functional Uber clone application using the MERN stack, implementing Multi-Modal Transport system that allows ride-hailing services with public transportation systems, allowing users to plan combined trips and purchase tickets for multiple modes of transport in one app.',
      image: 'https://images.unsplash.com/photo-1611576410467-9fa589ed2a8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
      tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Maps API'],
      github: 'https://github.com/utkarshbhai007/Uber-clone',
      live: null
    }
  ];

  // DNA-inspired design elements
  const DNABases = ({ index }: { index: number }) => {
    return (
      <div className="absolute inset-0 pointer-events-none -z-10 opacity-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute font-mono text-xs"
            initial={{ 
              x: `${20 + Math.random() * 60}%`, 
              y: `${20 + Math.random() * 60}%`,
              opacity: 0.5
            }}
            animate={{ 
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3 + Math.random() * 2,
              delay: index * 0.2 + i * 0.5
            }}
            style={{ color: index % 3 === 0 ? '#0efcb6' : index % 3 === 1 ? '#ff0eb6' : '#fffc0e' }}
          >
            {['A', 'T', 'G', 'C'][i]}
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl opacity-70" />

      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary via-accent to-secondary mx-auto mb-6 rounded-full" />
          <p className="text-foreground/70">Showcasing my work, expertise, and problem-solving abilities.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              className="relative group"
            >
              <div className="relative cyber-border overflow-hidden rounded-lg h-full flex flex-col">
                {/* DNA Bases background */}
                <DNABases index={index} />
                
                {/* Project image */}
                <div className="aspect-video relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-60 z-10" />
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 object-center"
                  />
                  
                  <div className="absolute top-4 right-4 z-20 flex space-x-2">
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-primary/80 transition-colors duration-300 border border-primary/30"
                        aria-label="View GitHub repository"
                      >
                        <Github size={16} />
                      </a>
                    )}
                    {project.live && (
                      <a 
                        href={project.live} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-primary/80 transition-colors duration-300 border border-primary/30"
                        aria-label="View live project"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>

                  {/* Project title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-background to-transparent">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                  </div>
                </div>
                
                {/* Project content */}
                <div className="p-6 flex flex-col flex-grow glass-card">
                  {/* Project description */}
                  <p className="text-foreground/70 mb-4 flex-grow">{project.description}</p>
                  
                  <div className="mt-auto">
                    {/* DNA double helix tech tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <div key={techIndex} className="relative group">
                          <span 
                            className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 text-primary/90 relative z-10"
                          >
                            {tech}
                          </span>
                          
                          {/* DNA helix animation inside tag on hover */}
                          <motion.div 
                            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 overflow-hidden"
                            transition={{ duration: 0.3 }}
                          >
                            <motion.div
                              className="absolute inset-0"
                              animate={{
                                backgroundPosition: ['0% 0%', '100% 100%']
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear"
                              }}
                              style={{
                                backgroundImage: `repeating-linear-gradient(
                                  45deg,
                                  transparent,
                                  transparent 2px,
                                  ${techIndex % 3 === 0 ? '#0efcb6' : techIndex % 3 === 1 ? '#ff0eb6' : '#fffc0e'}20 2px,
                                  ${techIndex % 3 === 0 ? '#0efcb6' : techIndex % 3 === 1 ? '#ff0eb6' : '#fffc0e'}20 4px
                                )`,
                              }}
                            />
                          </motion.div>
                        </div>
                      ))}
                    </div>
                    
                    {/* View project link with DNA animation */}
                    <a 
                      href={project.github || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
                    >
                      <span className="relative">
                        View Project
                        <motion.span 
                          className="absolute bottom-0 left-0 w-full h-[1px] bg-primary origin-left"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: hoveredProject === index ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </span>
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

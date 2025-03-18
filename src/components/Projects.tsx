
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      title: 'Pulse AI',
      description: 'An AI and blockchain-powered healthcare platform that automates around 100+ health reports handling, enhances early symptom detection, and delivers personalized treatment plans while ensuring robust data security.',
      image: '/placeholder.svg',
      tech: ['Python', 'AI', 'Blockchain', 'Data Security'],
      github: 'https://github.com/utkarshe/07/pulse-ai',
      live: null
    },
    {
      title: 'DeepFake Detection Portal',
      description: 'Developed a deepfake detection model with over 80% accuracy, integrating API functionality and algorithms for detecting image and video-based deepfakes, ensuring comprehensive coverage of diverse scenarios.',
      image: '/placeholder.svg',
      tech: ['Machine Learning', 'Computer Vision', 'API Development', 'Python'],
      github: 'https://github.com/utkarshe/07/deepfake-detection-portal',
      live: null
    },
    {
      title: 'Uber Clone',
      description: 'Developed a fully functional Uber clone application using the MERN stack, implementing Multi-Modal Transport system that allows ride-hailing services with public transportation systems, allowing users to plan combined trips and purchase tickets for multiple modes of transport in one app.',
      image: '/placeholder.svg',
      tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Maps API'],
      github: 'https://github.com/utkarshe/07/uber-clone',
      live: null
    }
  ];

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
          <div className="h-1 w-20 bg-primary mx-auto mb-6 rounded-full" />
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
              <div className="relative gradient-border blue-glow overflow-hidden rounded-lg h-full flex flex-col">
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
                        className="p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-primary/80 transition-colors duration-300"
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
                        className="p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-primary/80 transition-colors duration-300"
                        aria-label="View live project"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
                
                {/* Project content */}
                <div className="p-6 flex flex-col flex-grow glass-card">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-foreground/70 mb-4 flex-grow">{project.description}</p>
                  
                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <span 
                          key={techIndex} 
                          className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary/90"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <a 
                      href={project.github || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      View Project <ArrowRight size={14} />
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

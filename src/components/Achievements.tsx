
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  ChevronLeft, 
  ChevronRight,
  Calendar,
  MapPin,
  Award
} from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const achievements = [
  {
    id: 1,
    title: "Startup Weekend",
    position: "1st Place",
    location: "PDEU Innovation Centre, Gandhinagar",
    date: "2022",
    image: "/lovable-uploads/ed83d005-d9fb-4810-9853-200e45bc1ca2.png",
    description: "Won first place at the Techstars Startup Weekend competition at Pandit Deendayal Energy University."
  },
  {
    id: 2,
    title: "Atmiya Hackathon",
    position: "2nd Place",
    location: "Atmiya University",
    date: "2023",
    image: "/lovable-uploads/a3990e93-afde-408e-93ff-ff86cfd3ab34.png",
    description: "Secured second position at the Atmiya University Hackathon, winning a cash prize for innovative solution."
  },
  {
    id: 3,
    title: "Codefiesta Hackathon 3.0",
    position: "2nd Runner Up",
    location: "Global Institute of Technology, Jaipur",
    date: "2023",
    image: "/lovable-uploads/2f3a309b-b5f8-4223-bcb7-4e942abecf53.png", 
    description: "Achieved 2nd runner-up position at the Codefiesta Hackathon 3.0, recognized for technical excellence."
  }
];

const Achievements = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  return (
    <section id="achievements" className="py-20 relative overflow-hidden bg-gradient-to-b from-background to-background/95">
      {/* Background elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] opacity-50" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] opacity-50" />
      
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy size={28} className="text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold">Hackathon Achievements</h2>
          </div>
          <div className="h-1 w-20 bg-primary mx-auto mb-6 rounded-full" />
          <p className="text-foreground/70">Showcasing my journey through competitive hackathons and the recognition received.</p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <Carousel 
            opts={{
              loop: true,
              align: "center",
            }}
            className="w-full"
            onSelect={(index) => setActiveIndex(index.selectedScrollSnap())}
          >
            <CarouselContent>
              {achievements.map((achievement, index) => (
                <CarouselItem key={achievement.id} className="md:basis-2/3 lg:basis-3/5">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="h-full"
                  >
                    <div className={`h-full glass-card p-6 rounded-2xl border border-primary/20 transition-all duration-500 ${activeIndex === index ? 'blue-glow scale-[1.02]' : 'opacity-80 scale-[0.98]'}`}>
                      <div className="space-y-6 h-full flex flex-col">
                        <div className="relative rounded-xl overflow-hidden">
                          <AspectRatio ratio={16/9}>
                            <img 
                              src={achievement.image} 
                              alt={achievement.title} 
                              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                            />
                          </AspectRatio>
                          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                          <div className="absolute top-4 left-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                            {achievement.position}
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                          <div className="flex items-center gap-2 text-foreground/70 mb-1">
                            <MapPin size={16} className="text-primary/80" />
                            <p className="text-sm">{achievement.location}</p>
                          </div>
                          <div className="flex items-center gap-2 text-foreground/70 mb-4">
                            <Calendar size={16} className="text-primary/80" />
                            <p className="text-sm">{achievement.date}</p>
                          </div>
                          <p className="text-foreground/80">{achievement.description}</p>
                        </div>
                        
                        <div className="flex justify-center">
                          <Award size={24} className="text-primary animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-8 flex items-center justify-center gap-2">
              <CarouselPrevious className="relative static left-0 translate-y-0 bg-secondary/50 hover:bg-secondary dark:hover:bg-secondary border-none" />
              <div className="flex gap-1">
                {achievements.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      activeIndex === index ? "bg-primary w-5" : "bg-primary/30"
                    }`}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <CarouselNext className="relative static right-0 translate-y-0 bg-secondary/50 hover:bg-secondary dark:hover:bg-secondary border-none" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Achievements;

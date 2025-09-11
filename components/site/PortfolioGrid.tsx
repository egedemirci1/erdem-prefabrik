"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import projectsData from '@/data/projects.json';

const PortfolioGrid = () => {
  type PortfolioItem = {
    id: string;
    title: string;
    description: string;
    specs: string;
    location: string;
    image: string;
    images: string[];
    category: string;
  };

  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  useEffect(() => {
    // Projeler verisinden ilk 8 projeyi al
    const featuredProjects = (projectsData as PortfolioItem[]).slice(0, 8);
    setItems(featuredProjects);
  }, []);

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-foreground font-extralight mb-6">
            Projelerimiz
          </h2>
          <p className="text-xl text-muted-foreground font-light max-w-3xl mx-auto">
            Başarıyla Tamamladığımız Projelerimiz
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <motion.div
                className="relative bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
                onClick={() => {
                  setSelectedProject(project);
                  setSelectedImageIdx(0);
                }}
              >
                <div className={`h-64 relative`}>
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    fill 
                    sizes="(max-width:768px) 100vw, 25vw" 
                    className="object-cover" 
                    onError={() => {
                      console.error('Image failed to load:', project.image);
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent" />
                </div>

                <div className="p-6">
                  <div className="text-sm text-muted-foreground font-medium mb-2">
                    {project.location}
                  </div>
                  
                  <h3 className="text-xl font-light text-foreground mb-2">
                    {project.title}
                  </h3>

                  <div className="text-sm text-accent font-medium mb-4">
                    {project.specs}
                  </div>

                  <motion.div
                    className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Button
                      size="lg"
                      className="bg-accent hover:bg-accent/90 text-white px-6 py-3 text-base font-medium rounded-2xl shadow-xl"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                        setSelectedImageIdx(0);
                      }}
                    >
                      Detayları Gör
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-accent text-accent hover:bg-accent hover:text-white px-8 py-4 text-lg font-medium rounded-2xl transition-all duration-300"
          >
            <Link href="/projeler">
              Tüm Projeleri Gör
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Gallery Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl bg-white rounded-2xl overflow-hidden">
            <div className="relative w-full h-[60vh]">
              <Image
                src={selectedProject.images[selectedImageIdx] || selectedProject.image}
                alt={selectedProject.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                quality={90}
                priority={true}
                className="object-contain bg-black"
                onError={() => {
                  console.error('Modal image failed to load:', selectedProject.images[selectedImageIdx] || selectedProject.image);
                }}
              />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <div className="text-lg font-medium">{selectedProject.title}</div>
                <div className="text-sm text-muted-foreground">{selectedProject.specs}</div>
                <div className="text-sm mt-2">{selectedProject.description}</div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => setSelectedImageIdx((i) => Math.max(0, i - 1))}>Önceki</Button>
                <Button variant="outline" onClick={() => setSelectedImageIdx((i) => Math.min((selectedProject.images.length - 1), i + 1))}>Sonraki</Button>
                <Button onClick={() => setSelectedProject(null)}>Kapat</Button>
              </div>
            </div>
            <div className="px-4 pb-4 grid grid-cols-6 gap-2 max-h-40 overflow-auto">
              {selectedProject.images.map((img, idx) => (
                <div key={img} className={`relative h-16 cursor-pointer rounded ${idx === selectedImageIdx ? 'ring-2 ring-accent' : ''}`} onClick={() => setSelectedImageIdx(idx)}>
                  <Image 
                    src={img} 
                    alt={`thumb-${idx}`} 
                    fill 
                    sizes="(max-width: 768px) 15vw, 10vw" 
                    quality={70}
                    loading="lazy"
                    className="object-cover" 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PortfolioGrid;

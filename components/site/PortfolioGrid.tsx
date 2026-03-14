"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import GalleryModal from "@/components/site/GalleryModal";
import Image from "next/image";
import { useState, useMemo } from "react";
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

  const items = useMemo(() => (projectsData as PortfolioItem[]).slice(0, 8), []);
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
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
                <div className={`h-56 sm:h-64 relative`}>
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    fill 
                    sizes="(max-width:768px) 100vw, 25vw" 
                    quality={80}
                    loading="lazy"
                    className="object-cover"
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

                  {/* Mobile Button - Always Visible */}
                  <div className="sm:hidden flex justify-center">
                    <Button
                      size="lg"
                      className="bg-accent hover:bg-accent/80 text-white px-6 py-3 text-base font-medium rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                        setSelectedImageIdx(0);
                      }}
                    >
                      Detayları Gör
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>

                  {/* Desktop Overlay Button */}
                  <motion.div
                    className="hidden sm:flex absolute inset-0 bg-black/60 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Button
                      size="lg"
                      className="bg-accent hover:bg-accent/80 text-white px-6 py-3 text-base font-medium rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105"
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

      {selectedProject && (
        <GalleryModal
          title={selectedProject.title}
          specs={selectedProject.specs}
          images={selectedProject.images}
          mainImage={selectedProject.image}
          selectedIdx={selectedImageIdx}
          onIndexChange={setSelectedImageIdx}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default PortfolioGrid;

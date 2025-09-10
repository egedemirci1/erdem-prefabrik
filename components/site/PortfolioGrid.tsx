"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const PortfolioGrid = () => {
  type PortfolioItem = {
    id: string;
    title: string;
    description: string;
    specs: string;
    location: string;
    image: string;
    images: string[];
  };

  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        const list = ((data.projects ?? []) as PortfolioItem[]).slice(0, 8);
        setItems(list);
      } catch {}
    })();
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
                  setCurrentImageIndex(0);
                }}
              >
                <div className={`h-64 relative`}>
                  <Image src={project.image} alt={project.title} fill sizes="(max-width:768px) 100vw, 25vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent" />
                </div>

                <div className="p-6">
                  <div className="text-sm text-muted-foreground font-medium mb-2">
                    {project.location}
                  </div>
                  
                  <h3 className="text-xl font-light text-foreground mb-2">
                    {project.title}
                  </h3>
                  
                  {/* Kategori satırı (açıklama) kaldırıldı */}

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
                        setCurrentImageIndex(0);
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

      {/* Modal Gallery */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h3 className="text-xl font-light text-foreground">{selectedProject.title}</h3>
                <p className="text-sm text-muted-foreground">{selectedProject.location}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedProject(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Image Gallery */}
            <div className="relative">
              <div className="aspect-video relative">
                <Image
                  src={selectedProject.images[currentImageIndex] || selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 80vw"
                  className="object-cover"
                  quality={90}
                />
              </div>

              {/* Navigation */}
              {selectedProject.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
                    onClick={() => setCurrentImageIndex((prev) => 
                      prev === 0 ? selectedProject.images.length - 1 : prev - 1
                    )}
                  >
                    ←
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
                    onClick={() => setCurrentImageIndex((prev) => 
                      prev === selectedProject.images.length - 1 ? 0 : prev + 1
                    )}
                  >
                    →
                  </Button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {selectedProject.images.length > 1 && (
              <div className="p-4 border-t">
                <div className="flex gap-2 overflow-x-auto">
                  {selectedProject.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                        index === currentImageIndex ? 'border-accent' : 'border-transparent'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${selectedProject.title} - ${index + 1}`}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Project Info */}
            <div className="p-6 border-t">
              <div className="text-sm text-accent font-medium mb-2">
                {selectedProject.specs}
              </div>
              <p className="text-sm text-muted-foreground">
                {selectedProject.description}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default PortfolioGrid;

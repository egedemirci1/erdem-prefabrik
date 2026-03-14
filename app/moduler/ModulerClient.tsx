"use client";

import { useSearchParams } from 'next/navigation';
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { filterProjectsBySubCategory, type Project } from "@/lib/categories";
import Breadcrumb from "@/components/site/Breadcrumb";
import GalleryModal from "@/components/site/GalleryModal";

export default function ModulerClient({ initialProjects }: { initialProjects: Project[] }) {
  const searchParams = useSearchParams();
  const sub = searchParams.get('category');

  const [projects] = useState<Project[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  const { title, description } = useMemo(() => {
    switch (sub) {
      case 'bungalow':
      case 'tiny-house': return { title: 'Bungalow & Tiny House', description: '2 Katlı Bungalow Ve Kompakt Tiny House Çözümleri' };
      case 'ofis':
      case 'moduler-ev': return { title: 'Modüler Ev & Ofis', description: 'Modern Ve Konforlu Modüler Ev Ve Ofis Tasarımları' };
      case 'sifir-atik': return { title: 'Sıfır Atık', description: 'Çevre Dostu Sıfır Atık Modüler Yapıları' };
      default: return { title: 'Modüler Yapılar', description: 'Esnek, Özelleştirilebilir Modüler Çözümler' };
    }
  }, [sub]);

  const filtered = useMemo(() => {
    if (!projects.length) return [] as Project[];
    return filterProjectsBySubCategory(projects, sub);
  }, [projects, sub]);

  const breadcrumbItems = [
    { name: "Ana Sayfa", href: "/" },
    { name: "Modüler", href: "/moduler" },
    ...(sub ? [{ name: title, href: `/moduler?category=${sub}` }] : []),
  ];

  return (
    <main className="min-h-screen">
      <Header />
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extralight text-foreground mb-6">{title} | Konya Prefabrik - Erdem Prefabrik</h1>
            <p className="text-xl text-muted-foreground font-light max-w-3xl mx-auto">{description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((p, index) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true, margin: "-50px" }}
                className="group"
              >
                <motion.div
                  className="relative bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative h-48">
                    <Image 
                      src={p.image} 
                      alt={p.title} 
                      fill 
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" 
                      quality={80}
                      loading="lazy"
                      className="object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent" />
                  </div>

                  <motion.div
                    className="hidden sm:flex absolute inset-0 bg-black/60 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Button
                      size="lg"
                      onClick={() => { setSelectedProject(p); setSelectedImageIdx(0); }}
                      className="bg-accent hover:bg-accent/80 text-white px-6 py-3 text-base font-medium rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105"
                    >
                      Detayları Gör
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>

                  <div className="p-6">
                    <div className="text-sm text-muted-foreground mb-2">{p.location}</div>
                    <h3 className="text-xl font-light text-foreground mb-1">{p.title}</h3>
                    <div className="text-sm text-accent font-medium mb-4">{p.specs}</div>

                    <div className="sm:hidden flex justify-center">
                      <Button
                        size="lg"
                        onClick={() => { setSelectedProject(p); setSelectedImageIdx(0); }}
                        className="bg-accent hover:bg-accent/80 text-white px-6 py-3 text-base font-medium rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105"
                      >
                        Detayları Gör
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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

      <Footer />
    </main>
  );
}

"use client";
import type { Metadata } from "next";

import { useSearchParams } from 'next/navigation';
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Image from "next/image";
import { useEffect, useMemo, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function ModulerPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted-foreground">Yükleniyor…</div>}>
      <ModulerContent />
    </Suspense>
  );
}

function ModulerContent() {
  const searchParams = useSearchParams();
  const sub = searchParams.get('category');

  type Project = { id: string; category: 'prefabrik'|'celik'|'konteyner'|'tiny-house'|'santiye'|'moduler'|'deprem'; title: string; description: string; specs: string; location: string; image: string; images: string[]; area?: number; group?: string; };

  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  useEffect(() => { 
    (async () => { 
      try { 
        setLoading(true); 
        const r = await fetch('/api/projects?category=moduler&limit=100'); 
        const d = await r.json(); 
        setProjects(d.projects ?? []);
      } finally { 
        setLoading(false);
      } 
    })(); 
  }, []);

  const { title, description } = useMemo(() => {
    switch (sub) {
      case 'bungalow':
      case 'tiny-house': return { title: 'Bungalow & Tiny House', description: 'Tek katlı bungalow ve kompakt tiny house çözümleri' };
      case 'ofis': return { title: 'Modüler Ofis', description: 'Esnek ve özelleştirilebilir ofis alanları' };
      case 'moduler-ev': return { title: 'Modüler Ev', description: 'Modern ve konforlu modüler ev tasarımları' };
      case 'sifir-atik': return { title: 'Sıfır Atık', description: 'Çevre dostu sıfır atık modüler yapıları' };
      default: return { title: 'Modüler Yapılar', description: 'Esnek, özelleştirilebilir modüler çözümler' };
    }
  }, [sub]);

  const filtered = useMemo(() => {
    if (!projects.length) return [] as Project[];
    
    return projects.filter((p) => {
      if (p.category !== 'moduler') return false;
      const id = p.id.toUpperCase();
      
      // First check for bungalow and tiny house (these take priority)
      if (sub === 'bungalow' || sub === 'tiny-house') {
        return id.includes('BUNGAL') || id.includes('BUNGALOW') || id.includes('bungalow') || id.includes('TİNY') || id.includes('TINY') || 
               id.includes('TRIANA') || id.includes('triana') || id.includes('ÜÇGEN');
      }
      
      // Then check other categories
      if (sub === 'ofis') return id.includes('OFİS') || id.includes('OFIS');
      if (sub === 'sifir-atik') return id.includes('SIFIR') || id.includes('SIFIR') || id.includes('ATIK') || id.includes('ATIK');
      if (sub === 'moduler-ev') {
        // Exclude bungalow, tiny house, and sifir atik from moduler-ev
        const isBungalowOrTiny = id.includes('BUNGAL') || id.includes('BUNGALOW') || id.includes('bungalow') || id.includes('TİNY') || id.includes('TINY') || 
                               id.includes('TRIANA') || id.includes('triana') || id.includes('ÜÇGEN');
        const isSifirAtik = id.includes('SIFIR') || id.includes('ATIK');
        if (isBungalowOrTiny || isSifirAtik) return false;
        return id.includes('EVLER') || id.includes('EV');
      }
      return true;
    });
  }, [projects, sub]);

  return (
    <main className="min-h-screen">
      <Header />
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extralight text-foreground mb-6">{title}</h1>
            <p className="text-xl text-muted-foreground font-light max-w-3xl mx-auto">{description}</p>
          </div>

          {loading && <div className="text-center text-muted-foreground">Yükleniyor…</div>}
          {!loading && (
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

                    {/* Hover Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <Button
                        size="lg"
                        onClick={() => { setSelectedProject(p); setSelectedImageIdx(0); }}
                        className="bg-accent hover:bg-accent/90 text-white px-6 py-3 text-base font-medium rounded-2xl shadow-xl"
                      >
                        Detayları Gör
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>

                    <div className="p-6">
                      <div className="text-sm text-muted-foreground mb-2">{p.location}</div>
                      <h3 className="text-xl font-light text-foreground mb-1">{p.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{p.description}</p>
                      <div className="text-sm text-accent font-medium">{p.specs}</div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

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

      <Footer />
    </main>
  );
}

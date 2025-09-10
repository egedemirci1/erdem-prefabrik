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

export default function PrefabrikCelikPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted-foreground">Yükleniyor…</div>}>
      <PrefabrikCelikContent />
    </Suspense>
  );
}

function PrefabrikCelikContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  type Project = {
    id: string;
    category: 'prefabrik' | 'celik' | 'konteyner' | 'tiny-house' | 'santiye' | 'moduler' | 'deprem';
    title: string;
    description: string;
    specs: string;
    location: string;
    image: string;
    images: string[];
    area?: number;
    group?: string;
  };

  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const categoryType = category === 'celik-ev-villa' ? 'celik' : 
                            category === 'santiye' ? 'santiye' : 'prefabrik';
        const res = await fetch(`/api/projects?category=${categoryType}`);
        const data = await res.json();
        setProjects(data.projects ?? []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [category]);

  const { title, description } = useMemo(() => {
    switch (category) {
      case 'prefabrik-ev-villa':
        return { title: 'Prefabrik Ev & Villa', description: 'Hızlı kurulum prefabrik ev çözümleri' };
      case 'prefabrik-santiye-yapilari':
      case 'santiye':
        return { title: 'Şantiye & Özel Kullanım', description: 'Şantiye binaları ve özel kullanım alanları' };
      case 'celik-ev-villa':
        return { title: 'Çelik Ev & Villa', description: 'Lüks ve konforlu çelik ev çözümleri' };
      default:
        return { title: 'Prefabrik Çelik Yapılar', description: 'Modern, dayanıklı ve estetik çözümler' };
    }
  }, [category]);

  const filtered = useMemo(() => {
    let cat: Project['category'] | undefined;
    let group: string | undefined;
    switch (category) {
      case 'prefabrik-ev-villa': cat = 'prefabrik'; group = undefined; break; // Ev & Ofis birlikte
      case 'prefabrik-santiye-yapilari':
      case 'santiye': cat = 'santiye'; break;
      case 'celik-ev-villa': cat = 'celik'; group = undefined; break; // Ev & Ofis birlikte
      default: return projects.filter(p => p.category === 'prefabrik' || p.category === 'celik');
    }
    const base = projects.filter(p => p.category === cat);
    if (!group) return base;
    const byGroup = base.filter(p => (p.group === group || p.title.includes(group) || p.specs.includes(group)));
    return byGroup.length > 0 ? byGroup : base;
  }, [projects, category]);

  return (
    <main className="min-h-screen">
      <Header />
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extralight text-foreground mb-6">{title}</h1>
            <p className="text-xl text-muted-foreground font-light max-w-3xl mx-auto">{description}</p>
          </div>

          {loading && (
            <div className="text-center text-muted-foreground">Yükleniyor…</div>
          )}

          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((project, index) => (
                <motion.div
                  key={project.id}
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
                        src={project.image} 
                        alt={project.title} 
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
                        onClick={() => { setSelectedProject(project); setSelectedImageIdx(0); }}
                        className="bg-accent hover:bg-accent/90 text-white px-6 py-3 text-base font-medium rounded-2xl shadow-xl"
                      >
                        Detayları Gör
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>

                    <div className="p-6">
                      <div className="text-sm text-muted-foreground mb-2">{project.location}</div>
                      <h3 className="text-xl font-light text-foreground mb-1">{project.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                      <div className="text-sm text-accent font-medium">{project.specs}</div>
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

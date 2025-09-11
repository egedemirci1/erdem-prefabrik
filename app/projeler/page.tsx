"use client";

import { useEffect, useMemo, useState } from 'react';
import { motion } from "framer-motion";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Grid, List } from "lucide-react";
import Image from "next/image";
import projectsData from '@/data/projects.json';

export default function ProjelerPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const PAGE_SIZE = 12;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  const categories = [
    { id: 'all', name: 'Tümü' },
    { id: 'prefabrik', name: 'Prefabrik Yapılar' },
    { id: 'celik', name: 'Hafif Çelik Yapılar' },
    { id: 'konteyner', name: 'Konteynerlar' },
    { id: 'tiny-house', name: 'Tiny House & Mobil' },
    { id: 'santiye', name: 'Şantiye & Özel Kullanım' },
    { id: 'moduler', name: 'Modüler' },
    { id: 'deprem', name: 'Deprem Projeleri' }
  ];

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
  };

  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>(projectsData as Project[]);
  const [totalProjects, setTotalProjects] = useState(projectsData.length);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<'area-desc' | 'area-asc' | 'default'>('default');

  const loadProjects = async (page: number = 1, category: string = 'all', append: boolean = false) => {
    try {
      setLoading(true);
      // Statik veri kullan
      let filteredProjects = projectsData as Project[];
      
      if (category !== 'all') {
        filteredProjects = filteredProjects.filter(p => p.category === category);
      }
      
      // Sıralama
      if (sortKey === 'area-desc') {
        filteredProjects = filteredProjects.sort((a, b) => (b.area ?? -1) - (a.area ?? -1));
      } else if (sortKey === 'area-asc') {
        filteredProjects = filteredProjects.sort((a, b) => (a.area ?? -1) - (b.area ?? -1));
      }
      
      // Sayfalama
      const startIndex = (page - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      const paginatedProjects = filteredProjects.slice(startIndex, endIndex);
      
      if (append) {
        setProjects(prev => [...prev, ...paginatedProjects]);
      } else {
        setProjects(paginatedProjects);
      }
      
      setTotalProjects(filteredProjects.length);
      setCurrentPage(page);
      setLoading(false);
    } catch (error) {
      console.error('Projeler yüklenirken hata:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects(1, selectedCategory);
  }, [selectedCategory]);

  const sortedProjects = useMemo(() => {
    if (sortKey === 'default') return projects;
    const copy = [...projects];
    copy.sort((a, b) => {
      const av = a.area ?? Number.NEGATIVE_INFINITY;
      const bv = b.area ?? Number.NEGATIVE_INFINITY;
      return sortKey === 'area-desc' ? bv - av : av - bv;
    });
    return copy;
  }, [projects, sortKey]);

  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extralight text-foreground mb-6">
              Projelerimiz
            </h1>
            <p className="text-xl text-muted-foreground font-light max-w-3xl mx-auto">
              Tamamladığımız Başarılı Projelerden Örnekler
            </p>
          </div>

          {/* Filters and View Controls */}
          <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-6">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => { 
                    setSelectedCategory(category.id); 
                    setProjects([]); // Önceki projeleri temizle
                    loadProjects(1, category.id); 
                  }}
                  className="rounded-xl"
                >
                  {category.name}
                </Button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-white rounded-xl p-1">
              <Button
                variant={viewMode === 'grid' ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-lg"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-lg"
              >
                <List className="w-4 h-4" />
              </Button>
              <select
                className="ml-2 text-sm border rounded-lg px-2 py-1"
                value={sortKey}
                onChange={(e) => {
                  const value = e.target.value as 'area-desc' | 'area-asc' | 'default';
                  setSortKey(value);
                }}
              >
                <option value="default">Sıralama: Varsayılan</option>
                <option value="area-desc">m²: Büyükten küçüğe</option>
                <option value="area-asc">m²: Küçükten büyüğe</option>
              </select>
            </div>
          </div>

          {/* Projects Grid/List */}
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            : "space-y-6"
          }>
            {loading && (
              <div className="col-span-full text-center text-muted-foreground py-10">Yükleniyor…</div>
            )}
            {!loading && sortedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true, margin: "-50px" }}
                className="group"
              >
                <motion.div
                  className={`relative bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                   {/* Project Image */}
                   <div className={`relative ${
                     viewMode === 'list' ? 'w-48 h-32' : 'h-48'
                   }`}>
                     <Image
                       src={project.image}
                       alt={project.title}
                       fill
                       sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                       quality={80}
                       loading={index < 3 ? "eager" : "lazy"}
                       priority={index < 3}
                       className="object-cover"
                       onError={() => {
                         console.error('Image failed to load:', project.image);
                       }}
                     />
                     <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent" />
                      {/* Removed filter icon button */}
                   </div>

                  {/* Project Content */}
                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="text-sm text-muted-foreground font-medium mb-2">
                      {project.location}
                    </div>
                    
                    <h3 className="text-xl font-light text-foreground mb-2">
                      {project.title}
                    </h3>
                    
                    <p className="text-muted-foreground font-light text-sm mb-3 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm text-accent font-medium">{project.specs}</div>
                      {project.area && (
                        <div className="text-sm text-foreground">{project.area} m²</div>
                      )}
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
                  </div>
                </motion.div>
              </motion.div>
            ))}
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

          {/* Results Count */}
          <div className="text-center mt-12 space-y-4">
            <div className="text-muted-foreground">
              {projects.length} / {totalProjects} proje gösteriliyor
            </div>
            {currentPage * PAGE_SIZE < totalProjects && (
              <Button
                onClick={() => loadProjects(currentPage + 1, selectedCategory, true)}
                className="rounded-xl"
                disabled={loading}
              >
                {loading ? 'Yükleniyor...' : 'Daha Fazla Yükle'}
              </Button>
            )}
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}


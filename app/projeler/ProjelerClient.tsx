"use client";

import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from "framer-motion";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Grid, List } from "lucide-react";
import Image from "next/image";
import Breadcrumb from "@/components/site/Breadcrumb";
import GalleryModal from "@/components/site/GalleryModal";
import type { Project } from "@/lib/categories";

const categories = [
  { id: 'all', name: 'Tümü' },
  { id: 'prefabrik', name: 'Prefabrik Yapılar' },
  { id: 'celik', name: 'Hafif Çelik Yapılar' },
  { id: 'santiye', name: 'Şantiye & Özel Kullanım' },
  { id: 'moduler', name: 'Modüler' },
];

const PAGE_SIZE = 12;

export default function ProjelerClient({ initialProjects }: { initialProjects: Project[] }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [totalProjects, setTotalProjects] = useState(initialProjects.length);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<'area-desc' | 'area-asc' | 'default'>('default');

  const loadProjects = useCallback((page: number = 1, category: string = 'all', append: boolean = false) => {
    setLoading(true);
    let filteredProjects = category === 'all'
      ? [...initialProjects]
      : initialProjects.filter(p => p.category === category);

    if (sortKey === 'area-desc') {
      filteredProjects = [...filteredProjects].sort((a, b) => (b.area ?? -1) - (a.area ?? -1));
    } else if (sortKey === 'area-asc') {
      filteredProjects = [...filteredProjects].sort((a, b) => (a.area ?? -1) - (b.area ?? -1));
    }

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
  }, [initialProjects, sortKey]);

  useEffect(() => {
    loadProjects(1, selectedCategory);
  }, [selectedCategory, loadProjects]);

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
          <Breadcrumb items={[
            { name: "Ana Sayfa", href: "/" },
            { name: "Projeler", href: "/projeler" },
          ]} />
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extralight text-foreground mb-6">
              Projelerimiz | Konya Prefabrik - Erdem Prefabrik
            </h1>
            <p className="text-xl text-muted-foreground font-light max-w-3xl mx-auto">
              Tamamladığımız Başarılı Projelerden Örnekler
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => { 
                  setSelectedCategory(category.id); 
                  setProjects([]);
                }}
                className="rounded-xl text-xs sm:text-sm px-3 py-2"
              >
                {category.name}
              </Button>
            ))}
          </div>

          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-2 bg-white rounded-xl p-1 shadow-sm">
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
                aria-label="Projeleri sırala"
                className="ml-2 text-sm border rounded-lg px-2 py-1 bg-white"
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
                     />
                     <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent" />
                   </div>

                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="text-sm text-muted-foreground font-medium mb-2">
                      {project.location}
                    </div>
                    
                    <h3 className="text-xl font-light text-foreground mb-2">
                      {project.title}
                    </h3>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm text-accent font-medium">{project.specs}</div>
                      {project.area && (
                        <div className="text-sm text-foreground">{project.area} m²</div>
                      )}
                    </div>

                    <div className="sm:hidden flex justify-center">
                      <Button
                        size="lg"
                        onClick={() => { setSelectedProject(project); setSelectedImageIdx(0); }}
                        className="bg-accent hover:bg-accent/80 text-white px-6 py-3 text-base font-medium rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105"
                      >
                        Detayları Gör
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>

                    <motion.div
                      className="hidden sm:flex absolute inset-0 bg-black/60 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <Button
                        size="lg"
                        onClick={() => { setSelectedProject(project); setSelectedImageIdx(0); }}
                        className="bg-accent hover:bg-accent/80 text-white px-6 py-3 text-base font-medium rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105"
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

          <div className="text-center mt-12 space-y-4">
            <div className="text-muted-foreground">
              {projects.length} / {totalProjects} Proje Gösteriliyor
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

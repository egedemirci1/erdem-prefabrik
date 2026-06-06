"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/site/Breadcrumb";
import GalleryModal from "@/components/site/GalleryModal";
import type { Project } from "@/lib/categories";

export default function PrefabrikCelikClient({ initialProjects }: { initialProjects: Project[] }) {
  const t = useTranslations("prefabSteelPage");
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const [projects] = useState<Project[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  const { title, description } = useMemo(() => {
    switch (category) {
      case "prefabrik-ev-villa":
        return { title: t("prefabHomeTitle"), description: t("prefabHomeDesc") };
      case "prefabrik-santiye-yapilari":
      case "santiye":
        return { title: t("constructionTitle"), description: t("constructionDesc") };
      case "celik-ev-villa":
        return { title: t("steelHomeTitle"), description: t("steelHomeDesc") };
      default:
        return { title: t("defaultTitle"), description: t("defaultDesc") };
    }
  }, [category, t]);

  const filtered = useMemo(() => {
    let cat: Project["category"] | undefined;
    let group: string | undefined;
    switch (category) {
      case "prefabrik-ev-villa":
        cat = "prefabrik";
        break;
      case "prefabrik-santiye-yapilari":
      case "santiye":
        cat = "santiye";
        break;
      case "celik-ev-villa":
        cat = "celik";
        break;
      default:
        return projects.filter((p) => p.category === "prefabrik" || p.category === "celik");
    }
    const base = projects.filter((p) => p.category === cat);
    if (!group) return base;
    const byGroup = base.filter(
      (p) =>
        (p as Project & { group?: string }).group === group ||
        p.title.includes(group) ||
        p.specs.includes(group)
    );
    return byGroup.length > 0 ? byGroup : base;
  }, [projects, category]);

  const breadcrumbItems = [
    { name: tCommon("home"), href: "/" as const },
    { name: tNav("prefabSteel"), href: "/prefab-steel" as const },
    ...(category ? [{ name: title, href: { pathname: "/prefab-steel" as const, query: { category } } }] : []),
  ];

  return (
    <main className="min-h-screen">
      <Header />
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extralight text-foreground mb-6">{title} {tCommon("h1Suffix")}</h1>
            <p className="text-xl text-muted-foreground font-light max-w-3xl mx-auto">{description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((p, index) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }} viewport={{ once: true, margin: "-50px" }} className="group">
                <motion.div className="relative bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer" whileHover={{ scale: 1.02, y: -5 }} transition={{ duration: 0.2 }}>
                  <div className="relative h-48 overflow-hidden">
                    <Image src={p.image} alt={p.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" quality={80} loading="lazy" className="object-cover" />
                  </div>
                  <motion.div className="hidden sm:flex absolute inset-0 bg-black/60 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="lg" onClick={() => { setSelectedProject(p); setSelectedImageIdx(0); }} className="bg-accent hover:bg-accent/80 text-white px-6 py-3 text-base font-medium rounded-2xl shadow-xl">
                      {tCommon("viewDetails")}<ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                  <div className="p-6">
                    <div className="text-sm text-muted-foreground mb-2">{p.location}</div>
                    <h3 className="text-xl font-light text-foreground mb-1">{p.title}</h3>
                    <div className="text-sm text-accent font-medium mb-4">{p.specs}</div>
                    <div className="sm:hidden flex justify-center">
                      <Button size="lg" onClick={() => { setSelectedProject(p); setSelectedImageIdx(0); }} className="bg-accent hover:bg-accent/80 text-white px-6 py-3 text-base font-medium rounded-2xl shadow-xl">
                        {tCommon("viewDetails")}<ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {selectedProject && <GalleryModal title={selectedProject.title} specs={selectedProject.specs} images={selectedProject.images} mainImage={selectedProject.image} selectedIdx={selectedImageIdx} onIndexChange={setSelectedImageIdx} onClose={() => setSelectedProject(null)} />}
      <Footer />
    </main>
  );
}

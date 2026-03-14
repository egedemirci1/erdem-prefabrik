import { Suspense } from "react";
import PrefabrikCelikClient from "./PrefabrikCelikClient";
import projectsPrefabrikCelik from "@/data/projects-prefabrik-celik.json";
import type { Project } from "@/lib/categories";

export default function PrefabrikCelikPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted-foreground">Yükleniyor…</div>}>
      <PrefabrikCelikClient initialProjects={projectsPrefabrikCelik as Project[]} />
    </Suspense>
  );
}

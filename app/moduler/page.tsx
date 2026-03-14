import { Suspense } from "react";
import ModulerClient from "./ModulerClient";
import projectsModuler from "@/data/projects-moduler.json";
import type { Project } from "@/lib/categories";

export default function ModulerPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted-foreground">Yükleniyor…</div>}>
      <ModulerClient initialProjects={projectsModuler as Project[]} />
    </Suspense>
  );
}

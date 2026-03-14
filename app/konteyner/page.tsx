import { Suspense } from "react";
import KonteynerClient from "./KonteynerClient";
import projectsKonteyner from "@/data/projects-konteyner.json";
import type { Project } from "@/lib/categories";

export default function KonteynerPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted-foreground">Yükleniyor…</div>}>
      <KonteynerClient initialProjects={projectsKonteyner as Project[]} />
    </Suspense>
  );
}

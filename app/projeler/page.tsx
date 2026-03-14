import ProjelerClient from "./ProjelerClient";
import projectsData from '@/data/projects.json';
import type { Project } from "@/lib/categories";

export default function ProjelerPage() {
  return <ProjelerClient initialProjects={projectsData as Project[]} />;
}

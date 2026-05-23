import site from "@/config/site.json";
import projects from "@/config/projects.json";

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  email: string;
  location: string;
  navigation: { name: string; href: string }[];
  social: Record<string, string>;
};

export type Project = {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  github: string;
};

export function getSiteConfig(): SiteConfig {
  return site as SiteConfig;
}

export function getProjects(): Project[] {
  return projects as Project[];
}

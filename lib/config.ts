type SiteConfig = {
  name: string;
  description: string;
  url: string;
  email: string;
  location: string;
  navigation: { name: string; href: string }[];
  social: Record<string, string>;
};

type Project = {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  github: string;
};

export function getSiteConfig(): SiteConfig {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require("../config/site.json");
}

export function getProjects(): Project[] {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require("../config/projects.json");
}

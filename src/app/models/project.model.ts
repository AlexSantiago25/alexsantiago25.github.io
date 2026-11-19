export interface ProjectFeature {
  title: string;
  description: string;
  icon: string;
}

export interface ProjectScreenshot {
  url: string;
  title: string;
  description: string;
}

export interface TechItem {
  name: string;
  category: 'core' | 'state' | 'database' | 'native' | 'graphics';
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: 'mobile' | 'creative' | 'gamification';
  categoryLabel: string;
  logoUrl: string;
  coverImage: string;
  summary: string;
  fullOverview: string;
  inspiration?: string;
  highlights: string[];
  features: ProjectFeature[];
  technologies: TechItem[];
  screenshots: ProjectScreenshot[];
  githubUrl: string;
  accentColor: string;
  accentGradient: string;
  badgeStyle: 'badge-purple' | 'badge-amber' | 'badge-cyan' | 'badge-emerald';
  badgeLabel: string;
}

export interface EnterpriseVideo {
  url: string;
  title: string;
}

export interface EnterpriseAppDemo {
  id: string;
  title: string;
  subtitle: string;
  videoUrl?: string; // backwards compatibility
  videos: EnterpriseVideo[];
  sourceContext: string;
  summary: string;
  technicalHighlights: string[];
  technologies: string[];
  badge: string;
}

export interface WorkExperienceItem {
  company: string;
  role: string;
  period: string;
  type: string;
  summary: string;
  achievements: {
    title: string;
    description: string;
  }[];
  technologies: string[];
}

export interface EducationItem {
  institution: string;
  institutionUrl: string;
  degree: string;
  period: string;
  location: string;
  status: string;
  highlights: string[];
}

export interface DeveloperProfile {
  name: string;
  alias: string;
  photoUrl: string;
  title: string;
  secondaryTitle: string;
  location: string;
  bio: string;
  githubUrl: string;
  githubUser: string;
  linkedinUrl: string;
  email: string;
  status: string;
  skills: {
    category: string;
    items: string[];
  }[];
}

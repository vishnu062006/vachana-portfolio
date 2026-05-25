export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  image?: string;
  featured?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: number; // 0-100
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  stat?: string;
}

export interface LeadershipRole {
  id: string;
  title: string;
  organization: string;
  description: string;
  period?: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  cgpa: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface PersonalInfo {
  name: string;
  role: string;
  tagline: string;
  email: string;
  phone: string;
  education: Education;
  socials: SocialLink[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NavItem {
  label: string;
  href: string;
}

import type {
  PersonalInfo,
  SkillCategory,
  Project,
  Achievement,
  LeadershipRole,
  NavItem,
} from "@/types";

export const personalInfo: PersonalInfo = {
  name: "Vachana M H",
  role: "Full Stack Web Developer",
  tagline: "Building scalable digital experiences with elegant engineering.",
  email: "vachanamh@gmail.com",
  phone: "9448580777",
  education: {
    degree: "B.E. in Computer Science Engineering",
    institution: "BMS College of Engineering",
    period: "2024–2028",
    cgpa: "8.6",
  },
  socials: [
    {
      name: "GitHub",
      url: "https://github.com/vachanamh-dotcom",
      icon: "github",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/vachana-m-h-1321623b4/",
      icon: "linkedin",
    },
  ],
};

export const navItems: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    icon: "code-2",
    skills: [
      { name: "TypeScript", level: 85 },
      { name: "Java", level: 90 },
      { name: "Python", level: 85 },
      { name: "C++", level: 80 },
      { name: "C", level: 80 },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    icon: "layout",
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 88 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Framer Motion", level: 82 },
      { name: "HTML", level: 95 },
      { name: "CSS", level: 92 },
      { name: "JavaScript", level: 90 },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: "server",
    skills: [
      { name: "Spring Boot", level: 85 },
      { name: "REST APIs", level: 90 },
      { name: "JWT Auth", level: 82 },
      { name: "JPA", level: 80 },
      { name: "JDBC", level: 78 },
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 85 },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    icon: "database",
    skills: [
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 88 },
      { name: "MySQL", level: 82 },
    ],
  },
  {
    id: "core-cs",
    title: "Core CS",
    icon: "cpu",
    skills: [
      { name: "DSA", level: 85 },
      { name: "OOP", level: 90 },
      { name: "DBMS", level: 85 },
      { name: "Operating Systems", level: 80 },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    icon: "wrench",
    skills: [
      { name: "Git", level: 90 },
      { name: "GitHub", level: 90 },
    ],
  },
];

export const projects: Project[] = [
  {
    id: "cookware-matrix",
    title: "Cookware Matrix",
    description:
      "Full-stack e-commerce cookware platform with authentication, product browsing, shopping cart, inventory CRUD operations, responsive UI, and REST API integration.",
    tech: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "HTML",
      "CSS",
      "JavaScript",
    ],
    github: "https://github.com/vachanamh-dotcom",
    featured: true,
  },
  {
    id: "medivault",
    title: "MediVault",
    description:
      "A DigiLocker-inspired healthcare application for securely storing, managing, and accessing medicine prescriptions, health records, and medication-related documents digitally. Designed to simplify healthcare record management with secure authentication and intuitive access.",
    tech: [
      "Next.js",
      "TypeScript",
      "Spring Boot",
      "PostgreSQL",
      "JWT Authentication",
      "REST APIs",
      "Tailwind CSS",
    ],
    github: "https://github.com/vachanamh-dotcom",
    featured: true,
  },
];

export const achievements: Achievement[] = [
  {
    id: "daily-challenge",
    title: "50 Days Daily Challenge",
    description: "Completed a 50-day consecutive coding challenge badge",
    icon: "flame",
    stat: "50",
  },
  {
    id: "hackathon",
    title: "Hackathon Finalist",
    description: "Secured 7th place in a competitive hackathon",
    icon: "trophy",
    stat: "7th",
  },
];

export const leadershipRoles: LeadershipRole[] = [
  {
    id: "team-falcons",
    title: "Core Tech Member",
    organization: "Team Falcons",
    description:
      "Contributing as a core technical member, driving development initiatives and mentoring peers in web technologies.",
  },
  {
    id: "tech-fest",
    title: "Volunteer",
    organization: "College Tech Fest",
    description:
      "Volunteered in organizing and managing a tech fest with 200+ participants, coordinating technical events and logistics.",
  },
  {
    id: "utsav",
    title: "Logistics Senior Coordinator",
    organization: "UTSAV",
    description:
      "Led logistics coordination for UTSAV, managing planning, resource allocation, and on-ground execution.",
  },
];

export const softSkills: string[] = [
  "Problem Solving",
  "Team Collaboration",
  "Time Management",
  "Quick Learner",
];

export const techStackItems: string[] = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Spring Boot",
  "MongoDB",
  "PostgreSQL",
  "Tailwind CSS",
  "Express.js",
  "Git",
  "Java",
  "Python",
  "C++",
  "REST APIs",
  "JWT",
  "HTML",
  "CSS",
  "JavaScript",
];

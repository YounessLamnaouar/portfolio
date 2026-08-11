import profileImage from "../assets/profileImage.png";
import ADII from "../assets/logoADII.png";
import moroCare from '../assets/moroCare.png'

export const profile = {
  name: "Youness LAMNAOUAR",
  role: "Full-Stack Developer",
  description:
    "Full-stack developer with a strong foundation in React.js, Laravel, and system architecture (UML/MVC) — passionate about building clean.",
  location: "Ain Attig, Témara, Morocco",
  email: "Youneslam123@gmail.com",
  phone: "06 94 03 91 88",
  image: profileImage,
  languages: [
    { lang: "French", level: "Fluent" },
    { lang: "English", level: "Intermediate" },
    { lang: "Arabic", level: "Fluent" },
  ],
  resumeUrl: "/CV_YounessLAMNAOUAR.pdf",
  github: "https://github.com/YounessLamnaouar/",
  linkedin: "https://www.linkedin.com/in/youness-lamnaouar-939a79353/",
};

export const hero = {
  greeting: "Welcome !",
  primaryBtn: { label: "Let's get in touch", href: "#contact" },
  secondaryBtn: { label: "Download CV", href: "/CV_YounessLAMNAOUAR.pdf" },
};

export const experience = [
  {
    year: "2025",
    title: "Internship | ADII",
    subtitle: "Administration des Douanes et Impôts Indirects",
    org: "ADII — Morocco",
    description:
      "Participation à la maintenance et au suivi des applications internes. Expérience en environnement professionnel sécurisé et collaboratif.",
    image: ADII,
  },
];

export const education = {
  degrees: [
    {
      year: "2026",
      title: "Bachelor's Degree in Computer Engineering",
      subtitle: "Bac+3 — Computer Engineering",
      org: "Hightech School — Rabat",
      description:
        "Advanced studies in computer engineering, focusing on software development, web technologies, databases, and the design of modern applications.",
    },
    {
      year: "2025",
      title: "Specialized Technician Diploma",
      subtitle: "Digital Development — Full Stack",
      org: "ISTAG Yaacoub El Mansour — Rabat",
      note: "Graduated with Highest Honors — 17.94/20",
      description:
        "Specialized training in full-stack development, covering frontend and backend technologies, databases, APIs, and application development.",
    },
    {
      year: "2023",
      title: "Scientific Baccalaureate",
      subtitle: "Physical Sciences",
      org: "El Mehdi El Manjra High School",
      description:
        "Scientific education with a strong foundation in mathematics, physics, scientific reasoning, and problem-solving.",
    },
  ],

  certifications: [
    {
      year: "2025",
      title: "PIE Certificate",
      subtitle: "Entrepreneurial Innovation Program",
      org: "ISTAG",
      description:
        "Certificate focused on entrepreneurial innovation, creativity, project development, and turning ideas into practical solutions.",
    },
    {
      year: "2024",
      title: "JavaScript Essentials 1",
      subtitle: "JavaScript Fundamentals",
      org: "Cisco Networking Academy",
      description:
        "Training covering JavaScript fundamentals, programming concepts, variables, functions, data structures, and basic application development.",
    },
    {
      year: "2024",
      title: "Computer Hardware Basics",
      subtitle: "Computer Hardware & Components",
      org: "Cisco Networking Academy",
      description:
        "Introduction to computer hardware, components, assembly, maintenance, and basic troubleshooting techniques.",
    },
    {
      year: "2024",
      title: "Introduction to Cybersecurity",
      subtitle: "Cybersecurity Fundamentals",
      org: "Cisco Networking Academy",
      description:
        "Introduction to cybersecurity concepts, common threats, security principles, and best practices for protecting systems and data.",
    },
  ],
};

export const navLinks = [
  { label: "Profile", href: "#profile" },
  { label: "Skills", href: "#skills" },
  { label: "Resume", href: "#resume" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const projects = [
    {
      id: 1,
      title: "MoroCare",
      description:
        "A full-stack e-commerce solution with real-time inventory, Stripe payments, and admin dashboard. Built with performance and scalability in mind.",
      image: moroCare,
      tags: ["React", "Laravel", "MySql"],
      links: {
        github: "https://github.com/yourname/ecommerce",
        live: "https://your-ecommerce-demo.vercel.app",
      },
      date: "2025",
    },
    {
      id: 2,
      title: "AI Content Studio",
      description:
        "An AI-powered content generation platform featuring GPT-4 integration, collaborative editing, and automated SEO optimization.",
      image: "/projects/ai-studio.jpg",
      tags: ["Next.js", "OpenAI", "Tailwind", "Prisma", "Vercel"],
      links: {
        github: "https://github.com/yourname/ai-studio",
        live: "https://ai-studio-demo.vercel.app",
      },
      date: "2024",
    },
    {
      id: 3,
      title: "Real-Time Analytics Dashboard",
      description:
        "Interactive data visualization dashboard processing 10M+ events daily. Features custom D3 charts, WebSocket live updates, and export capabilities.",
      image: "/projects/analytics.jpg",
      tags: ["React", "D3.js", "WebSockets", "Go", "ClickHouse"],
      links: {
        github: "https://github.com/yourname/analytics",
        live: "https://analytics-demo.vercel.app",
      },
      date: "2023",
    },
    {
      id: 4,
      title: "Mobile Fitness App",
      description:
        "Cross-platform fitness tracking application with workout plans, progress analytics, and social features. Integrated with Apple HealthKit and Google Fit.",
      image: "/projects/fitness.jpg",
      tags: ["React Native", "TypeScript", "Firebase", "GraphQL"],
      links: {
        github: "https://github.com/yourname/fitness-app",
      },
      date: "2023",
    },
    {
      id: 5,
      title: "Design System Library",
      description:
        "A comprehensive component library used across 12 products. Includes 60+ accessible components, theming engine, and Storybook documentation.",
      image: "/projects/design-system.jpg",
      tags: ["React", "TypeScript", "Storybook", "CSS Modules", "A11y"],
      links: {
        github: "https://github.com/yourname/design-system",
        live: "https://design-system-demo.vercel.app",
      },
      date: "2023",
    },
  ];




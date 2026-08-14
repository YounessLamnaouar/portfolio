import profileImage from "../assets/profileImage.png";
import ADII from "../assets/logoADII.png";
import moroCare from "../assets/moroCare.png";
import WareTrack from "../assets/wareTrack.png";
import WanderlustWorld from '../assets/WanderlustWorld.png';

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
      "A modern healthcare platform designed to simplify access to medical services in Morocco. It allows users to book appointments with doctors, communicate through text-based teleconsultations, and use an AI assistant for medical orientation. The platform also includes secure authentication and dedicated dashboards for users, doctors, and administrators.",
    image: moroCare,
    tags: [
      "React",
      "Laravel",
      "MySQL",
      "Tailwind CSS",
      "Shadcn UI",
      "React Bits",
    ],
    links: {
      github: "https://github.com/YounessLamnaouar/MoroCare_Frontend",
      live: "https://moro-care-frontend.vercel.app/",
    },
    date: "2025",
  },
  {
    id: 2,
    title: "WareTrack",
    description:
      "A web-based multi-warehouse stock management system designed to centralize products, warehouses, inventory, and stock movements. The platform provides role-based access for administrators, managers, and agents, with complete operation traceability, analytical dashboards, stock alerts, transfer management, and Excel data export.",
    image: WareTrack,
    tags: [
      "React",
      "Laravel",
      "MySQL",
      "Laravel Sanctum",
      "Axios",
      "Tailwind CSS",
    ],
    links: {
      github: "YOUR_GITHUB_REPOSITORY_URL",
      live: "YOUR_LIVE_PROJECT_URL",
    },
    date: "2026",
  },
  {
    id: 3,
    title: "Wanderlust World",
    description:
      "A travel and tourism website designed to inspire people to explore the world and discover unforgettable experiences. The platform presents travel destinations, photos, registration, and information about the company, while highlighting personalized travel planning, global experiences, expert support, and sustainable tourism.",
    image: WanderlustWorld,
    tags: ["HTML", "CSS", "JavaScript"],
    links: {
      github: "YOUR_GITHUB_REPOSITORY_URL",
      live: "YOUR_LIVE_PROJECT_URL",
    },
    date: "2024",
  },
];

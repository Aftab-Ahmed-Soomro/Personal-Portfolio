export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image: string;
  badge?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  role: string;
  company: string;
  feedback: string;
  rating: number;
  initials: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  status: string;
}

export interface ExperienceItem {
  role: string;
  duration: string;
  location: string;
  type: string;
}

export interface FocusArea {
  title: string;
  description: string;
  iconName: "layers" | "code" | "layout";
}

export const portfolioData = {
  personalInfo: {
    name: "Aftab Ahmed",
    logoText: "AA",
    title: "Software Engineer",
    titleSuffix: ".",
    roleSubtitle: "Full Stack Developer",
    shortBio:
      "Aftab Ahmed — Full Stack Developer with 2 years of experience building modern, scalable SaaS products and web applications using the MERN stack. Strong problem-solving approach with a solid understanding of product architecture and end-to-end user flows.",
    aboutHeading: "ABOUT",
    aboutHeadingHighlight: "ME.",
    aboutParagraphs: [
      "Hi! I am <span class='text-teal-500 font-bold'>Aftab Ahmed</span>, a Full Stack Developer and Software Engineering student at <span class='text-teal-500 font-bold'>UBIT, University of Karachi.</span>",
      "I love building robust, scalable web applications from end to end. From designing intuitive user interfaces to architecting high-performance backends and APIs, I focus on delivering seamless, reliable digital products.",
      "I enjoy solving problems through code and turning creative ideas into real digital experiences that are easy for everyone to use.",
    ],
    location: "Karachi, Pakistan",
    timezone: "Asia/Karachi",
    availability: "Available for Work",
    email: "aftab.ahmedsoomrokhan@gmail.com",
    githubUrl: "https://github.com/Aftab-Ahmed-Soomro",
    linkedinUrl: "https://www.linkedin.com/in/aftab-ahmed-12b9aa265",
    resumeUrl: "/resume",
    resumePdfUrl: "/Aftab Ahmed - Full Stack Developer.pdf",
    avatarImage: "/profilePic.jpeg",
    qrCodeImage: "/aftab-qr.png",
    siteUrl: "https://aftab-ahmed-soomro.vercel.app/",
    formSubmitEndpoint: "https://formsubmit.co/ajax/4fdfbd6b5f36c18ca4b9e6d13968e676",
  },

  education: {
    degree: "BSSE @UBIT, University of Karachi",
    period: "2024 — 2027",
    status: "7th Semester • 2024 — 2027",
  } as EducationItem,

  experience: {
    role: "Full Stack Developer",
    duration: "2 Year",
    location: "Karachi, Pakistan",
    type: "2 Year • Karachi, Pakistan",
  } as ExperienceItem,

  navLinks: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#expertise" },
    { label: "Projects", href: "#projects" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ],

  marqueeSkills: [
    "HTML5",
    "CSS3",
    "TailwindCSS",
    "JavaScript",
    "TypeScript",
    "Python",
    "Django",
    "React Js",
    "Nextjs",
    "Nodejs",
    "Expressjs",
    "FastApi",
    "Mongodb",
    "MySql",
    "PostgreSql",
    "Supabase",
    "Firebase",
    "Github",
    "Domain & Hosting",
    "CI/CD pipelines",
    "Docker",
    "Redis",
  ],

  focusAreas: [
    {
      title: "MERN Stack Dev",
      description: "MongoDB, Express, React, and Node.js backend systems.",
      iconName: "layers",
    },
    {
      title: "Programming",
      description: "Advanced problem solving and DSA in Java logic.",
      iconName: "code",
    },
    {
      title: "UI/UX Design",
      description: "User-centric interfaces and responsive modern structures.",
      iconName: "layout",
    },
  ] as FocusArea[],

  projects: [
    {
      id: "easyspeak",
      title: "Easy Speak Stories",
      description:
        "Developed AI-powered SaaS applications integrating OpenAI API and ElevenLabs for story generation, content enhancement, and voice cloning.",
      image: "/assets/projects/easyspeak.png",
      liveUrl: "https://easyspeakstories.com/",
    },
    {
      id: "propiq",
      title: "PropIQ",
      description:
        "Worked on a Real Estate SaaS platform with scalable APIs, property data processing, subscriptions, skip tracing, and lead generation features for U.S. markets.",
      image: "/assets/projects/propiq.png",
      liveUrl: "https://data.trypropiq.ai/",
    },
    {
      id: "cirvia",
      title: "Cirvia Tech",
      description:
        "Developed a 20+ page responsive e-commerce frontend with React, TypeScript & Tailwind CSS, including auth, cart, checkout, and APIs.",
      image: "/assets/projects/cirvia.png",
      badge: "Client",
      liveUrl: "https://cirvia-tech-o1vm-ten.vercel.app/",
      githubUrl: "https://github.com/Aftab-Ahmed-Soomro/cirvia-tech.git",
    },
    {
      id: "uss",
      title: "United Strategic Solutions",
      description:
        "Developed a modern responsive website for a digital marketing brand, showcasing its services, global presence, client work, and growth-focused solutions.",
      image: "/assets/projects/uss.png",
      badge: "Client",
      liveUrl: "https://unitedstrategicsolutions.com/",
    },
    {
      id: "dig",
      title: "Disturbed Innovations",
      description:
        "Built a responsive corporate website with Next.js & Framer Motion, featuring smooth animations and optimized performance. Delivered in 2 days.",
      image: "/assets/projects/dig.png",
      badge: "Client",
      liveUrl: "https://www.disturbedinnovationsgroup.com/",
    },
    {
      id: "mern-cart",
      title: "Aftab Ahmed Cart",
      description:
        "Built a full-stack e-commerce app with MERN during my learning phase, featuring authentication, products, cart, REST APIs, and responsive UI.",
      image: "/assets/projects/mern.png",
      liveUrl: "https://ecommerce-frontend-sigma-olive.vercel.app/",
      githubUrl: "https://github.com/Aftab-Ahmed-Soomro/Ecommerce-App.git",
    },
    {
      id: "bookr",
      title: "Bookr",
      description: "Bookr is a modern library management system built with React.js.",
      image: "/assets/projects/bookr.png",
      liveUrl: "https://bookr-app-sj3t.vercel.app/",
      githubUrl: "https://github.com/Aftab-Ahmed-Soomro/bookr-app.git",
    },
  ] as ProjectItem[],

  reviews: [
    {
      id: "rev-1",
      name: "Emmanuel Cole Williams",
      role: "CEO",
      company: "United Strategic Solutions",
      feedback:
        "Aftab built the United Strategic Solutions and Disturbed Innovations Group platform for us. The interface is exceptionally clean, and fully responsive.",
      rating: 5,
      initials: "ECW",
    },
    {
      id: "rev-2",
      name: "Zain Ur Rehman",
      role: "CEO",
      company: "Web Exaltia",
      feedback:
        "His front-end design sense is incredible. He designed our Bookr App layout with perfect structures and excellent code quality.",
      rating: 5,
      initials: "ZS",
    },
    {
      id: "rev-3",
      name: "Raza Haider",
      role: "CEO",
      company: "Higlax Solutions",
      feedback:
        "A dedicated sole developer who built and delivered our real estate platform, PropIQ, from scratch. Reliable, technically sound, and fully committed to building high-quality, scalable products.",
      rating: 5,
      initials: "RH",
    },
    {
      id: "rev-4",
      name: "Ahmed Raza Shaikh",
      role: "Team Lead",
      company: "MUF Digital",
      feedback:
        "Delivered a comprehensive 20+ page e-commerce platform with exceptional speed and precision. A sharp, smart-working developer who gets things done efficiently.",
      rating: 5,
      initials: "ARS",
    },
  ] as ReviewItem[],
};

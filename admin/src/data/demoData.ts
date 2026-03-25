// Sample data for admin demo/preview mode

export const demoProjects = [
  {
    _id: "demo-1",
    title: "Active Harmony",
    description: "An e-commerce platform to browse and shop sports and yoga products with a clean and modern UI.",
    technologies: ["Next.js", "TailwindCSS", "MongoDB", "Node.js", "Clerk"],
    category: "Web",
    status: "In Progress" as const,
    github: "https://github.com/jeevan7674",
    demo: "#",
    createdAt: "2025-09-01T00:00:00Z",
  },
  {
    _id: "demo-2",
    title: "Jeesum Forms",
    description: "A dynamic form builder allowing users to create, share, and manage forms efficiently.",
    technologies: ["React", "TailwindCSS", "Node.js", "MongoDB", "Express"],
    category: "Web",
    status: "In Progress" as const,
    github: "https://github.com/jeevan7674",
    demo: "#",
    createdAt: "2025-08-01T00:00:00Z",
  },
  {
    _id: "demo-3",
    title: "Art of Living Website",
    description: "A responsive website built with HTML, CSS, and JavaScript dedicated to the Art of Living organization.",
    technologies: ["HTML", "CSS", "JavaScript"],
    category: "Web",
    status: "Completed" as const,
    github: "https://github.com/jeevan7674",
    demo: "#",
    createdAt: "2025-05-01T00:00:00Z",
  },
];

export const demoSkills = [
  { _id: "ds-1", name: "React", color: "hsl(200,80%,60%)", group: "Frontend" },
  { _id: "ds-2", name: "TypeScript", color: "hsl(210,70%,55%)", group: "Frontend" },
  { _id: "ds-3", name: "TailwindCSS", color: "hsl(190,80%,55%)", group: "Frontend" },
  { _id: "ds-4", name: "Next.js", color: "hsl(0,0%,70%)", group: "Frontend" },
  { _id: "ds-5", name: "Node.js", color: "hsl(120,40%,55%)", group: "Backend & Database" },
  { _id: "ds-6", name: "Express", color: "hsl(0,0%,60%)", group: "Backend & Database" },
  { _id: "ds-7", name: "MongoDB", color: "hsl(130,50%,45%)", group: "Backend & Database" },
  { _id: "ds-8", name: "Git", color: "hsl(10,70%,55%)", group: "Tools & Other" },
  { _id: "ds-9", name: "Figma", color: "hsl(280,60%,60%)", group: "Tools & Other" },
];

export const demoMessages = [
  {
    _id: "dm-1",
    name: "Alice Johnson",
    email: "alice@example.com",
    message: "Hi! I love your portfolio. Would you be open to freelance work on a React project?",
    date: "2025-09-15T10:30:00Z",
    status: "unread" as const,
  },
  {
    _id: "dm-2",
    name: "Bob Smith",
    email: "bob@example.com",
    message: "Great work on the Active Harmony project. Let's connect!",
    date: "2025-09-10T14:20:00Z",
    status: "read" as const,
  },
  {
    _id: "dm-3",
    name: "Carol Davis",
    email: "carol@example.com",
    message: "I'm interested in collaborating on an open-source project. Are you available?",
    date: "2025-09-08T09:00:00Z",
    status: "unread" as const,
  },
];

export const demoAnalytics = {
  totalVisits: 1247,
  pageViews: [
    { page: "/", count: 580 },
    { page: "/projects", count: 320 },
    { page: "/skills", count: 195 },
    { page: "/contact", count: 152 },
  ],
  deviceBreakdown: { desktop: 742, mobile: 410, tablet: 95 },
  recentVisits: [
    { page: "/", timestamp: "2025-09-16T08:12:00Z", deviceType: "desktop" },
    { page: "/projects", timestamp: "2025-09-16T07:45:00Z", deviceType: "mobile" },
    { page: "/contact", timestamp: "2025-09-16T06:30:00Z", deviceType: "desktop" },
    { page: "/skills", timestamp: "2025-09-15T22:10:00Z", deviceType: "tablet" },
    { page: "/", timestamp: "2025-09-15T20:05:00Z", deviceType: "mobile" },
  ],
};

export const demoResume = {
  url: "#",
  uploadedAt: "2025-08-20T00:00:00Z",
};

export const demoExperiences = [
  {
    _id: "de-1",
    title: "Product Development Engineer Intern",
    company: "GenZgalaxy",
    location: "Remote",
    period: "2025 - Present",
    type: "Full-time Internship",
    description: [
      "Working as a full-stack developer using the MERN stack",
      "Building and optimizing scalable product features",
      "Collaborating with cross-functional teams on product development",
    ],
    technologies: ["MongoDB", "Express.js", "React", "Node.js", "Git"],
  },
  {
    _id: "de-2",
    title: "Data Science & Tableau Intern",
    company: "1M1B (Powered by Salesforce & AICTE)",
    location: "Remote",
    period: "April 2025 - June 2025",
    type: "Internship",
    description: [
      "Gained hands-on experience with Tableau for data visualization",
      "Worked on projects aligned with sustainable development goals",
    ],
    technologies: ["Tableau", "Python", "Pandas", "Data Visualization"],
  },
  {
    _id: "de-3",
    title: "Web Development Intern",
    company: "Vault of Codes",
    location: "Remote",
    period: "Jan 2025 - Mar 2025",
    type: "Internship",
    description: [
      "Developed responsive websites using HTML, CSS, and JavaScript",
      "Built interactive UI components and enhanced user experience",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap", "Git"],
  },
];

export const demoAchievements = [
  {
    _id: "da-1",
    title: "Smart India Hackathon Finalist",
    description: "Selected as a finalist in SIH 2024, competing with top engineering teams across India.",
    date: "December 2024",
    icon: "trophy",
  },
  {
    _id: "da-2",
    title: "Dean's List - Academic Excellence",
    description: "Achieved a CGPA of 8.71, recognized on the Dean's List for outstanding academic performance.",
    date: "2024",
    icon: "star",
  },
  {
    _id: "da-3",
    title: "Open Source Contributor",
    description: "Contributed to multiple open-source projects on GitHub with 50+ contributions.",
    date: "2024 - Present",
    icon: "award",
  },
];

export const demoCertifications = [
  {
    _id: "dc-1",
    title: "Data Science & Tableau",
    issuer: "1M1B (Salesforce & AICTE)",
    date: "June 2025",
    credentialUrl: "#",
  },
  {
    _id: "dc-2",
    title: "Full Stack Web Development",
    issuer: "Udemy",
    date: "March 2025",
    credentialUrl: "#",
  },
  {
    _id: "dc-3",
    title: "React - The Complete Guide",
    issuer: "Coursera",
    date: "January 2025",
    credentialUrl: "#",
  },
];

export const demoContactInfo = {
  name: "R.Jeevan Reddy",
  email: "r.jeevanreddys680@gmail.com",
  phone: "+91 9876543210",
  location: "Bhimavaram, AP",
  github: "https://github.com/jeevan7674",
  linkedin: "https://linkedin.com/in/jeevanreddy",
  website: "#",
  availability: "Open to opportunities",
};

export const demoAbout = {
  headline: "Full-Stack Developer & Designer",
  initials: "JR",
  bio: [
    "Hi, I'm R.Jeevan Reddy — a third-year software engineering student at S.R.K.R Engineering College, currently living in Bhimavaram. I love building fast, intuitive, and user-centered web and mobile applications.",
    "I specialize in frontend development using React and Next.js. I'm passionate about beautiful design, seamless user experience, and performance optimization.",
    "I enjoy collaborating with creative teams to build meaningful digital products and I'm always eager to learn and grow.",
  ],
};

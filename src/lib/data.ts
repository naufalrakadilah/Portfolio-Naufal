import type {
  Certificate,
  Job,
  Profile,
  Project,
  RollPhoto,
  Tool,
} from "./types";

// Untuk sekarang semua konten ada di file ini.
// Nanti getPortfolio() diganti membaca dari Supabase, komponennya tidak perlu diubah.

const profile: Profile = {
  name: "Naufal Rakadilah",
  statement:
    "I'm Naufal, an Information Systems student at Telkom University. I design interfaces that feel intuitive, edit videos that keep people watching, and read data to find what is worth fixing.",
  statementHighlights: ["Naufal,", "intuitive,", "fixing."],
  email: "naufalrakadilah21@gmail.com",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/naufalrakadilah" },
    { label: "Instagram @nopalsatulagi", href: "https://instagram.com/nopalsatulagi" },
  ],
};

const rollPhotos: RollPhoto[] = [
  { src: "/img/x-ahm-3.jpg", org: "ahm", position: "50% 62%" },
  { src: "/img/x-humic-1.jpg", org: "humic", position: "50% 55%" },
  { src: "/img/x-logistic-2.jpg", org: "smartvest", position: "50% 50%" },
  { src: "/img/x-ahm-2.jpg", org: "ahm", position: "50% 45%" },
  { src: "/img/x-humic-4.jpg", org: "humic", position: "50% 55%" },
  { src: "/img/x-logistic-3.jpg", org: "smartvest", position: "50% 40%" },
  { src: "/img/x-ahm-1.jpg", org: "ahm", position: "50% 50%" },
  { src: "/img/x-humic-2.jpg", org: "humic", position: "50% 50%" },
  { src: "/img/x-humic-3.jpg", org: "humic", position: "50% 50%" },
];

const projects: Project[] = [
  {
    title: "Lumira AI",
    type: "Health · Web",
    image: "/img/p-breastcancer.jpg",
    description: "Breast cancer analysis website that explains AI-assisted early detection.",
    tags: ["Figma", "Landing page"],
    link: "https://www.figma.com/proto/nyUy3x8ovscG5gPz2eIAoL/Lumira-AI-Medhical-Developer?t=ztYS7xxbzg83XPiO-1&node-id=1-2",
  },
  {
    title: "GoTani",
    type: "Marketplace · Mobile",
    image: "/img/p-gotani.jpg",
    description: "App where farmers buy goods and farming tools.",
    tags: ["Figma", "Mobile app"],
    link: "https://www.figma.com/proto/s29ay17JeY5r4qB1r9QYsw/GoTani-APP?node-id=55-77&t=swFcbuKhAyE7eaG4-1&starting-point-node-id=55%3A77",
  },
  {
    title: "DiamondCount",
    type: "Automotive · Web",
    image: "/img/p-diamondcount.jpg",
    description: "Website for buying and selling new and used cars.",
    tags: ["Figma", "Web UI"],
    link: "https://www.figma.com/proto/Fg58Euym0iHIXRsRNYf16N/projek-figma-hci?node-id=36-11&t=eeX5NXEIjnOUPZva-1&starting-point-node-id=36%3A11",
  },
  {
    title: "GoodStore",
    type: "E-commerce · Mobile",
    image: "/img/p-goodstore.jpg",
    description: "App for buying goods from official stores.",
    tags: ["Figma", "Mobile app"],
    link: "https://www.figma.com/proto/K43ubJ9xtdHedx9LoWCN5b/Goodstore?t=ztYS7xxbzg83XPiO-1&node-id=1303-72&starting-point-node-id=1303%3A72",
  },
  {
    title: "HRDasyat",
    type: "Internal tool · Web",
    image: "/img/p-hrdasyat.jpg",
    description: "HR platform for managing employees in the office.",
    tags: ["Figma", "Dashboard"],
    link: "https://www.figma.com/proto/nOVBMVg7l00wbGq0YP7Rg1/HRDasyat?node-id=6-252&starting-point-node-id=6%3A252",
  },
];

// Dashboard Power BI dari magang Data Analyst di AHM. Nama & NRP karyawan di d-innovation sudah di-blur.
const dataProjects: Project[] = [
  {
    title: "Spoilage",
    type: "Power BI · Plant Sunter",
    image: "/img/d-spoilage.jpg",
    description: "Monthly spoilage cost per unit tracked against target, with an auto-written summary.",
    tags: ["Cost monitoring"],
  },
  {
    title: "Cost Performance",
    type: "Power BI · Manufacturing",
    image: "/img/d-cost.jpg",
    description: "Plan versus actual manufacturing cost by month, material and department.",
    tags: ["Variance analysis"],
  },
  {
    title: "CR Monitoring",
    type: "Power BI · Plant Sunter",
    image: "/img/d-cr.jpg",
    description: "Cost reduction progress for every department, from plan to achieved savings.",
    tags: ["Cost reduction"],
  },
  {
    title: "Innovation",
    type: "Power BI · EPP Plant Sunter",
    image: "/img/d-innovation.jpg",
    description: "Employee idea participation per month and department, measured against targets.",
    tags: ["Participation"],
  },
];

const jobs: Job[] = [
  {
    role: "Data Analyst, Internship",
    org: "PT Astra Honda Motor · Plant Sunter Division",
    date: "Jun – Sep 2026",
    description: "Three-month internship analysing data for the Plant Sunter division.",
    tone: "#c8102e",
    photos: [
      { src: "/img/x-ahm-3.jpg", ratio: 4 / 3 },
      { src: "/img/x-ahm-1.jpg", ratio: 3 / 2 },
      { src: "/img/x-ahm-2.jpg", ratio: 3 / 2 },
    ],
  },
  {
    role: "UI/UX Designer, Internship",
    org: "CoE Humic Engineering, Telkom University",
    date: "Sep – Nov 2025",
    description: "Two-month internship designing interfaces with the research team.",
    tone: "#c27c0e",
    photos: [
      { src: "/img/x-humic-2.jpg", ratio: 16 / 9 },
      { src: "/img/x-humic-3.jpg", ratio: 16 / 9 },
      { src: "/img/x-humic-1.jpg", ratio: 4 / 3 },
      { src: "/img/x-humic-4.jpg", ratio: 4 / 3 },
    ],
  },
  {
    role: "Staff, Logistics Division",
    org: "SMARTVEST 2025 · GIBEI Telkom University",
    date: "Oct 2025",
    description: "Committee for a national equity paper competition, trading competition and talkshow.",
    tone: "#0f766e",
    photos: [
      { src: "/img/x-logistic-3.jpg", ratio: 16 / 9 },
      { src: "/img/x-logistic-1.jpg", ratio: 3 / 4 },
      { src: "/img/x-logistic-2.jpg", ratio: 16 / 9 },
    ],
  },
];

const certificates: Certificate[] = [
  { image: "/img/c-softskill-leadership.jpg", title: "Soft Skills III: Leadership", org: "Telkom University", date: "Oct 2026" },
  { image: "/img/c-softskill-technopreneurship.jpg", title: "Soft Skills II: Technopreneurship", org: "Telkom University", date: "Oct 2026" },
  { image: "/img/c-softskill-relationship.jpg", title: "Soft Skills II: Relationship Management", org: "Telkom University", date: "Oct 2026" },
  { image: "/img/c-softskill-self-management.jpg", title: "Soft Skills I: Self Management", org: "Telkom University", date: "Oct 2026" },
  { image: "/img/c-ahm.jpg", title: "Internship, Plant Sunter Division", org: "PT Astra Honda Motor", date: "Sep 2026" },
  { image: "/img/c-humic.jpg", title: "Internship completion", org: "CoE Humic Engineering", date: "Nov 2025" },
  { image: "/img/c-gibei-logistic.jpg", title: "Staff, Logistics Division", org: "SMARTVEST 2025 · GIBEI", date: "Oct 2025" },
  { image: "/img/c-gibei-talkshow.jpg", title: "Talkshow participant: Moneyverse", org: "SMARTVEST 2025 · GIBEI", date: "Oct 2025" },
  { image: "/img/c-gibei-participant.jpg", title: "Talkshow participant", org: "SMARTVEST 2025 · GIBEI", date: "Oct 2025" },
  { image: "/img/c-html.jpg", title: "Introduction to HTML", org: "Sololearn", date: "Sep 2025" },
  { image: "/img/c-python.jpg", title: "Introduction to Python", org: "Sololearn", date: "Feb 2025" },
  { image: "/img/c-esd.jpg", title: "UI/UX Design competence", org: "ESD Study Group", date: "Sep 2024" },
  { image: "/img/c-sari.jpg", title: "Industrial internship, Digital Marketing", org: "PT Sari Teknologi", date: "Aug 2022" },
];

const tools: Tool[] = [
  { category: "UI/UX", name: "Figma", note: "Wireframes, prototypes, user research" },
  { category: "Web", name: "HTML & CSS", note: "Responsive layout, basic JavaScript" },
  { category: "SEO", name: "Search Console", note: "Keyword research, SEO writing" },
  { category: "CMS", name: "WordPress", note: "Plus Blogger, publishing & formatting" },
  { category: "Video", name: "CapCut", note: "Short-form editing" },
  { category: "Video · learning", name: "Premiere Pro", note: "Also DaVinci Resolve" },
  { category: "Visual", name: "Canva", note: "Visual branding" },
  { category: "Visual", name: "Photoshop", note: "Basic editing" },
];

export async function getPortfolio() {
  return { profile, rollPhotos, projects, dataProjects, jobs, certificates, tools };
}

export type Portfolio = Awaited<ReturnType<typeof getPortfolio>>;

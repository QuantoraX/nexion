import { BrainCircuit, ShieldCheck, Globe, Award } from "lucide-react";
import umeshImg from "../assets/umesh.jpeg";
import sihumImg from "../assets/sihum.png";
import melanImg from "../assets/melan.jpeg";
import keshanImg from "../assets/keshan.jpeg";

/* ─── Types ──────────────────────────────────────────────────────── */
export interface TeamMember {
    name: string;
    role: string;
    bio: string;
    image: string;
    socials: { linkedin: string; twitter: string; github: string };
}

export interface ValueItem {
    icon: React.ReactNode;
    title: string;
    desc: string;
}

export interface Milestone {
    year: string;
    event: string;
}

/* ─── Team Members ───────────────────────────────────────────────── */
export const teamMembers: TeamMember[] = [
    {
        name: "Umesh",
        role: "Founder / CEO",
        bio: "Visionary leader driving engineering excellence, global strategy, and client success at Nexion Solutions.",
        image: umeshImg,
        socials: {
            linkedin: "https://linkedin.com",
            twitter: "https://twitter.com",
            github: "https://github.com",
        },
    },
    {
        name: "Sithum",
        role: "Full Stack Developer",
        bio: "Expert full stack engineer specializing in cloud-native Node.js, React, microservices, and database architectures.",
        image: sihumImg,
        socials: {
            linkedin: "https://linkedin.com",
            twitter: "https://twitter.com",
            github: "https://github.com",
        },
    },
    {
        name: "Melan",
        role: "Frontend Developer",
        bio: "Creative frontend specialist crafting modern, responsive, pixel-perfect user interfaces and interactive web apps.",
        image: melanImg,
        socials: {
            linkedin: "https://linkedin.com",
            twitter: "https://twitter.com",
            github: "https://github.com",
        },
    },
    {
        name: "Keshan",
        role: "QA Engineer",
        bio: "Quality assurance specialist ensuring zero-defect software releases, automated testing pipelines, and reliability.",
        image: keshanImg,
        socials: {
            linkedin: "https://linkedin.com",
            twitter: "https://twitter.com",
            github: "https://github.com",
        },
    },
];

/* ─── Core Values ────────────────────────────────────────────────── */
export const values: ValueItem[] = [
    {
        icon: <BrainCircuit className="size-5 text-zinc-600" />,
        title: "Innovation First",
        desc: "We constantly push the boundaries of what technology can do for your business.",
    },
    {
        icon: <ShieldCheck className="size-5 text-zinc-600" />,
        title: "Built to Last",
        desc: "Every system we deliver is architected for security, scalability, and long-term performance.",
    },
    {
        icon: <Globe className="size-5 text-zinc-600" />,
        title: "Global Mindset",
        desc: "We partner with clients across continents, bringing diverse perspectives to every challenge.",
    },
    {
        icon: <Award className="size-5 text-zinc-600" />,
        title: "Excellence Always",
        desc: "From code quality to client communication, we hold ourselves to the highest professional standards.",
    },
];

/* ─── Milestones / Timeline ──────────────────────────────────────── */
export const milestones: Milestone[] = [
    { year: "2016", event: "Nexion Solutions founded with 3 engineers and a vision to democratise great software." },
    { year: "2018", event: "Delivered our first enterprise SaaS platform for a regional financial institution." },
    { year: "2020", event: "Expanded to 40+ team members and launched our cloud consulting practice." },
    { year: "2022", event: "Crossed 100 global clients and launched AI-powered product services." },
    { year: "2024", event: "Named a Top 10 Tech Firm by the Southeast Asia Tech Review." },
    { year: "2026", event: "200+ projects delivered across 8 countries — and still growing." },
];

/* ─── Capabilities / Services ────────────────────────────────────── */
export const capabilities: string[] = [
    "Custom Web & Mobile Applications",
    "Cloud Architecture & Migration",
    "AI / ML Integration",
    "API Design & Development",
    "UI/UX Design Systems",
    "DevOps & CI/CD Pipelines",
    "Tech Consulting & Audits",
    "24/7 Managed Support",
];

/* ─── Stats ──────────────────────────────────────────────────────── */
export const aboutStats = [
    { value: "200+", label: "PROJECTS DELIVERED" },
    { value: "98%",  label: "CLIENT SATISFACTION" },
    { value: "8+",   label: "YEARS OF EXPERIENCE" },
    { value: "40+",  label: "TEAM MEMBERS" },
];

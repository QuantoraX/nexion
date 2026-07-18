import {
    Code2, BrainCircuit, Layers, ShieldCheck,
    Users, Target, Globe, Award,
} from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────── */
export interface TeamMember {
    name: string;
    role: string;
    bio: string;
    icon: React.ReactNode;
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
        name: "Alex Carter",
        role: "CEO & Co-Founder",
        bio: "12+ years scaling global SaaS and enterprise platforms across Southeast Asia and Europe.",
        icon: <Users className="size-5 text-zinc-600" />,
        socials: {
            linkedin: "https://linkedin.com",
            twitter: "https://twitter.com",
            github: "https://github.com",
        },
    },
    {
        name: "Priya Nair",
        role: "CTO & Lead Architect",
        bio: "Cloud-native systems expert with deep expertise in microservices, AI/ML pipelines, and DevOps.",
        icon: <Code2 className="size-5 text-zinc-600" />,
        socials: {
            linkedin: "https://linkedin.com",
            twitter: "https://twitter.com",
            github: "https://github.com",
        },
    },
    {
        name: "Marcus Webb",
        role: "Head of Product",
        bio: "Product strategist who transforms complex workflows into intuitive, outcome-driven software.",
        icon: <Layers className="size-5 text-zinc-600" />,
        socials: {
            linkedin: "https://linkedin.com",
            twitter: "https://twitter.com",
            github: "https://github.com",
        },
    },
    {
        name: "Sasha Ivanova",
        role: "Lead UI/UX Designer",
        bio: "Pixel-perfect designer crafting high-converting interfaces that users genuinely enjoy using.",
        icon: <Target className="size-5 text-zinc-600" />,
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

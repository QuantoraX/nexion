import React from "react";
import {
    Code2, Globe, Smartphone, Palette,
    Search, LayoutDashboard, Rocket, HeadphonesIcon,
    CheckCircle, Clock, Users, Shield,
} from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────── */
export interface Service {
    icon: React.ReactNode;
    title: string;
    desc: string;
    bullets: string[];
}

export interface ProcessStep {
    step: string;
    icon: React.ReactNode;
    title: string;
    desc: string;
}

export interface Benefit {
    icon: React.ReactNode;
    title: string;
    desc: string;
}

export interface TechCategory {
    label: string;
    techs: string[];
}

/* ─── Core Services ──────────────────────────────────────────────── */
export const services: Service[] = [
    {
        icon: <Code2 className="size-6 text-zinc-700" />,
        title: "Custom Software Development",
        desc: "Tailor-made web and desktop applications engineered to your exact workflow and business logic.",
        bullets: ["SaaS Platforms", "Enterprise Systems", "API Integrations", "Legacy Modernisation"],
    },
    {
        icon: <Globe className="size-6 text-zinc-700" />,
        title: "Web & E-commerce Development",
        desc: "High-performance, SEO-ready websites and online stores built to convert visitors into customers.",
        bullets: ["Corporate Websites", "E-commerce Storefronts", "CMS Solutions", "Progressive Web Apps"],
    },
    {
        icon: <Smartphone className="size-6 text-zinc-700" />,
        title: "Mobile App Development",
        desc: "Cross-platform and native mobile applications for iOS and Android that users genuinely love.",
        bullets: ["iOS & Android Apps", "React Native / Flutter", "App Store Submission", "Push Notifications"],
    },
    {
        icon: <Palette className="size-6 text-zinc-700" />,
        title: "UI/UX Design & Prototyping",
        desc: "Research-backed, pixel-perfect designs that are beautiful, intuitive, and conversion-optimised.",
        bullets: ["User Research", "Wireframing", "Figma Prototypes", "Design Systems"],
    },
];

/* ─── Technology Stack ───────────────────────────────────────────── */
export const techStack: TechCategory[] = [
    {
        label: "Frontend",
        techs: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vue.js"],
    },
    {
        label: "Backend",
        techs: ["Node.js", "Python", "Express", "FastAPI", "PostgreSQL", "MongoDB"],
    },
    {
        label: "Mobile",
        techs: ["React Native", "Flutter", "Swift", "Kotlin", "Expo", "Firebase"],
    },
    {
        label: "Cloud & DevOps",
        techs: ["AWS", "Google Cloud", "Docker", "Kubernetes", "CI/CD", "Terraform"],
    },
];

/* ─── Development Process ────────────────────────────────────────── */
export const processSteps: ProcessStep[] = [
    {
        step: "01",
        icon: <Search className="size-5 text-zinc-700" />,
        title: "Discovery & Analysis",
        desc: "We deep-dive into your goals, users, and technical requirements to define a bulletproof scope.",
    },
    {
        step: "02",
        icon: <LayoutDashboard className="size-5 text-zinc-700" />,
        title: "UI/UX Design",
        desc: "We craft wireframes, prototypes and a final design system before a single line of code is written.",
    },
    {
        step: "03",
        icon: <Code2 className="size-5 text-zinc-700" />,
        title: "Development",
        desc: "Our engineers build your product in agile sprints with daily updates and a shared project board.",
    },
    {
        step: "04",
        icon: <Shield className="size-5 text-zinc-700" />,
        title: "QA & Testing",
        desc: "Rigorous automated and manual testing across devices, browsers, and edge cases before launch.",
    },
    {
        step: "05",
        icon: <Rocket className="size-5 text-zinc-700" />,
        title: "Deployment & Support",
        desc: "We handle cloud deployment, monitoring, and provide ongoing support long after go-live.",
    },
];

/* ─── Why Choose Us ──────────────────────────────────────────────── */
export const benefits: Benefit[] = [
    {
        icon: <CheckCircle className="size-5 text-zinc-700" />,
        title: "Agile & Transparent Process",
        desc: "Weekly sprint demos, shared Kanban boards, and clear communication at every stage — no surprises.",
    },
    {
        icon: <Users className="size-5 text-zinc-700" />,
        title: "Experienced Engineering Team",
        desc: "Senior developers with 5–12 years of experience across SaaS, fintech, e-commerce, and enterprise.",
    },
    {
        icon: <Clock className="size-5 text-zinc-700" />,
        title: "On-Time, On-Budget Delivery",
        desc: "We scope, plan, and execute with precision. Your deadline is our commitment, not a suggestion.",
    },
    {
        icon: <HeadphonesIcon className="size-5 text-zinc-700" />,
        title: "Post-Launch Support",
        desc: "Your project doesn't end at go-live. We offer ongoing maintenance, monitoring, and feature additions.",
    },
];

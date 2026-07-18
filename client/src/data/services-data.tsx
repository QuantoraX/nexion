import React from "react";
import {
    Code2, Globe, Smartphone, Palette,
    Search, LayoutDashboard, Rocket, HeadphonesIcon,
    CheckCircle, Clock, Users, Shield,
} from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────── */
export interface Service {
    slug: string;
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

export interface TechItem {
    name: string;
    icon: string; // devicons CDN URL
}

export interface TechCategory {
    label: string;
    techs: TechItem[];
}

export interface FAQ {
    q: string;
    a: string;
}

export interface Testimonial {
    quote: string;
    name: string;
    role: string;
    company: string;
    initial: string;
}

/* ─── Core Services ──────────────────────────────────────────────── */
export const services: Service[] = [
    {
        slug: "custom-software",
        icon: <Code2 className="size-6 text-zinc-700" />,
        title: "Custom Software Development",
        desc: "Tailor-made web and desktop applications engineered to your exact workflow and business logic.",
        bullets: ["SaaS Platforms", "Enterprise Systems", "API Integrations", "Legacy Modernisation"],
    },
    {
        slug: "web-ecommerce",
        icon: <Globe className="size-6 text-zinc-700" />,
        title: "Web & E-commerce Development",
        desc: "High-performance, SEO-ready websites and online stores built to convert visitors into customers.",
        bullets: ["Corporate Websites", "E-commerce Storefronts", "CMS Solutions", "Progressive Web Apps"],
    },
    {
        slug: "mobile-app",
        icon: <Smartphone className="size-6 text-zinc-700" />,
        title: "Mobile App Development",
        desc: "Cross-platform and native mobile applications for iOS and Android that users genuinely love.",
        bullets: ["iOS & Android Apps", "React Native / Flutter", "App Store Submission", "Push Notifications"],
    },
    {
        slug: "ui-ux-design",
        icon: <Palette className="size-6 text-zinc-700" />,
        title: "UI/UX Design & Prototyping",
        desc: "Research-backed, pixel-perfect designs that are beautiful, intuitive, and conversion-optimised.",
        bullets: ["User Research", "Wireframing", "Figma Prototypes", "Design Systems"],
    },
];

/* ─── Technology Stack (with Devicon CDN logos) ──────────────────── */
export const techStack: TechCategory[] = [
    {
        label: "Frontend",
        techs: [
            { name: "React",          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
            { name: "Next.js",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
            { name: "TypeScript",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
            { name: "Tailwind CSS",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
            { name: "Vue.js",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
        ],
    },
    {
        label: "Backend",
        techs: [
            { name: "Node.js",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
            { name: "Python",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
            { name: "FastAPI",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
            { name: "PostgreSQL",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
            { name: "MongoDB",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
        ],
    },
    {
        label: "Mobile",
        techs: [
            { name: "React Native",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
            { name: "Flutter",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
            { name: "Swift",          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" },
            { name: "Kotlin",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
            { name: "Firebase",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
        ],
    },
    {
        label: "Cloud & DevOps",
        techs: [
            { name: "AWS",            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
            { name: "Google Cloud",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
            { name: "Docker",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
            { name: "Kubernetes",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
            { name: "Terraform",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" },
        ],
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

/* ─── Testimonials ───────────────────────────────────────────────── */
export const testimonials: Testimonial[] = [
    {
        quote: "Nexion didn't just build our platform — they genuinely understood our business. The team communicated daily, hit every milestone, and the end product exceeded our expectations.",
        name: "James Whitfield",
        role: "CEO",
        company: "Veloris Fintech",
        initial: "J",
    },
    {
        quote: "We needed a complex mobile app in 10 weeks. Nexion delivered in 9. The quality, attention to detail and post-launch support have been absolutely world-class.",
        name: "Amara Perera",
        role: "Head of Product",
        company: "Helios Health",
        initial: "A",
    },
    {
        quote: "Their UI/UX team completely transformed our dashboard. User engagement went up 62% in the first month after launch. I wouldn't use anyone else.",
        name: "Lukas Brandt",
        role: "CTO",
        company: "DataNest GmbH",
        initial: "L",
    },
];

/* ─── FAQs ───────────────────────────────────────────────────────── */
export const faqs: FAQ[] = [
    {
        q: "How do you estimate project costs?",
        a: "We start with a free discovery call to understand your scope, goals, and constraints. From there we provide a detailed, fixed-price proposal or a time-and-materials quote — whichever suits your project best. There are no hidden fees.",
    },
    {
        q: "Do you offer post-launch support?",
        a: "Absolutely. Every project includes a 30-day bug-fix warranty at no charge. After that, we offer flexible monthly support and maintenance retainers to keep your product running smoothly.",
    },
    {
        q: "Can we sign an NDA before discussing our idea?",
        a: "Yes, always. We sign a mutual Non-Disclosure Agreement before any technical or business discussions. Your ideas, data, and intellectual property are completely protected.",
    },
    {
        q: "How long does a typical project take?",
        a: "A standard MVP usually takes 8–14 weeks. Full enterprise platforms range from 4–9 months. We provide a clear, week-by-week timeline at the start of every engagement.",
    },
    {
        q: "Do you work with clients outside Sri Lanka?",
        a: "Yes — we work with clients across the UK, US, EU, and Southeast Asia. All communication is in English and we adapt to your time zone for meetings and sprint reviews.",
    },
];

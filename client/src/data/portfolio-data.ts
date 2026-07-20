import galleryImage1 from "../assets/galleryImage1.png";
import galleryImage2 from "../assets/galleryImage2.png";
import galleryImage3 from "../assets/galleryImage3.png";
import galleryImage4 from "../assets/galleryImage4.png";

export interface ProjectDetail {
    title: string;
    desc: string;
}

export interface PortfolioProject {
    slug: string;
    title: string;
    category: string;
    subtitle: string;
    src: string;
    client: string;
    date: string;
    overview: string;
    challenge: string;
    solution: string;
    techStack: string[];
    details: ProjectDetail[];
}

export const portfolioCategories = ["All", "SaaS", "Mobile App", "E-Commerce", "AI / ML"];

const initialPortfolioProjects: PortfolioProject[] = [
    {
        slug: "analytics-dashboard",
        title: "Aegis Analytics Dashboard",
        category: "SaaS",
        subtitle: "SaaS · Web App",
        src: galleryImage1,
        client: "Aegis Global Ltd",
        date: "Sept 2025",
        overview: "A real-time data visualizer and operations platform monitoring millions of transactions daily with custom ML-driven anomaly detection.",
        challenge: "The client needed a platform to visualize high-velocity streaming transaction data with latency under 100ms, while remaining easy to use for non-technical operations staff.",
        solution: "We engineered a dashboard using React, TypeScript, and high-frequency WebSocket channels, backed by a Node.js API and a timescaled PostgreSQL cluster. Framer Motion and custom SVG grids keep the rendering performance lightning fast.",
        techStack: ["React", "TypeScript", "Node.js", "WebSockets", "PostgreSQL", "Tailwind CSS"],
        details: [
            { title: "Real-time Streaming", desc: "Configured sub-100ms real-time chart rendering utilizing high-frequency WebSocket channels." },
            { title: "Custom Alerts Engine", desc: "Designed an automated trigger engine that flags transaction anomalies within 2 seconds." },
            { title: "User-Friendly Design", desc: "Built a fully responsive layout using custom UI charts that works across desktop and tablet interfaces." }
        ]
    },
    {
        slug: "fintech-mobile-app",
        title: "Aura Mobile Wallet",
        category: "Mobile App",
        subtitle: "iOS · Android",
        src: galleryImage2,
        client: "Aura Pay Finance",
        date: "Nov 2025",
        overview: "A highly secure mobile banking and micro-lending app designed for users across emerging economies.",
        challenge: "Aura Pay wanted to launch a micro-payment wallet app supporting offline payments and multi-factor biometric authentication, compliant with strict regional financial standards.",
        solution: "We developed a cross-platform app using React Native, Expo, and Biometric API. All secure transactions are processed via a Spring Boot backend connected to AWS KMS.",
        techStack: ["React Native", "Expo", "TypeScript", "AWS KMS", "Biometric Authentication", "Spring Boot"],
        details: [
            { title: "Offline Wallet Ledger", desc: "Crafted a local encrypted ledger utilizing SQLite to store secure transaction tokens offline." },
            { title: "Biometric Authentication", desc: "Integrated native iOS FaceID and Android Face/Fingerprint unlock directly." },
            { title: "Compliance Ready", desc: "Underwent external audit verifying compliance with global payment security guidelines." }
        ]
    },
    {
        slug: "ecommerce-platform",
        title: "Moda Fashion Hub",
        category: "E-Commerce",
        subtitle: "Full-Stack · Web",
        src: galleryImage3,
        client: "Moda Retail Group",
        date: "Jan 2026",
        overview: "A next-generation headless fashion hub featuring localized shopping carts, dynamic search, and custom checkout.",
        challenge: "Converting standard E-commerce systems into a headless storefront that scales to millions of organic visits and keeps PageSpeed scores above 90.",
        solution: "Built a Next.js frontend with Tailwind CSS, utilizing a headless Shopify API backend, integrated with Algolia InstantSearch and Stripe Multi-currency checkout.",
        techStack: ["Next.js", "React", "GraphQL", "Algolia", "Stripe", "Tailwind CSS"],
        details: [
            { title: "Incremental Static Regeneration (ISR)", desc: "Pages are updated in the background within 60 seconds without rebuild downtime." },
            { title: "Localized Currencies", desc: "Automatic dynamic IP lookup mapping to regional payment gates and tax rates." },
            { title: "Smart Instant Search", desc: "Integrated Algolia search with AI auto-suggestions and facet filtering." }
        ]
    },
    {
        slug: "ai-powered-tool",
        title: "Cognitive Document Parser",
        category: "AI / ML",
        subtitle: "Machine Learning · API",
        src: galleryImage4,
        client: "Legis Docs Inc",
        date: "Mar 2026",
        overview: "An enterprise-grade document extraction tool capable of reading PDFs, scans, and hand-written legal contracts with over 99.4% accuracy.",
        challenge: "Parsing extremely long scans and handwritten legal documents with unstructured layouts while ensuring user privacy and data containment.",
        solution: "We integrated a customized Python OCR pipeline using PyTorch and FastAPI, deployed as isolated Kubernetes microservices to keep document data fully encrypted.",
        techStack: ["Python", "FastAPI", "PyTorch", "Docker", "Kubernetes", "AWS Enclaves"],
        details: [
            { title: "99.4% Extraction Accuracy", desc: "Trained specialized OCR models on hundreds of legal templates for high accuracy." },
            { title: "Privacy First", desc: "Hosted processing inside secure AWS Nitro Enclaves with no external public outbound traffic." },
            { title: "Fast API Engine", desc: "Asynchronous Python pipeline returning document parses in under 3.5 seconds." }
        ]
    }
];

export const getPortfolioProjects = (): PortfolioProject[] => {
    if (typeof window === "undefined") return initialPortfolioProjects;
    const data = localStorage.getItem("nexion_portfolio_projects");
    if (!data) {
        localStorage.setItem("nexion_portfolio_projects", JSON.stringify(initialPortfolioProjects));
        return initialPortfolioProjects;
    }
    try {
        return JSON.parse(data);
    } catch {
        return initialPortfolioProjects;
    }
};

export const savePortfolioProjects = (projects: PortfolioProject[]) => {
    if (typeof window === "undefined") return;
    localStorage.setItem("nexion_portfolio_projects", JSON.stringify(projects));
    portfolioProjects.length = 0;
    portfolioProjects.push(...projects);
};

export const portfolioProjects: PortfolioProject[] = [];
if (typeof window !== "undefined") {
    portfolioProjects.push(...getPortfolioProjects());
} else {
    portfolioProjects.push(...initialPortfolioProjects);
}


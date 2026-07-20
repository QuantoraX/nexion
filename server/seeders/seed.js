const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/../.env" });

const User = require("../models/User");
const Blog = require("../models/Blog");
const Portfolio = require("../models/Portfolio");
const Testimonial = require("../models/Testimonial");

const initialBlogs = [
    {
        slug: "scalable-saas-products-2026",
        category: "Startup",
        readTime: "6 min read",
        date: "July 12, 2026",
        title: "How to Build Scalable SaaS Products in 2026",
        excerpt: "Discover the architectural patterns, tech stack choices, and product strategies required to build software that scales to millions of users in 2026.",
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?fit=crop&w=800&q=80",
        content: [
            "Building a Software-as-a-Service (SaaS) product in 2026 is vastly different from a few years ago. With user expectations at an all-time high, your application must be fast, highly responsive, and scale seamlessly without skyrocketing your cloud infrastructure bills.",
            "Key Architectural Patterns:",
            "To achieve true scalability, moving towards a hybrid model of Serverless computing for dynamic tasks and persistent containerized microservices for core features is highly recommended. Utilizing AWS Nitro Enclaves or cloud edge handlers like Cloudflare Workers can help distribute global loads with sub-50ms latency.",
            "Choosing the Right Tech Stack:",
            "Modern stacks are shifting towards strongly-typed languages. Pairing Next.js or Remix with TypeScript on the frontend alongside an asynchronous backend using Node.js (NestJS) or Go ensures fast execution speeds and high developer productivity. For persistent storage, a relational database like PostgreSQL with multi-node read replication, alongside Redis for caching frequently requested sessions, is the industry standard.",
            "Focusing on the Minimum Viable Product (MVP):",
            "While scalability is key, never over-engineer on day one. Focus on delivering core features that solve client pain points first. Keep your database schema clean, write automated unit tests, and leverage CI/CD pipelines so you can deploy changes daily with complete confidence."
        ]
    },
    {
        slug: "layout-grids-typography-modern-ui",
        category: "Design",
        readTime: "4 min read",
        date: "June 28, 2026",
        title: "Mastering Layout Grids & Typography in Modern UI/UX",
        excerpt: "Layout and typography form the foundation of any digital interface. Learn how to combine visual hierarchy and grids to construct professional websites.",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?fit=crop&w=800&q=80",
        content: [
            "Every premium website starts with visual hierarchy. Before deciding on brand colors or animations, designers must align on font scales and layout grids. When these two principles are handled with precision, user engagement and content scan-rate increase exponentially.",
            "Visual Grid Systems:",
            "We recommend utilizing a 4px baseline grid coupled with a standard 8pt grid system for component paddings and margins. For desktop websites, a flexible 12-column layout with 24px gutters allows you to organize structured text grids, images, and dashboards cleanly without overcrowding active viewports.",
            "The Power of Typography:",
            "Limit your fonts. Using a single premium sans-serif family (such as Inter, Outfit, or Roboto) with variable weights (Light, Regular, Medium, Bold, Black) is cleaner and loads faster than loading three different font families. Pay close attention to leading (line-height) — body copy should always have line-height between 1.5 and 1.625 for comfortable reading.",
            "Designing for Accessibility:",
            "Ensure a high contrast ratio between your background and typography (at least 4.5:1 for standard body copy). Implementing a clean layout doesn't just look professional — it guarantees that your digital solution is fully accessible to every user, on every device."
        ]
    },
    {
        slug: "typescript-react-performance-guide",
        category: "Engineering",
        readTime: "8 min read",
        date: "May 15, 2026",
        title: "The Developer's Guide to TypeScript & React Performance",
        excerpt: "React is incredibly powerful, but unoptimized render cycles can slow down complex apps. Learn how to identify and resolve performance lags.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?fit=crop&w=800&q=80",
        content: [
            "React and TypeScript are the absolute standard for frontend engineering. However, as web applications grow in size, components can suffer from unnecessary re-renders, causing input lag, slow animations, and sluggish scroll rates.",
            "Tracking Down Unnecessary Renders:",
            "Before writing any code optimizations, use the React DevTools Profiler to record render cycles. Identify which components are updating frequently and look at what props are causing the update. Often, passing anonymous inline functions or object declarations is the main culprit.",
            "Effective Use of React.memo, useMemo, and useCallback:",
            "Use memoization strategically. Wrap heavy computed variables in `useMemo` and callbacks in `useCallback` when they are passed as props to memoized child components. Be careful not to overuse them, as memoization itself incurs overhead. Focus on performance bottlenecks, like dashboard charts, large tables, and interactive maps.",
            "Optimizing State Management:",
            "Avoid placing deep nested state at the root of your application. Push state down as close as possible to the component that uses it. For global state, consider modern, lightweight libraries like Zustand or Jotai which avoid global re-render cycles when only a tiny piece of state is updated."
        ]
    },
    {
        slug: "productivity-clean-code-pipelines-launch",
        category: "Productivity",
        readTime: "5 min read",
        date: "April 02, 2026",
        title: "Why Clean Code & CI/CD Pipelines Speed Up Product Launch",
        excerpt: "Writing clean code and setting up automated deployments might feel like extra overhead early on, but it is actually the fastest way to deploy features.",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?fit=crop&w=800&q=80",
        content: [
            "In high-speed startup settings, developers are often pressured to ship code as fast as possible. This frequently leads to skipping tests, bypassing code formatting, and deploying manually. Over time, this accumulates technical debt and slows down feature delivery.",
            "The Concept of Clean Code:",
            "Clean code is code that is easy to read, self-explanatory, and simple to test. By organizing your codebase with single-responsibility functions, modular folder patterns, and typescript safety, you make it easy for new team members to write features without introducing regression bugs.",
            "Automated CI/CD Pipelines:",
            "Manual deployment is a high-risk liability. Setting up GitHub Actions or similar automated tools to run linters, typecheckers, and unit tests on every pull request guarantees that broken builds never reach production. Deploying changes to staging or production should be as simple as merging a pull request.",
            "Accelerating Development Velocity:",
            "By investing in automated tooling and code standards early, your team avoids wasting time tracking down regression bugs or manual server configuration errors, leaving them free to focus entirely on engineering business value."
        ]
    }
];

const initialPortfolios = [
    {
        slug: "analytics-dashboard",
        title: "Aegis Analytics Dashboard",
        category: "SaaS",
        subtitle: "SaaS · Web App",
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?fit=crop&w=800&q=80",
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
        src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?fit=crop&w=800&q=80",
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
        src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?fit=crop&w=800&q=80",
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
        src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?fit=crop&w=800&q=80",
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

const initialTestimonials = [
    {
        name: "Michael Anderson",
        location: "CTO, Nexaflow Inc.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=120&h=120&q=80",
        text: "The custom dashboard they built completely transformed how we monitor our operations. Delivered on time and beyond expectations.",
        column: 1
    },
    {
        name: "Sarah Thompson",
        location: "Founder, Bloom Digital",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=120&h=120&q=80",
        text: "Exceptional team. They understood our vision from day one and turned it into a scalable product we're proud to ship.",
        column: 1
    },
    {
        name: "Emma Rodriguez",
        location: "Product Lead, Orbita SaaS",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=120&h=120&q=80",
        text: "From initial wireframes to deployment, their attention to detail and technical expertise was outstanding.",
        column: 1
    },
    {
        name: "David Wilson",
        location: "CEO, Stackline Labs",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=120&h=120&q=80",
        text: "Their expertise in cloud architecture saved us months of engineering time. The performance gains were immediately visible.",
        column: 2
    },
    {
        name: "Daniel Kim",
        location: "Head of Engineering, Velotra",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?fit=crop&w=120&h=120&q=80",
        text: "We brought them in for a critical migration and they nailed it. Zero downtime, clean code, and great communication throughout.",
        column: 2
    },
    {
        name: "James Parker",
        location: "Startup Founder, Clario AI",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?fit=crop&w=120&h=120&q=80",
        text: "Nexion Solutions built our AI engine from scratch. Highly technical, responsive, and easy to collaborate with.",
        column: 2
    }
];

const seedDatabase = async () => {
    try {
        console.log("=== MongoDB Database Seeding Started ===");
        const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/nexion";
        await mongoose.connect(mongoUri);
        console.log("Connected to MongoDB...");

        // 1. Seed Admin User
        const adminEmail = (process.env.ADMIN_EMAIL || "melan@gmail.com").toLowerCase();
        const adminPass = process.env.ADMIN_PASSWORD || "787898Mm";

        let adminUser = await User.findOne({
            $or: [{ email: adminEmail }, { username: "admin" }]
        });

        if (!adminUser) {
            await User.create({
                username: "admin",
                email: adminEmail,
                password: adminPass
            });
            console.log(`✓ Admin User created: ${adminEmail}`);
        } else {
            adminUser.password = adminPass;
            await adminUser.save();
            console.log(`✓ Admin User credentials synced: ${adminEmail}`);
        }

        // 2. Seed Blogs
        for (const blogData of initialBlogs) {
            const exists = await Blog.findOne({ slug: blogData.slug });
            if (!exists) {
                await Blog.create(blogData);
                console.log(`✓ Blog Article seeded: ${blogData.title}`);
            }
        }

        // 3. Seed Portfolio Projects
        for (const projData of initialPortfolios) {
            const exists = await Portfolio.findOne({ slug: projData.slug });
            if (!exists) {
                await Portfolio.create(projData);
                console.log(`✓ Portfolio Project seeded: ${projData.title}`);
            }
        }

        // 4. Seed Testimonials
        for (const testData of initialTestimonials) {
            const exists = await Testimonial.findOne({ name: testData.name });
            if (!exists) {
                await Testimonial.create(testData);
                console.log(`✓ Testimonial Review seeded: ${testData.name}`);
            }
        }

        console.log("\n=== MongoDB Seeding Successfully Completed ===");
        process.exit(0);
    } catch (error) {
        console.error("Seeding Error:", error.message);
        process.exit(1);
    }
};

seedDatabase();

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
    Code2, BrainCircuit, Layers, ShieldCheck, Headset,
    Users, Target, Globe, Award, ChevronRight, ArrowRight,
    Linkedin, Twitter, Github, Mail
} from "lucide-react";
import logo1 from "../assets/logo1.png";

const teamMembers = [
    {
        name: "Alex Carter",
        role: "CEO & Co-Founder",
        bio: "Visionary leader with 12+ years scaling global tech products and enterprise SaaS platforms.",
        icon: <Users className="size-6 text-zinc-400" />,
        socials: { linkedin: "#", twitter: "#", github: "#" }
    },
    {
        name: "Priya Nair",
        role: "CTO & Lead Architect",
        bio: "Full-stack wizard specializing in cloud-native microservices, distributed systems, and AI integration.",
        icon: <Code2 className="size-6 text-zinc-400" />,
        socials: { linkedin: "#", twitter: "#", github: "#" }
    },
    {
        name: "Marcus Webb",
        role: "Head of Product",
        bio: "Product strategist who turns complex user problems into beautiful, outcome-driven software experiences.",
        icon: <Layers className="size-6 text-zinc-400" />,
        socials: { linkedin: "#", twitter: "#", github: "#" }
    },
    {
        name: "Sasha Ivanova",
        role: "Lead UI/UX Designer",
        bio: "Crafting pixel-perfect, high-converting interfaces that balance aesthetics with seamless usability.",
        icon: <Target className="size-6 text-zinc-400" />,
        socials: { linkedin: "#", twitter: "#", github: "#" }
    },
];

const values = [
    {
        icon: <BrainCircuit className="size-6 text-zinc-300" />,
        title: "Innovation First",
        desc: "We constantly push the boundaries of what technology can do for your business."
    },
    {
        icon: <ShieldCheck className="size-6 text-zinc-300" />,
        title: "Built to Last",
        desc: "Every system we deliver is architected for security, scalability, and long-term performance."
    },
    {
        icon: <Globe className="size-6 text-zinc-300" />,
        title: "Global Mindset",
        desc: "We partner with clients across continents, bringing diverse perspectives to every challenge."
    },
    {
        icon: <Award className="size-6 text-zinc-300" />,
        title: "Excellence Always",
        desc: "From code quality to client communication, we hold ourselves to the highest professional standards."
    },
];

const milestones = [
    { year: "2016", event: "Nexion Solutions founded in Colombo with 3 engineers." },
    { year: "2018", event: "Delivered first enterprise SaaS platform for a regional bank." },
    { year: "2020", event: "Expanded to 40+ team members and launched cloud practice." },
    { year: "2022", event: "Crossed 100 global clients and launched AI-powered services." },
    { year: "2024", event: "Recognized as a Top 10 Tech Firm by Southeast Asia Tech Review." },
    { year: "2026", event: "200+ projects delivered, 8 countries, still growing." },
];

const fadeUp = {
    hidden: { y: 40, opacity: 0 },
    visible: (i = 0) => ({
        y: 0,
        opacity: 1,
        transition: { delay: i * 0.1, type: "spring", stiffness: 240, damping: 70 }
    })
};

export default function About() {
    const navigate = useNavigate();

    const handleContactClick = () => {
        toast.success("Redirecting to contact form…", {
            style: { borderRadius: "12px", background: "#18181b", color: "#fafafa", border: "1px solid #27272a" },
            iconTheme: { primary: "#a1a1aa", secondary: "#18181b" }
        });
        setTimeout(() => navigate("/"), 1200);
    };

    return (
        <div className="bg-zinc-950 text-zinc-50 min-h-screen w-full overflow-x-hidden">

            {/* ── Hero Banner ─────────────────────────────────────────── */}
            <section className="relative flex flex-col items-center justify-center min-h-[60vh] px-4 text-center overflow-hidden bg-black bg-[url('tech-hero-bg.png')] bg-cover bg-center">
                <div className="absolute inset-0 bg-black/65 pointer-events-none" />

                <motion.div
                    className="relative z-10 bg-white/10 backdrop-blur border border-white/20 text-sm text-white pl-3 pr-5 py-1.5 rounded-full flex items-center gap-2 mb-6"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70 }}
                >
                    <Globe size={15} />
                    <span>Empowering Businesses Through Technology</span>
                </motion.div>

                <motion.h1
                    className="relative z-10 text-4xl md:text-6xl font-medium leading-tight max-w-3xl text-zinc-50"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 240, damping: 70 }}
                >
                    About Nexion Solutions
                </motion.h1>

                <motion.p
                    className="relative z-10 mt-4 text-zinc-300 max-w-xl text-base"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70 }}
                >
                    We are a global tech consulting and software engineering firm dedicated to transforming ideas into impactful digital products.
                </motion.p>

                <motion.div
                    className="relative z-10 flex items-center gap-4 mt-8"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 320, damping: 70 }}
                >
                    <Link to="/" className="bg-zinc-50 hover:bg-zinc-200 px-6 py-2.5 rounded-md text-zinc-900 text-sm font-medium transition">
                        Go Home
                    </Link>
                    <button
                        onClick={handleContactClick}
                        className="border border-zinc-400 text-zinc-50 px-6 py-2.5 rounded-md text-sm font-medium flex items-center gap-2 group transition hover:border-white"
                    >
                        Contact Us <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>
            </section>

            {/* ── Mission & Vision ────────────────────────────────────── */}
            <section className="py-20 px-4 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {[
                        {
                            icon: <Target className="size-8 text-zinc-400 mb-4" />,
                            label: "OUR MISSION",
                            title: "Build technology that moves businesses forward.",
                            body: "We partner with startups and enterprises to design, develop, and deploy high-performance software solutions — from MVPs to enterprise-grade platforms — all with a relentless focus on quality and impact."
                        },
                        {
                            icon: <Globe className="size-8 text-zinc-400 mb-4" />,
                            label: "OUR VISION",
                            title: "A world where every great idea has the tech to match.",
                            body: "We envision a future where the gap between ambition and execution is zero. Nexion exists to close that gap — providing world-class engineering talent and strategic digital guidance to businesses everywhere."
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8"
                        >
                            {item.icon}
                            <span className="text-xs tracking-widest text-zinc-500 uppercase">{item.label}</span>
                            <h2 className="text-2xl font-medium text-zinc-50 mt-3 mb-4 leading-snug">{item.title}</h2>
                            <p className="text-zinc-400 text-sm leading-relaxed">{item.body}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── Core Values ─────────────────────────────────────────── */}
            <section className="py-16 px-4 md:px-16 lg:px-24 xl:px-32 bg-zinc-900/40">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="flex items-center gap-1.5 mb-4"
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    >
                        <span className="size-1.5 bg-zinc-400 rounded-full inline-block" />
                        <span className="text-sm text-zinc-400 uppercase tracking-widest">Core Values</span>
                    </motion.div>
                    <motion.h2
                        className="text-3xl md:text-5xl font-medium text-zinc-50 mb-12 max-w-2xl leading-tight"
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    >
                        What drives every decision we make
                    </motion.h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((v, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-600 transition-colors duration-300 group"
                            >
                                <div className="mb-4 p-3 bg-zinc-800 rounded-lg w-fit group-hover:bg-zinc-700 transition-colors">
                                    {v.icon}
                                </div>
                                <h3 className="text-zinc-50 font-medium mb-2">{v.title}</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Timeline / Milestones ───────────────────────────────── */}
            <section className="py-20 px-4 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto">
                <motion.div
                    className="flex items-center gap-1.5 mb-4"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <span className="size-1.5 bg-zinc-400 rounded-full inline-block" />
                    <span className="text-sm text-zinc-400 uppercase tracking-widest">Our Journey</span>
                </motion.div>
                <motion.h2
                    className="text-3xl md:text-5xl font-medium text-zinc-50 mb-12 max-w-2xl leading-tight"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    From a garage to a global firm
                </motion.h2>
                <div className="relative pl-6 border-l border-zinc-800 flex flex-col gap-10">
                    {milestones.map((m, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <span className="absolute -left-[29px] top-1 size-3 rounded-full bg-zinc-600 border-2 border-zinc-950" />
                            <span className="text-xs text-zinc-500 uppercase tracking-widest font-medium">{m.year}</span>
                            <p className="text-zinc-300 mt-1 text-sm leading-relaxed">{m.event}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── Team ────────────────────────────────────────────────── */}
            <section className="py-16 px-4 md:px-16 lg:px-24 xl:px-32 bg-zinc-900/40">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="flex items-center gap-1.5 mb-4"
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    >
                        <span className="size-1.5 bg-zinc-400 rounded-full inline-block" />
                        <span className="text-sm text-zinc-400 uppercase tracking-widest">The Team</span>
                    </motion.div>
                    <motion.h2
                        className="text-3xl md:text-5xl font-medium text-zinc-50 mb-12 max-w-2xl leading-tight"
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    >
                        The minds behind the mission
                    </motion.h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {teamMembers.map((member, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col gap-4 hover:border-zinc-600 transition-colors duration-300"
                            >
                                <div className="size-14 rounded-full bg-zinc-800 flex items-center justify-center">
                                    {member.icon}
                                </div>
                                <div>
                                    <h3 className="text-zinc-50 font-medium">{member.name}</h3>
                                    <span className="text-xs text-zinc-500">{member.role}</span>
                                </div>
                                <p className="text-zinc-400 text-sm leading-relaxed flex-1">{member.bio}</p>
                                <div className="flex items-center gap-3 pt-2 border-t border-zinc-800">
                                    <a href={member.socials.linkedin} className="text-zinc-500 hover:text-zinc-300 transition-colors"><Linkedin size={15} /></a>
                                    <a href={member.socials.twitter} className="text-zinc-500 hover:text-zinc-300 transition-colors"><Twitter size={15} /></a>
                                    <a href={member.socials.github} className="text-zinc-500 hover:text-zinc-300 transition-colors"><Github size={15} /></a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA Strip ───────────────────────────────────────────── */}
            <section className="py-20 px-4 md:px-16 lg:px-24 xl:px-32">
                <motion.div
                    className="max-w-7xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl px-8 py-14 flex flex-col md:flex-row items-center justify-between gap-8"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <div>
                        <h2 className="text-2xl md:text-4xl font-medium text-zinc-50 leading-tight max-w-lg">
                            Ready to build something <span className="text-zinc-400">remarkable?</span>
                        </h2>
                        <p className="text-zinc-400 text-sm mt-3 max-w-md">
                            Let's talk about your next big idea. We'll turn it into a product your users will love.
                        </p>
                    </div>
                    <button
                        onClick={handleContactClick}
                        className="flex items-center gap-2 shrink-0 bg-zinc-50 hover:bg-zinc-200 text-zinc-900 px-8 py-3.5 rounded-full text-sm font-medium transition-all group"
                    >
                        Start a Project
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>
            </section>

            {/* ── Footer Logo strip ───────────────────────────────────── */}
            <div className="border-t border-zinc-800 py-8 px-4 md:px-16 lg:px-24 xl:px-32 flex flex-col sm:flex-row items-center justify-between gap-4">
                <img src={logo1} alt="Nexion Solutions" className="h-14 w-auto object-contain invert opacity-70" />
                <p className="text-xs text-zinc-600">© 2026 Nexion Solutions. All rights reserved.</p>
                <div className="flex items-center gap-4 text-xs text-zinc-500">
                    <a href="#" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-zinc-300 transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-zinc-300 transition-colors flex items-center gap-1"><Mail size={12} /> hello@nexion.io</a>
                </div>
            </div>

        </div>
    );
}
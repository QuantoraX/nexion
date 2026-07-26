import { motion, Variants } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Globe, ChevronRight, ArrowRight, CheckCircle2 } from "lucide-react";
import aboutTeam from "../assets/about-team.png";
import aboutMission from "../assets/about-mission.png";
import aboutHeroBg from "../assets/abouthero.jpg";
import { TeamSection } from "../sections/team";
import {
    values,
    milestones,
    capabilities,
} from "../data/about-data";

/* ─── Animation variant ─────────────────────────────────────────── */
const fadeUp: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: (i = 0) => ({
        y: 0,
        opacity: 1,
        transition: { delay: i * 0.1, type: "spring" as const, stiffness: 240, damping: 70 }
    })
};

/* ─── Component ──────────────────────────────────────────────────── */
export default function About() {
    const navigate = useNavigate();

    const handleContactClick = () => {
        toast.success("Taking you to our contact form…", {
            style: { borderRadius: "12px", background: "#18181b", color: "#fafafa", border: "1px solid #3f3f46" },
            iconTheme: { primary: "#a1a1aa", secondary: "#18181b" }
        });
        setTimeout(() => navigate("/contact"), 1200);
    };

    return (
        <div className="bg-white text-zinc-900 w-full overflow-x-hidden">

            {/* ── 1. HERO ────────────────────────────────────────────── */}
            <section
                className="relative flex flex-col items-center justify-center min-h-[65vh] px-4 text-center overflow-hidden bg-black bg-cover bg-center"
                style={{ backgroundImage: `url(${aboutHeroBg})` }}
            >
                <div className="absolute inset-0 bg-black/55 pointer-events-none" />

                <motion.div
                    className="relative z-10 bg-white/10 backdrop-blur border border-white/20 text-sm text-white pl-3 pr-5 py-1.5 rounded-full flex items-center gap-2 mb-6"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring" as const, stiffness: 320, damping: 70 }}
                >
                    <Globe size={14} />
                    <span>Empowering Businesses Through Technology</span>
                </motion.div>

                <motion.h1
                    className="relative z-10 text-4xl md:text-6xl font-medium leading-tight max-w-3xl text-white"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring" as const, stiffness: 240, damping: 70 }}
                >
                    The Team Behind the Technology
                </motion.h1>

                <motion.p
                    className="relative z-10 mt-4 text-zinc-300 max-w-lg text-base leading-relaxed"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring" as const, stiffness: 320, damping: 70 }}
                >
                    We are a global tech consulting and software engineering firm dedicated to transforming ideas into impactful digital products.
                </motion.p>

                <motion.div
                    className="relative z-10 flex items-center gap-4 mt-8"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, type: "spring" as const, stiffness: 320, damping: 70 }}
                >
                    <Link to="/" className="bg-zinc-50 hover:bg-zinc-200 px-6 py-2.5 rounded-md text-zinc-900 text-sm font-medium transition">
                        Back to Home
                    </Link>
                    <button
                        onClick={handleContactClick}
                        className="border border-white/40 hover:border-white text-white px-6 py-2.5 rounded-md text-sm font-medium flex items-center gap-2 group transition"
                    >
                        Contact Us <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>
            </section>

            {/* ── 2. MISSION + IMAGE ─────────────────────────────────── */}
            <section className="py-20 px-4 md:px-16 lg:px-24 xl:px-32 w-full">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text */}
                    <div>
                        <motion.div
                            className="flex items-center gap-1.5 mb-6"
                            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        >
                            <span className="size-1.5 bg-zinc-900 inline-block" />
                            <span className="text-sm text-zinc-900 uppercase tracking-widest">Our Mission</span>
                        </motion.div>

                        <motion.h2
                            className="text-4xl md:text-5xl font-medium text-zinc-900 leading-tight mb-6"
                            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        >
                            Build technology that moves businesses forward
                        </motion.h2>

                        <motion.p
                            className="text-zinc-500 text-sm md:text-base leading-relaxed mb-6"
                            custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        >
                            We partner with startups and enterprises to design, develop, and deploy high-performance software — from MVPs to enterprise-grade platforms — with a relentless focus on quality and real business impact.
                        </motion.p>

                        <motion.p
                            className="text-zinc-500 text-sm md:text-base leading-relaxed mb-8"
                            custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        >
                            Our vision is a world where the gap between ambition and execution is zero. Nexion exists to close that gap — providing world-class engineering talent and strategic digital guidance to businesses everywhere.
                        </motion.p>

                        <motion.button
                            onClick={handleContactClick}
                            className="bg-zinc-950 hover:bg-zinc-800 text-white px-7 py-3 rounded-full text-sm transition flex items-center gap-2 group cursor-pointer"
                            custom={3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        >
                            Work With Us <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </div>

                    {/* Image */}
                    <motion.div
                        className="relative w-full h-96 lg:h-120 rounded-xl overflow-hidden"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring" as const, stiffness: 200, damping: 60 }}
                    >
                        <img src={aboutMission} alt="Nexion team strategy session" className="w-full h-full object-cover" />
                    </motion.div>
                </div>
            </section>

            {/* ── 3. STATS STRIP ─────────────────────────────────────── */}
            <section className="py-14 px-4 md:px-16 lg:px-24 xl:px-32 bg-zinc-950">
                <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-10">
                    {[
                        { value: "200+", label: "PROJECTS DELIVERED" },
                        { value: "98%", label: "CLIENT SATISFACTION" },
                        { value: "8+", label: "YEARS OF EXPERIENCE" },
                        { value: "40+", label: "TEAM MEMBERS" },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="flex flex-col"
                        >
                            <span className="text-4xl md:text-5xl font-medium text-white">{stat.value}</span>
                            <span className="text-xs text-zinc-400 mt-2 tracking-widest">{stat.label}</span>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── 4. CORE VALUES ─────────────────────────────────────── */}
            <section className="py-20 px-4 md:px-16 lg:px-24 xl:px-32 bg-gray-50 w-full">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="flex items-center gap-1.5 mb-6"
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    >
                        <span className="size-1.5 bg-zinc-900 inline-block" />
                        <span className="text-sm text-zinc-900 uppercase tracking-widest">Core Values</span>
                    </motion.div>

                    <motion.h2
                        className="text-4xl md:text-5xl font-medium text-zinc-900 mb-12 max-w-2xl leading-tight"
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
                                className="bg-white border border-zinc-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="mb-4 p-3 bg-zinc-100 rounded-lg w-fit">
                                    {v.icon}
                                </div>
                                <h3 className="text-zinc-900 font-medium mb-2">{v.title}</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 7. TEAM ────────────────────────────────────────────── */}
            <TeamSection />

            {/* ── 5. CAPABILITIES ────────────────────────────────────── */}
            <section className="py-20 px-4 md:px-16 lg:px-24 xl:px-32 w-full">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image */}
                    <motion.div
                        className="relative w-full h-96 lg:h-120 rounded-xl overflow-hidden order-2 lg:order-1"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring" as const, stiffness: 200, damping: 60 }}
                    >
                        <img src={aboutTeam} alt="Nexion Solutions team at work" className="w-full h-full object-cover" />
                    </motion.div>

                    {/* List */}
                    <div className="order-1 lg:order-2">
                        <motion.div
                            className="flex items-center gap-1.5 mb-6"
                            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        >
                            <span className="size-1.5 bg-zinc-900 inline-block" />
                            <span className="text-sm text-zinc-900 uppercase tracking-widest">What We Do</span>
                        </motion.div>

                        <motion.h2
                            className="text-4xl md:text-5xl font-medium text-zinc-900 leading-tight mb-8"
                            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        >
                            Full-spectrum software capabilities
                        </motion.h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {capabilities.map((cap, i) => (
                                <motion.div
                                    key={i}
                                    custom={i}
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className="flex items-center gap-2.5"
                                >
                                    <CheckCircle2 size={16} className="text-zinc-900 shrink-0" />
                                    <span className="text-sm text-zinc-600">{cap}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 6. TIMELINE ────────────────────────────────────────── */}
            <section className="py-20 px-4 md:px-16 lg:px-24 xl:px-32 bg-gray-50 w-full">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="flex items-center gap-1.5 mb-6"
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    >
                        <span className="size-1.5 bg-zinc-900 inline-block" />
                        <span className="text-sm text-zinc-900 uppercase tracking-widest">Our Journey</span>
                    </motion.div>

                    <motion.h2
                        className="text-4xl md:text-5xl font-medium text-zinc-900 mb-14 max-w-2xl leading-tight"
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    >
                        From a garage to a global firm
                    </motion.h2>

                    <div className="relative pl-6 border-l border-zinc-200 flex flex-col gap-10">
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
                                <span className="absolute -left-7.25 top-1 size-3 rounded-full bg-zinc-900 border-2 border-gray-50" />
                                <span className="text-xs text-zinc-400 uppercase tracking-widest font-medium">{m.year}</span>
                                <p className="text-zinc-600 mt-1 text-sm leading-relaxed">{m.event}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            

        </div>
    );
}

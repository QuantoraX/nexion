import { motion, Variants } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowRight, ChevronRight, Zap } from "lucide-react";
import { services, techStack, processSteps, benefits } from "../data/services-data";

/* ─── Animation variant ─────────────────────────────────────────── */
const fadeUp: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: (i = 0) => ({
        y: 0,
        opacity: 1,
        transition: { delay: i * 0.1, type: "spring" as const, stiffness: 240, damping: 70 },
    }),
};

/* ─── Section label helper ───────────────────────────────────────── */
function SectionLabel({ text }: { text: string }) {
    return (
        <motion.div
            className="flex items-center gap-1.5 mb-5"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
            <span className="size-1.5 bg-zinc-900 inline-block" />
            <span className="text-sm text-zinc-900 uppercase tracking-widest">{text}</span>
        </motion.div>
    );
}

/* ─── Component ──────────────────────────────────────────────────── */
export default function Services() {
    const navigate = useNavigate();

    const handleCTA = () => {
        toast.success("Let's talk about your project!", {
            style: { borderRadius: "12px", background: "#18181b", color: "#fafafa", border: "1px solid #3f3f46" },
            iconTheme: { primary: "#a1a1aa", secondary: "#18181b" },
        });
        setTimeout(() => navigate("/"), 1200);
    };

    return (
        <div className="bg-white text-zinc-900 w-full overflow-x-hidden">

            {/* ══ 1. HERO ═══════════════════════════════════════════════ */}
            <section className="relative flex flex-col items-center justify-center min-h-[65vh] px-4 text-center overflow-hidden bg-black bg-[url('tech-hero-bg.png')] bg-cover bg-center">
                <div className="absolute inset-0 bg-black/60 pointer-events-none" />

                <motion.div
                    className="relative z-10 bg-white/10 backdrop-blur border border-white/20 text-sm text-white pl-3 pr-5 py-1.5 rounded-full flex items-center gap-2 mb-6"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring" as const, stiffness: 320, damping: 70 }}
                >
                    <Zap size={14} />
                    <span>End-to-End Digital Product Studio</span>
                </motion.div>

                <motion.h1
                    className="relative z-10 text-4xl md:text-6xl font-medium leading-tight max-w-3xl text-white"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring" as const, stiffness: 240, damping: 70 }}
                >
                    Transforming Ideas into Powerful Digital Solutions
                </motion.h1>

                <motion.p
                    className="relative z-10 mt-4 text-zinc-300 max-w-lg text-base leading-relaxed"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring" as const, stiffness: 320, damping: 70 }}
                >
                    From custom software to mobile apps, we design and engineer digital products that drive real business growth.
                </motion.p>

                <motion.div
                    className="relative z-10 flex items-center gap-4 mt-8"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, type: "spring" as const, stiffness: 320, damping: 70 }}
                >
                    <button
                        onClick={handleCTA}
                        className="bg-zinc-50 hover:bg-zinc-200 px-6 py-2.5 rounded-md text-zinc-900 text-sm font-medium transition cursor-pointer"
                    >
                        Get a Free Consultation
                    </button>
                    <Link
                        to="/about"
                        className="border border-white/40 hover:border-white text-white px-6 py-2.5 rounded-md text-sm font-medium flex items-center gap-2 group transition"
                    >
                        Learn About Us <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </section>

            {/* ══ 2. CORE SERVICES GRID ═════════════════════════════════ */}
            <section className="py-20 px-4 md:px-16 lg:px-24 xl:px-32 w-full">
                <div className="max-w-7xl mx-auto">
                    <SectionLabel text="Core Services" />
                    <motion.h2
                        className="text-4xl md:text-5xl font-medium text-zinc-900 mb-4 max-w-2xl leading-tight"
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    >
                        Everything you need to build and scale
                    </motion.h2>
                    <motion.p
                        className="text-zinc-500 text-sm md:text-base max-w-xl mb-12 leading-relaxed"
                        custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    >
                        We offer a full spectrum of software engineering services — designed to take your idea from concept to a live, scalable product.
                    </motion.p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {services.map((svc, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="group border border-zinc-200 rounded-xl p-7 bg-white hover:shadow-lg hover:border-zinc-300 transition-all duration-300 flex flex-col gap-5"
                            >
                                <div className="p-3 bg-zinc-100 rounded-lg w-fit group-hover:bg-zinc-200 transition-colors duration-300">
                                    {svc.icon}
                                </div>
                                <div>
                                    <h3 className="text-zinc-900 font-medium text-lg mb-2">{svc.title}</h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed">{svc.desc}</p>
                                </div>
                                <ul className="flex flex-wrap gap-2 mt-auto">
                                    {svc.bullets.map((b, j) => (
                                        <li key={j} className="text-xs bg-zinc-100 text-zinc-600 px-3 py-1 rounded-full">
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 3. TECH STACK ═════════════════════════════════════════ */}
            <section className="py-20 px-4 md:px-16 lg:px-24 xl:px-32 bg-gray-50 w-full">
                <div className="max-w-7xl mx-auto">
                    <SectionLabel text="Technology Stack" />
                    <motion.h2
                        className="text-4xl md:text-5xl font-medium text-zinc-900 mb-4 max-w-2xl leading-tight"
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    >
                        Built with the right tools for the job
                    </motion.h2>
                    <motion.p
                        className="text-zinc-500 text-sm md:text-base max-w-xl mb-12 leading-relaxed"
                        custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    >
                        We use battle-tested, modern technologies — chosen for performance, scalability, and developer experience.
                    </motion.p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {techStack.map((cat, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="bg-white border border-zinc-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300"
                            >
                                <span className="text-xs uppercase tracking-widest text-zinc-400 font-medium block mb-4">{cat.label}</span>
                                <div className="flex flex-wrap gap-2">
                                    {cat.techs.map((tech, j) => (
                                        <span
                                            key={j}
                                            className="text-xs bg-zinc-900 text-zinc-100 px-3 py-1.5 rounded-full font-medium hover:bg-zinc-700 transition-colors cursor-default"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 4. DEVELOPMENT PROCESS ════════════════════════════════ */}
            <section className="py-20 px-4 md:px-16 lg:px-24 xl:px-32 w-full">
                <div className="max-w-7xl mx-auto">
                    <SectionLabel text="Our Process" />
                    <motion.h2
                        className="text-4xl md:text-5xl font-medium text-zinc-900 mb-4 max-w-2xl leading-tight"
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    >
                        How we bring your vision to life
                    </motion.h2>
                    <motion.p
                        className="text-zinc-500 text-sm md:text-base max-w-xl mb-14 leading-relaxed"
                        custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    >
                        A proven, transparent workflow — from first conversation to final deployment.
                    </motion.p>

                    {/* Timeline */}
                    <div className="relative">
                        {/* Vertical line for desktop */}
                        <div className="hidden lg:block absolute left-[calc(50%-0.5px)] top-0 bottom-0 w-px bg-zinc-200" />

                        <div className="flex flex-col gap-10">
                            {processSteps.map((step, i) => {
                                const isLeft = i % 2 === 0;
                                return (
                                    <motion.div
                                        key={i}
                                        custom={i}
                                        variants={fadeUp}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        className={`relative flex flex-col lg:flex-row items-start lg:items-center gap-6 ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                                    >
                                        {/* Card */}
                                        <div className={`w-full lg:w-[calc(50%-2.5rem)] bg-white border border-zinc-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300 ${isLeft ? "lg:text-right" : "lg:text-left"}`}>
                                            <div className={`flex items-center gap-3 mb-3 ${isLeft ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
                                                <div className="p-2 bg-zinc-100 rounded-lg shrink-0">
                                                    {step.icon}
                                                </div>
                                                <span className="text-xs text-zinc-400 font-medium uppercase tracking-widest">Step {step.step}</span>
                                            </div>
                                            <h3 className="text-zinc-900 font-medium text-lg mb-2">{step.title}</h3>
                                            <p className="text-zinc-500 text-sm leading-relaxed">{step.desc}</p>
                                        </div>

                                        {/* Centre dot */}
                                        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 size-5 rounded-full bg-zinc-900 border-4 border-white shadow-md z-10" />

                                        {/* Spacer */}
                                        <div className="hidden lg:block w-[calc(50%-2.5rem)]" />
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 5. WHY CHOOSE US ══════════════════════════════════════ */}
            <section className="py-20 px-4 md:px-16 lg:px-24 xl:px-32 bg-gray-50 w-full">
                <div className="max-w-7xl mx-auto">
                    <SectionLabel text="Why Choose Us" />
                    <motion.h2
                        className="text-4xl md:text-5xl font-medium text-zinc-900 mb-4 max-w-2xl leading-tight"
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    >
                        What makes Nexion different
                    </motion.h2>
                    <motion.p
                        className="text-zinc-500 text-sm md:text-base max-w-xl mb-12 leading-relaxed"
                        custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    >
                        We don't just write code — we take ownership of your product's success, every step of the way.
                    </motion.p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {benefits.map((b, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="group bg-white border border-zinc-200 rounded-xl p-7 flex gap-5 hover:shadow-md hover:border-zinc-300 transition-all duration-300"
                            >
                                <div className="p-3 bg-zinc-100 rounded-lg h-fit shrink-0 group-hover:bg-zinc-200 transition-colors duration-300">
                                    {b.icon}
                                </div>
                                <div>
                                    <h3 className="text-zinc-900 font-medium mb-2">{b.title}</h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed">{b.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 6. FINAL CTA ══════════════════════════════════════════ */}
            <section className="py-24 px-4 md:px-16 lg:px-24 xl:px-32 bg-zinc-950">
                <motion.div
                    className="max-w-7xl mx-auto flex flex-col items-center text-center gap-7"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <div className="bg-white/5 border border-white/10 text-sm text-zinc-300 pl-3 pr-5 py-1.5 rounded-full flex items-center gap-2">
                        <Zap size={13} />
                        <span>Let's build something together</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-medium text-white leading-tight max-w-2xl">
                        Ready to bring your <span className="text-zinc-400">digital vision</span> to life?
                    </h2>
                    <p className="text-zinc-400 text-sm md:text-base max-w-lg leading-relaxed">
                        Book a free 30-minute consultation and let's explore how Nexion can accelerate your next project.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
                        <button
                            onClick={handleCTA}
                            className="flex items-center gap-2 bg-zinc-50 hover:bg-white text-zinc-900 px-8 py-3.5 rounded-full text-sm font-medium transition-all group cursor-pointer"
                        >
                            Contact Our Team
                            <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <Link
                            to="/about"
                            className="text-zinc-400 hover:text-white text-sm transition-colors flex items-center gap-1.5 group"
                        >
                            Meet the team <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>
            </section>

        </div>
    );
}

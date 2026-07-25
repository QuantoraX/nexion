import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowRight, ChevronDown, Zap, Quote } from "lucide-react";
import { services, techStack, processSteps, benefits, testimonials, faqs } from "../data/services-data";

/* ─── Animation variant ─────────────────────────────────────────── */
const fadeUp = {
    hidden: { y: 40, opacity: 0 },
    visible: (i = 0) => ({
        y: 0,
        opacity: 1,
        transition: { delay: i * 0.08, type: "spring" as const, stiffness: 240, damping: 70 },
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

/* ─── FAQ Accordion Item ─────────────────────────────────────────── */
function FAQItem({ faq, index, open, onToggle }: {
    faq: { q: string; a: string };
    index: number;
    open: boolean;
    onToggle: () => void;
}) {
    return (
        <motion.div
            custom={index}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="border border-zinc-200 rounded-xl overflow-hidden bg-white"
        >
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group cursor-pointer hover:bg-zinc-50 transition-colors duration-200"
                aria-expanded={open}
            >
                <span className="text-zinc-900 font-medium text-sm md:text-base leading-snug">{faq.q}</span>
                <ChevronDown
                    size={18}
                    className={`text-zinc-400 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                />
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="px-6 pb-5 text-zinc-500 text-sm leading-relaxed border-t border-zinc-100 pt-4">
                            {faq.a}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

/* ─── Component ──────────────────────────────────────────────────── */
export default function Services() {
    const navigate = useNavigate();
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);

    const handleCTA = () => {
        toast.success("Let's talk about your project!", {
            style: { borderRadius: "12px", background: "#18181b", color: "#fafafa", border: "1px solid #3f3f46" },
            iconTheme: { primary: "#a1a1aa", secondary: "#18181b" },
        });
        setTimeout(() => navigate("/contact"), 1200);
    };

    const handleLearnMore = (serviceTitle: string) => {
        toast(`Exploring: ${serviceTitle}`, {
            style: { borderRadius: "12px", background: "#18181b", color: "#fafafa", border: "1px solid #3f3f46" },
            icon: "🚀",
        });
        setTimeout(() => navigate("/contact"), 1000);
    };

    return (
        <div className="bg-white text-zinc-900 w-full overflow-x-hidden">

            {/* ══ 1. HERO ════════════════════════════════════════════════ */}
            <section className="relative flex flex-col items-center justify-center min-h-[65vh] px-4 text-center overflow-hidden bg-black bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')" }}>
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

            {/* ══ 2. CORE SERVICES GRID ══════════════════════════════════ */}
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
                        A full spectrum of software engineering services — designed to take your idea from concept to a live, scalable product.
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
                                <div className="flex flex-wrap gap-2">
                                    {svc.bullets.map((b, j) => (
                                        <span key={j} className="text-xs bg-zinc-100 text-zinc-600 px-3 py-1 rounded-full">
                                            {b}
                                        </span>
                                    ))}
                                </div>
                                {/* Learn More */}
                                <button
                                    onClick={() => handleLearnMore(svc.title)}
                                    className="mt-auto flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 transition-colors group/btn w-fit cursor-pointer"
                                >
                                    Learn More
                                    <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 3. TECHNOLOGY STACK (with logos) ══════════════════════ */}
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
                        Battle-tested, modern technologies — chosen for performance, scalability, and developer experience.
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
                                <span className="text-xs uppercase tracking-widest text-zinc-400 font-medium block mb-5">{cat.label}</span>
                                <div className="flex flex-col gap-3">
                                    {cat.techs.map((tech, j) => (
                                        <div
                                            key={j}
                                            className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-zinc-50 transition-colors duration-200 group cursor-default"
                                        >
                                            <img
                                                src={tech.icon}
                                                alt={tech.name}
                                                className="size-6 object-contain group-hover:scale-110 transition-transform duration-200"
                                                loading="lazy"
                                            />
                                            <span className="text-sm text-zinc-700 font-medium">{tech.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 4. DEVELOPMENT PROCESS ═════════════════════════════════ */}
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

                    <div className="relative">
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
                                        <div className={`w-full lg:w-[calc(50%-2.5rem)] bg-white border border-zinc-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300 ${isLeft ? "lg:text-right" : "lg:text-left"}`}>
                                            <div className={`flex items-center gap-3 mb-3 ${isLeft ? "lg:flex-row-reverse" : ""}`}>
                                                <div className="p-2 bg-zinc-100 rounded-lg shrink-0">{step.icon}</div>
                                                <span className="text-xs text-zinc-400 font-medium uppercase tracking-widest">Step {step.step}</span>
                                            </div>
                                            <h3 className="text-zinc-900 font-medium text-lg mb-2">{step.title}</h3>
                                            <p className="text-zinc-500 text-sm leading-relaxed">{step.desc}</p>
                                        </div>
                                        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 size-5 rounded-full bg-zinc-900 border-4 border-white shadow-md z-10" />
                                        <div className="hidden lg:block w-[calc(50%-2.5rem)]" />
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 5. WHY CHOOSE US ════════════════════════════════════════ */}
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

            {/* ══ 6. TESTIMONIALS ════════════════════════════════════════ */}
            <section className="py-20 px-4 md:px-16 lg:px-24 xl:px-32 w-full">
                <div className="max-w-7xl mx-auto">
                    <SectionLabel text="Client Stories" />
                    <motion.h2
                        className="text-4xl md:text-5xl font-medium text-zinc-900 mb-12 max-w-2xl leading-tight"
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    >
                        Trusted by teams building great products
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="flex flex-col gap-5 border border-zinc-200 rounded-xl p-7 bg-white hover:shadow-md transition-shadow duration-300"
                            >
                                <Quote size={22} className="text-zinc-300" />
                                <p className="text-zinc-600 text-sm leading-relaxed flex-1 italic">"{t.quote}"</p>
                                <div className="flex items-center gap-3 pt-4 border-t border-zinc-100">
                                    <div className="size-9 rounded-full bg-zinc-900 text-white flex items-center justify-center text-sm font-medium shrink-0">
                                        {t.initial}
                                    </div>
                                    <div>
                                        <p className="text-zinc-900 font-medium text-sm">{t.name}</p>
                                        <p className="text-zinc-400 text-xs">{t.role}, {t.company}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 7. FAQs ════════════════════════════════════════════════ */}
            <section className="py-20 px-4 md:px-16 lg:px-24 xl:px-32 bg-gray-50 w-full">
                <div className="max-w-3xl mx-auto">
                    <SectionLabel text="FAQ" />
                    <motion.h2
                        className="text-4xl md:text-5xl font-medium text-zinc-900 mb-4 leading-tight"
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    >
                        Questions we hear every day
                    </motion.h2>
                    <motion.p
                        className="text-zinc-500 text-sm md:text-base mb-10 leading-relaxed"
                        custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    >
                        Can't find your answer? <button onClick={handleCTA} className="text-zinc-900 underline underline-offset-2 cursor-pointer hover:text-zinc-600 transition-colors">Send us a message →</button>
                    </motion.p>
                    <div className="flex flex-col gap-3">
                        {faqs.map((faq, i) => (
                            <FAQItem
                                key={i}
                                faq={faq}
                                index={i}
                                open={openFAQ === i}
                                onToggle={() => setOpenFAQ(openFAQ === i ? null : i)}
                            />
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}

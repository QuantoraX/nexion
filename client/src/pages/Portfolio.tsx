import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Tag } from "lucide-react";
import { portfolioCategories } from "../data/portfolio-data";
import { useAppContext } from "../context/appContext";

/* ─── Main Component ──────────────────────────────────────────────── */
export default function Portfolio() {
    const { projects } = useAppContext();
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProjects = activeCategory === "All"
        ? projects
        : projects.filter(p => p.category === activeCategory);

    return (
        <div className="bg-white text-zinc-900 w-full overflow-x-hidden">

            {/* ══ 1. HERO SECTION ════════════════════════════════════════ */}
            <section className="relative flex flex-col items-center justify-center min-h-[65vh] px-4 text-center overflow-hidden bg-black bg-[url('/tech-hero-bg.png')] bg-cover bg-center">
                <div className="absolute inset-0 bg-black/60 pointer-events-none" />

                <motion.div
                    className="relative z-10 bg-white/10 backdrop-blur border border-white/20 text-sm text-white pl-3 pr-5 py-1.5 rounded-full flex items-center gap-2 mb-6"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring" as const, stiffness: 320, damping: 70 }}
                >
                    <Briefcase size={14} />
                    <span>Nexion Case Studies</span>
                </motion.div>

                <motion.h1
                    className="relative z-10 text-4xl md:text-6xl font-medium leading-tight max-w-3xl text-white"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring" as const, stiffness: 240, damping: 70 }}
                >
                    Work We’re Proud Of
                </motion.h1>

                <motion.p
                    className="relative z-10 mt-4 text-zinc-300 max-w-lg text-base leading-relaxed"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring" as const, stiffness: 320, damping: 70 }}
                >
                    Explore our curated showcase of digital products, scalable platforms, and mobile apps built for clients worldwide.
                </motion.p>
            </section>

            {/* ══ 2. CATEGORY FILTER ════════════════════════════════════ */}
            <section className="pt-20 pb-6 px-4 md:px-16 lg:px-24 xl:px-32 w-full">
                <div className="max-w-7xl mx-auto flex flex-col items-center">
                    <motion.div 
                        className="flex flex-wrap items-center justify-center gap-2.5 p-1.5 bg-gray-50 border border-zinc-200/80 rounded-full w-fit"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        {portfolioCategories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                                    activeCategory === cat
                                        ? "bg-zinc-950 text-white shadow-sm"
                                        : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ══ 3. PROJECT GRID ═══════════════════════════════════════ */}
            <section className="pb-24 pt-6 px-4 md:px-16 lg:px-24 xl:px-32 w-full">
                <div className="max-w-7xl mx-auto">
                    <motion.div 
                        layout 
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project) => (
                                <motion.div
                                    layout
                                    key={project.slug}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    className="group flex flex-col border border-zinc-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-zinc-300 transition-all duration-300 bg-white"
                                >
                                    {/* Image Wrapper */}
                                    <Link 
                                        to={`/portfolio/${project.slug}`}
                                        className="relative aspect-video w-full overflow-hidden bg-zinc-100 border-b border-zinc-100 block"
                                    >
                                        <img
                                            src={project.src}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                                            loading="lazy"
                                        />
                                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur border border-zinc-200/50 rounded-full px-3 py-1 flex items-center gap-1.5 shadow-sm">
                                            <Tag size={10} className="text-zinc-500" />
                                            <span className="text-[10px] font-medium tracking-wide text-zinc-600 uppercase">{project.category}</span>
                                        </div>
                                    </Link>

                                    {/* Content */}
                                    <div className="p-6 md:p-8 flex flex-col flex-1 gap-4">
                                        <div>
                                            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">{project.client}</span>
                                            <Link to={`/portfolio/${project.slug}`} className="block hover:text-zinc-600 transition-colors">
                                                <h3 className="text-xl md:text-2xl font-medium text-zinc-900 mt-1">{project.title}</h3>
                                            </Link>
                                        </div>
                                        <p className="text-zinc-500 text-sm leading-relaxed flex-1">
                                            {project.overview}
                                        </p>
                                        
                                        {/* Action info */}
                                        <div className="flex items-center justify-between pt-4 border-t border-zinc-100 mt-auto">
                                            <div className="flex flex-wrap gap-1.5">
                                                {project.techStack.slice(0, 3).map(tech => (
                                                    <span key={tech} className="text-[10px] bg-zinc-50 text-zinc-600 px-2.5 py-1 rounded-full border border-zinc-200/50">
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.techStack.length > 3 && (
                                                    <span className="text-[10px] text-zinc-400 px-1 py-1">
                                                        +{project.techStack.length - 3} more
                                                    </span>
                                                )}
                                            </div>

                                            <Link 
                                                to={`/portfolio/${project.slug}`}
                                                className="flex items-center gap-1.5 text-sm font-medium text-zinc-900 hover:text-zinc-700 transition-colors group/link cursor-pointer shrink-0"
                                            >
                                                <span>View Study</span>
                                                <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}

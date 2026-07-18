import { useParams, Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, User, Layers, CheckCircle2, ShieldAlert } from "lucide-react";
import { portfolioProjects } from "../data/portfolio-data";

/* ─── Animation Variant ─────────────────────────────────────────── */
const fadeUp: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: (i = 0) => ({
        y: 0,
        opacity: 1,
        transition: { delay: i * 0.08, type: "spring" as const, stiffness: 240, damping: 70 }
    })
};

export default function PortfolioDetails() {
    const { slug } = useParams<{ slug: string }>();

    // Find project
    const projectIndex = portfolioProjects.findIndex(p => p.slug === slug);
    const project = portfolioProjects[projectIndex];

    // If project not found
    if (!project) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
                <div className="p-4 bg-red-50 text-red-600 rounded-full mb-6">
                    <ShieldAlert size={32} />
                </div>
                <h1 className="text-3xl font-medium text-zinc-900 mb-2">Case Study Not Found</h1>
                <p className="text-zinc-500 text-sm max-w-xs mb-8">
                    The case study you're looking for doesn't exist or has been moved.
                </p>
                <Link to="/portfolio" className="bg-zinc-950 hover:bg-zinc-800 text-white text-sm px-6 py-3 rounded-full font-medium transition cursor-pointer">
                    Back to Portfolio
                </Link>
            </div>
        );
    }

    // Next project loop
    const nextProject = portfolioProjects[(projectIndex + 1) % portfolioProjects.length];

    return (
        <div className="bg-white text-zinc-900 w-full overflow-x-hidden">

            {/* ══ 1. HERO BANNER ════════════════════════════════════════ */}
            <section 
                className="relative flex flex-col items-center justify-center min-h-[70vh] px-4 text-center overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url(${project.src})` }}
            >
                <div className="absolute inset-0 bg-black/75 pointer-events-none" />

                <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                    <motion.div
                        className="bg-white/10 backdrop-blur border border-white/20 text-xs text-white px-4 py-1.5 rounded-full uppercase tracking-widest font-semibold mb-6 flex items-center gap-1.5"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70 }}
                    >
                        <Layers size={12} />
                        <span>Case Study</span>
                    </motion.div>

                    <motion.h1
                        className="text-4xl md:text-6xl font-medium leading-tight text-white mb-6"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 240, damping: 70 }}
                    >
                        {project.title}
                    </motion.h1>

                    <motion.p
                        className="text-zinc-300 max-w-2xl text-base md:text-lg leading-relaxed mb-8"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 320, damping: 70 }}
                    >
                        {project.overview}
                    </motion.p>

                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70 }}
                    >
                        <Link 
                            to="/portfolio" 
                            className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors"
                        >
                            <ArrowLeft size={16} />
                            <span>Back to Portfolio</span>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ══ 2. CASE STUDY DETAILS ═════════════════════════════════ */}
            <section className="py-20 px-4 md:px-16 lg:px-24 xl:px-32 w-full">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
                    
                    {/* Left: Challenge and Solution */}
                    <div className="lg:col-span-8 flex flex-col gap-12">
                        {/* Challenge */}
                        <motion.div 
                            variants={fadeUp} 
                            initial="hidden" 
                            whileInView="visible" 
                            viewport={{ once: true }}
                            className="flex flex-col gap-4"
                        >
                            <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">The Challenge</span>
                            <h2 className="text-2xl md:text-3xl font-medium text-zinc-900 leading-tight">Identifying client roadblocks</h2>
                            <p className="text-zinc-500 text-sm md:text-base leading-relaxed">
                                {project.challenge}
                            </p>
                        </motion.div>

                        {/* Solution */}
                        <motion.div 
                            variants={fadeUp} 
                            initial="hidden" 
                            whileInView="visible" 
                            viewport={{ once: true }}
                            className="flex flex-col gap-4"
                        >
                            <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">The Solution</span>
                            <h2 className="text-2xl md:text-3xl font-medium text-zinc-900 leading-tight">Custom built architecture</h2>
                            <p className="text-zinc-500 text-sm md:text-base leading-relaxed">
                                {project.solution}
                            </p>
                        </motion.div>
                    </div>

                    {/* Right: Overview specs card */}
                    <div className="lg:col-span-4">
                        <motion.div 
                            variants={fadeUp} 
                            initial="hidden" 
                            whileInView="visible" 
                            viewport={{ once: true }}
                            className="border border-zinc-200 rounded-2xl p-6 md:p-8 bg-zinc-50 flex flex-col gap-6"
                        >
                            <h3 className="text-lg font-medium text-zinc-900 pb-4 border-b border-zinc-200">Project Specs</h3>
                            
                            <div className="flex flex-col gap-5">
                                {/* Client */}
                                <div className="flex gap-3">
                                    <User size={18} className="text-zinc-500 shrink-0 mt-0.5" />
                                    <div>
                                        <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold block">Client</span>
                                        <span className="text-sm font-medium text-zinc-800">{project.client}</span>
                                    </div>
                                </div>

                                {/* Timeline */}
                                <div className="flex gap-3">
                                    <Calendar size={18} className="text-zinc-500 shrink-0 mt-0.5" />
                                    <div>
                                        <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold block">Date Delivered</span>
                                        <span className="text-sm font-medium text-zinc-800">{project.date}</span>
                                    </div>
                                </div>

                                {/* Category */}
                                <div className="flex gap-3">
                                    <Layers size={18} className="text-zinc-500 shrink-0 mt-0.5" />
                                    <div>
                                        <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold block">Service Area</span>
                                        <span className="text-sm font-medium text-zinc-800">{project.category}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-zinc-200">
                                <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold block mb-3">Technologies Used</span>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.techStack.map(tech => (
                                        <span key={tech} className="text-xs bg-white text-zinc-700 px-3 py-1.5 rounded-full border border-zinc-200">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </section>

            {/* ══ 3. DEVELOPMENT HIGHLIGHTS ═════════════════════════════ */}
            <section className="py-20 px-4 md:px-16 lg:px-24 xl:px-32 bg-gray-50 w-full border-t border-b border-zinc-200/80">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col mb-12">
                        <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-4">Highlights</span>
                        <h2 className="text-3xl md:text-4xl font-medium text-zinc-900">Key features delivered</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {project.details.map((detail, index) => (
                            <motion.div
                                key={index}
                                custom={index}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="bg-white border border-zinc-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                            >
                                <div className="p-2 bg-zinc-50 border border-zinc-150 rounded-lg w-fit mb-4">
                                    <CheckCircle2 className="size-5 text-zinc-800" />
                                </div>
                                <h3 className="text-zinc-900 font-medium mb-2">{detail.title}</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">{detail.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 4. NEXT STUDY NAVIGATION ══════════════════════════════ */}
            <section className="py-16 px-4 md:px-16 lg:px-24 xl:px-32 w-full bg-white">
                <div className="max-w-7xl mx-auto flex items-center justify-between border-t border-zinc-100 pt-12">
                    <Link 
                        to="/portfolio" 
                        className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 transition-colors text-sm"
                    >
                        <ArrowLeft size={16} />
                        <span>All Case Studies</span>
                    </Link>

                    <Link 
                        to={`/portfolio/${nextProject.slug}`}
                        className="flex items-center gap-2 text-zinc-900 hover:text-zinc-700 font-medium text-sm group"
                    >
                        <span>Next Project Study</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>

        </div>
    );
}

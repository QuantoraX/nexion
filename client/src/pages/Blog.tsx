import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Clock, Calendar } from "lucide-react";
import { blogCategories } from "../data/blog-data";
import { useAppContext } from "../context/appContext";

export default function Blog() {
    const { blogs: articles } = useAppContext();
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredArticles = activeCategory === "All"
        ? articles
        : articles.filter(art => art.category === activeCategory);

    // Neon Glow Color Maps by Category
    const getGlowStyles = (category: string) => {
        switch (category) {
            case "Engineering":
                return "hover:border-indigo-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)] focus-within:ring-2 focus-within:ring-indigo-500";
            case "Design":
                return "hover:border-purple-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] focus-within:ring-2 focus-within:ring-purple-500";
            case "Productivity":
                return "hover:border-pink-500 hover:shadow-[0_0_30px_rgba(236,72,153,0.1)] focus-within:ring-2 focus-within:ring-pink-500";
            case "Startup":
                return "hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] focus-within:ring-2 focus-within:ring-blue-500";
            default:
                return "hover:border-zinc-950 hover:shadow-[0_0_30px_rgba(24,24,27,0.1)] focus-within:ring-2 focus-within:ring-zinc-950";
        }
    };

    const getBadgeStyles = (category: string) => {
        switch (category) {
            case "Engineering": return "bg-indigo-50 text-indigo-700 border-indigo-100";
            case "Design": return "bg-purple-50 text-purple-700 border-purple-100";
            case "Productivity": return "bg-pink-50 text-pink-700 border-pink-100";
            case "Startup": return "bg-blue-50 text-blue-700 border-blue-100";
            default: return "bg-zinc-50 text-zinc-700 border-zinc-100";
        }
    };

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
                    <BookOpen size={14} />
                    <span>Nexion Insights</span>
                </motion.div>

                <motion.h1
                    className="relative z-10 text-4xl md:text-6xl font-medium leading-tight max-w-3xl text-white"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring" as const, stiffness: 240, damping: 70 }}
                >
                    Articles & Perspectives
                </motion.h1>

                <motion.p
                    className="relative z-10 mt-4 text-zinc-300 max-w-lg text-base leading-relaxed"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring" as const, stiffness: 320, damping: 70 }}
                >
                    Tech trends, UI/UX design tips, and software engineering insights from our product developers.
                </motion.p>
            </section>

            {/* ══ 2. CATEGORY TABS ═══════════════════════════════════════ */}
            <section className="pt-20 pb-6 px-4 md:px-16 lg:px-24 xl:px-32 w-full">
                <div className="max-w-7xl mx-auto flex flex-col items-center">
                    <motion.div 
                        className="flex flex-wrap items-center justify-center gap-2.5 p-1.5 bg-gray-50 border border-zinc-200/80 rounded-full w-fit"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        {blogCategories.map(cat => (
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

            {/* ══ 3. ARTICLES GRID (with Glow Effects) ══════════════════ */}
            <section className="pb-28 pt-6 px-4 md:px-16 lg:px-24 xl:px-32 w-full">
                <div className="max-w-6xl mx-auto">
                    <motion.div 
                        layout 
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredArticles.map((article) => (
                                <motion.div
                                    layout
                                    key={article.slug}
                                    initial={{ opacity: 0, scale: 0.96 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.96 }}
                                    transition={{ duration: 0.25 }}
                                    className="h-full block"
                                >
                                    <Link
                                        to={`/blog/${article.slug}`}
                                        className={`group flex flex-col h-full border border-zinc-200 rounded-2xl p-6 md:p-8 bg-white transition-all duration-300 outline-hidden hover:no-underline text-inherit cursor-pointer select-none ${getGlowStyles(article.category)}`}
                                    >
                                        {/* Badge and Metadata */}
                                        <div className="flex items-center justify-between gap-4 mb-6">
                                            <span className={`text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full border ${getBadgeStyles(article.category)}`}>
                                                {article.category}
                                            </span>
                                            <div className="flex items-center gap-3 text-xs text-zinc-400">
                                                <span className="flex items-center gap-1">
                                                    <Calendar size={12} />
                                                    <span>{article.date}</span>
                                                </span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1">
                                                    <Clock size={12} />
                                                    <span>{article.readTime}</span>
                                                </span>
                                            </div>
                                        </div>

                                        {/* Header Title */}
                                        <h3 className="text-xl md:text-2xl font-medium text-zinc-900 group-hover:text-zinc-950 transition-colors leading-tight">
                                            {article.title}
                                        </h3>
                                        <p className="text-zinc-500 text-sm leading-relaxed mt-3 mb-6 flex-1">
                                            {article.excerpt}
                                        </p>

                                        {/* Action link */}
                                        <div className="pt-4 border-t border-zinc-100 flex items-center justify-between mt-auto">
                                            <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-900 group-hover:text-zinc-950 transition-colors group/link cursor-pointer">
                                                <span>Read Article</span>
                                                <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}

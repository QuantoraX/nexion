import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Calendar, Clock, ShieldAlert } from "lucide-react";
import { useAppContext } from "../context/appContext";

export default function BlogDetails() {
    const { slug } = useParams<{ slug: string }>();
    const { blogs } = useAppContext();

    // Find article
    const article = blogs.find(a => a.slug === slug);

    // If article not found
    if (!article) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
                <div className="p-4 bg-red-50 text-red-600 rounded-full mb-6">
                    <ShieldAlert size={32} />
                </div>
                <h1 className="text-3xl font-medium text-zinc-900 mb-2">Article Not Found</h1>
                <p className="text-zinc-500 text-sm max-w-xs mb-8">
                    The article you are looking for does not exist or has been moved.
                </p>
                <Link to="/blog" className="bg-zinc-950 hover:bg-zinc-800 text-white text-sm px-6 py-3 rounded-full font-medium transition cursor-pointer">
                    Back to Blog
                </Link>
            </div>
        );
    }

    const getBadgeStyles = (category: string) => {
        switch (category) {
            case "Engineering": return "bg-indigo-50 text-indigo-700 border-indigo-150";
            case "Design": return "bg-purple-50 text-purple-700 border-purple-150";
            case "Productivity": return "bg-pink-50 text-pink-700 border-pink-150";
            case "Startup": return "bg-blue-50 text-blue-700 border-blue-150";
            default: return "bg-zinc-50 text-zinc-700 border-zinc-150";
        }
    };

    return (
        <div className="bg-white text-zinc-900 w-full overflow-x-hidden">

            {/* ══ 1. HERO HEADER ════════════════════════════════════════ */}
            <section 
                className="relative flex flex-col items-center justify-center min-h-[60vh] px-4 text-center overflow-hidden bg-black bg-cover bg-center"
                style={{ backgroundImage: `url(${article.image || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?fit=crop&w=1200&q=80"})` }}
            >
                <div className="absolute inset-0 bg-black/75 backdrop-blur-xs pointer-events-none" />

                <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                    <motion.div
                        className="bg-white/10 backdrop-blur border border-white/20 text-xs text-white px-4 py-1.5 rounded-full uppercase tracking-widest font-semibold mb-6 flex items-center gap-1.5"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70 }}
                    >
                        <BookOpen size={12} />
                        <span>{article.category} Insight</span>
                    </motion.div>

                    <motion.h1
                        className="text-3xl md:text-5xl font-medium leading-tight text-white mb-6 max-w-3xl"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 240, damping: 70 }}
                    >
                        {article.title}
                    </motion.h1>

                    <motion.div
                        className="flex flex-wrap items-center justify-center gap-6 text-zinc-300 text-xs md:text-sm mb-8"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 320, damping: 70 }}
                    >
                        <span className="flex items-center gap-1.5">
                            <Calendar size={13} />
                            <span>{article.date}</span>
                        </span>
                        <span className="text-zinc-500">•</span>
                        <span className="flex items-center gap-1.5">
                            <Clock size={13} />
                            <span>{article.readTime}</span>
                        </span>
                    </motion.div>

                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70 }}
                    >
                        <Link 
                            to="/blog" 
                            className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors"
                        >
                            <ArrowLeft size={16} />
                            <span>Back to Articles</span>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ══ 2. ARTICLE CONTENT ════════════════════════════════════ */}
            <section className="py-16 px-4 w-full bg-white">
                <div className="max-w-3xl mx-auto flex flex-col gap-8">
                    
                    {/* Article Cover Image Banner */}
                    {article.image && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="w-full h-72 md:h-100 rounded-2xl overflow-hidden shadow-lg border border-zinc-200 bg-zinc-900"
                        >
                            <img 
                                src={article.image} 
                                alt={article.title} 
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    )}
                    
                    {article.content.map((paragraph, index) => {
                        const isHeader = paragraph.endsWith(":");
                        if (isHeader) {
                            return (
                                <h2 key={index} className="text-xl md:text-2xl font-medium text-zinc-900 mt-6 pt-2 border-b border-zinc-100 pb-2">
                                    {paragraph.slice(0, -1)}
                                </h2>
                            );
                        }
                        return (
                            <p key={index} className="text-zinc-600 text-sm md:text-base leading-relaxed">
                                {paragraph}
                            </p>
                        );
                    })}

                    {/* Bottom nav */}
                    <div className="mt-16 pt-8 border-t border-zinc-200 flex items-center justify-between">
                        <Link 
                            to="/blog" 
                            className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 transition-colors text-sm"
                        >
                            <ArrowLeft size={16} />
                            <span>All Articles</span>
                        </Link>

                        <div className={`text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 border rounded-full ${getBadgeStyles(article.category)}`}>
                            {article.category} Insights
                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
}

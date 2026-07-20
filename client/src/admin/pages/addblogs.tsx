import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, BookOpen, Clock, Calendar } from "lucide-react";
import toast from "react-hot-toast";

// Database operations
import { getBlogArticles, saveBlogArticles, blogCategories, BlogArticle } from "../../data/blog-data";

export default function AddBlogs() {
    const [articles, setArticles] = useState<BlogArticle[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState<BlogArticle | null>(null);

    // Form inputs
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Engineering");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState(""); // Separated by double newlines in form textarea

    const loadArticles = () => {
        setArticles(getBlogArticles());
    };

    useEffect(() => {
        loadArticles();
    }, []);

    // Auto-generate slug from title
    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, "") // Remove special characters
            .replace(/[\s_]+/g, "-")  // Replace spaces/underscores with hyphens
            .replace(/^-+|-+$/g, ""); // Trim hyphens
    };

    // Auto-calculate read time based on word counts
    const calculateReadTime = (text: string) => {
        const wordsPerMinute = 200;
        const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;
        const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
        return `${minutes} min read`;
    };

    // Open add Form
    const openAddForm = () => {
        setEditingArticle(null);
        setTitle("");
        setCategory("Engineering");
        setExcerpt("");
        setContent("");
        setIsFormOpen(true);
    };

    // Open edit Form
    const openEditForm = (art: BlogArticle) => {
        setEditingArticle(art);
        setTitle(art.title);
        setCategory(art.category);
        setExcerpt(art.excerpt);
        // Combine paragraphs by double newlines for editing
        setContent(art.content.join("\n\n"));
        setIsFormOpen(true);
    };

    // Form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !category || !excerpt || !content) {
            toast.error("Please fill in all blog article fields.");
            return;
        }

        // Split text content area into paragraph lists, filtering empty ones
        const contentParagraphs = content
            .split("\n\n")
            .map(p => p.trim())
            .filter(p => p.length > 0);

        const readTimeCalculated = calculateReadTime(content);
        const slugGenerated = generateSlug(title);

        let updatedArticles = [...articles];

        if (editingArticle) {
            // EDIT ACTION
            updatedArticles = updatedArticles.map(art => {
                if (art.slug === editingArticle.slug) {
                    return {
                        ...art,
                        slug: slugGenerated, // Regenerate slug if title changed
                        category,
                        readTime: readTimeCalculated,
                        title,
                        excerpt,
                        content: contentParagraphs
                    };
                }
                return art;
            });
            toast.success("Blog article updated.");
        } else {
            // CREATE ACTION
            // Check for duplicate slug
            if (updatedArticles.some(a => a.slug === slugGenerated)) {
                toast.error("An article with this title already exists.");
                return;
            }

            const newArticle: BlogArticle = {
                slug: slugGenerated,
                category,
                readTime: readTimeCalculated,
                date: new Date().toLocaleDateString("en-US", {
                    month: "long",
                    day: "2-digit",
                    year: "numeric"
                }),
                title,
                excerpt,
                content: contentParagraphs
            };
            updatedArticles.unshift(newArticle);
            toast.success("Blog article published.");
        }

        saveBlogArticles(updatedArticles);
        loadArticles();
        setIsFormOpen(false);
    };

    // Delete Blog Post
    const handleDelete = (slug: string) => {
        if (!window.confirm("Are you sure you want to permanently delete this article?")) return;
        const updated = articles.filter(a => a.slug !== slug);
        saveBlogArticles(updated);
        loadArticles();
        toast.success("Article deleted successfully.");
    };

    const getBadgeStyles = (cat: string) => {
        switch (cat) {
            case "Engineering": return "bg-indigo-950/60 border-indigo-900 text-indigo-400";
            case "Design": return "bg-purple-950/60 border-purple-900 text-purple-400";
            case "Productivity": return "bg-pink-950/60 border-pink-900 text-pink-400";
            case "Startup": return "bg-blue-950/60 border-blue-900 text-blue-400";
            default: return "bg-zinc-900/60 border-zinc-850 text-zinc-400";
        }
    };

    return (
        <div className="flex flex-col gap-6 font-sans">
            {/* Header Controls */}
            <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-medium text-white">Articles & Insights Publisher</h2>
                    <p className="text-xs text-zinc-500">Draft, write, and manage dynamic blog insights for Nexion Solutions site readers.</p>
                </div>
                <button
                    onClick={openAddForm}
                    className="bg-white hover:bg-zinc-200 text-black text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                    <Plus size={14} />
                    <span>Create Article</span>
                </button>
            </div>

            {/* Articles List */}
            {articles.length === 0 ? (
                <div className="py-20 text-center border border-dashed border-zinc-900 rounded-2xl bg-zinc-900/10">
                    <BookOpen size={32} className="text-zinc-700 mx-auto mb-3" />
                    <h3 className="text-zinc-400 text-xs font-medium">No published articles</h3>
                    <p className="text-zinc-650 text-[10px] mt-1">Click the publish button to draft your first article.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    {articles.map((art) => (
                        <div key={art.slug} className="bg-zinc-900/30 border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between hover:border-zinc-850 transition-colors gap-6 relative group shadow-sm">
                            <div className="flex flex-col gap-4">
                                {/* Metadata headers */}
                                <div className="flex items-center justify-between gap-4 pr-16">
                                    <span className={`text-[9px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-md border ${getBadgeStyles(art.category)}`}>
                                        {art.category}
                                    </span>
                                    <div className="flex items-center gap-3 text-[10px] text-zinc-500">
                                        <span className="flex items-center gap-1">
                                            <Calendar size={11} />
                                            <span>{art.date}</span>
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <Clock size={11} />
                                            <span>{art.readTime}</span>
                                        </span>
                                    </div>
                                </div>

                                {/* Article details */}
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-sm font-semibold text-white group-hover:text-zinc-200 transition-colors leading-tight">
                                        {art.title}
                                    </h3>
                                    <p className="text-zinc-500 text-xs leading-relaxed line-clamp-3">
                                        {art.excerpt}
                                    </p>
                                    <span className="text-[9px] text-zinc-600 mt-1 uppercase font-semibold tracking-wider">
                                        {art.content.length} paragraphs written
                                    </span>
                                </div>
                            </div>

                            {/* View external preview */}
                            <div className="flex items-center justify-between border-t border-zinc-900/60 pt-4 mt-auto">
                                <a 
                                    href={`/blog/${art.slug}`} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="text-[10px] text-zinc-500 hover:text-white transition-colors"
                                >
                                    Preview Article Page →
                                </a>
                            </div>

                            {/* Absolute position controls */}
                            <div className="absolute top-6 right-6 flex items-center gap-1.5">
                                <button 
                                    onClick={() => openEditForm(art)}
                                    title="Edit article"
                                    className="size-7 rounded bg-zinc-950 border border-zinc-900 hover:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                                >
                                    <Edit2 size={11} />
                                </button>
                                <button 
                                    onClick={() => handleDelete(art.slug)}
                                    title="Delete permanently"
                                    className="size-7 rounded bg-zinc-950 border border-zinc-900 hover:border-red-950 flex items-center justify-center text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                                >
                                    <Trash2 size={11} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal Edit Overlay */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-zinc-900 border border-zinc-800 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[88vh]">
                        {/* Header */}
                        <div className="px-6 py-4 bg-zinc-950 border-b border-zinc-850 flex items-center justify-between">
                            <div className="flex flex-col">
                                <h3 className="text-sm font-semibold text-white">{editingArticle ? "Edit Blog Article" : "Create Blog Article"}</h3>
                                <span className="text-[10px] text-zinc-500">Slugs are auto-generated. Paragraphs are computed.</span>
                            </div>
                            <button 
                                onClick={() => setIsFormOpen(false)}
                                className="text-zinc-500 hover:text-white cursor-pointer"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="flex flex-col overflow-y-auto">
                            <div className="p-6 flex flex-col gap-4">
                                {/* Title */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">Article Title *</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="E.g. Building Scalable Web Apps with React 19"
                                        className="w-full bg-zinc-950 border border-zinc-850 hover:border-zinc-800 focus:border-zinc-700 text-zinc-150 rounded-lg px-4 py-2 text-xs focus:outline-none placeholder-zinc-650 transition-colors"
                                    />
                                    {title && (
                                        <span className="text-[9px] text-zinc-500">Slug path: <code className="text-zinc-400">/blog/{generateSlug(title)}</code></span>
                                    )}
                                </div>

                                {/* Category */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">Category *</label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full bg-zinc-950 border border-zinc-850 hover:border-zinc-800 focus:border-zinc-700 text-zinc-150 rounded-lg px-4 py-2 text-xs focus:outline-none cursor-pointer"
                                    >
                                        {blogCategories.filter(c => c !== "All").map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Excerpt */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">Summary Excerpt *</label>
                                    <textarea
                                        value={excerpt}
                                        onChange={(e) => setExcerpt(e.target.value)}
                                        rows={2}
                                        placeholder="Provide a short excerpt explaining what the article covers..."
                                        className="w-full bg-zinc-950 border border-zinc-850 hover:border-zinc-800 focus:border-zinc-700 text-zinc-150 rounded-lg px-4 py-2 text-xs focus:outline-none placeholder-zinc-650 transition-colors resize-none"
                                    />
                                </div>

                                {/* Content Paragraphs */}
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">Article Content *</label>
                                        {content && (
                                            <span className="text-[9px] text-zinc-500">{calculateReadTime(content)} calculated</span>
                                        )}
                                    </div>
                                    <textarea
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        rows={8}
                                        placeholder="Write paragraphs here. IMPORTANT: Separate each paragraph by a double enter (double line break) to keep layout split correctly. To make a section subheader, end the paragraph line with a colon (:)."
                                        className="w-full bg-zinc-950 border border-zinc-850 hover:border-zinc-800 focus:border-zinc-700 text-zinc-150 rounded-lg p-4 text-xs focus:outline-none placeholder-zinc-650 transition-colors resize-y min-h-[160px]"
                                    />
                                    <span className="text-[9px] text-zinc-550 leading-relaxed">
                                        Tip: Paragraphs ending with a colon (e.g. "Key Architectural Patterns:") render as bold headers on the details page.
                                    </span>
                                </div>
                            </div>

                            {/* Footer Submit */}
                            <div className="px-6 py-4 bg-zinc-950 border-t border-zinc-850 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsFormOpen(false)}
                                    className="bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-xs font-semibold px-4 py-2 rounded-lg text-zinc-400 hover:text-white transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-white hover:bg-zinc-200 text-black text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                                >
                                    {editingArticle ? "Save Draft" : "Publish Article"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

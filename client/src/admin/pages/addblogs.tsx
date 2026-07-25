import React, { useState } from "react";
import { Plus, Edit2, Trash2, X, BookOpen, Clock, Calendar, Camera } from "lucide-react";
import toast from "react-hot-toast";
import { blogCategories } from "../../data/blog-data";
import { useAppContext, BlogArticle } from "../../context/appContext";

export default function AddBlogs() {
    const { 
        blogs: articles, 
        addBlog, 
        updateBlog, 
        deleteBlog 
    } = useAppContext();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState<BlogArticle | null>(null);

    // Form inputs
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Engineering");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState(""); // Separated by double newlines in form textarea
    const [image, setImage] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);

    // Auto-generate slug from title
    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_]+/g, "-")
            .replace(/^-+|-+$/g, "");
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
        setImage("");
        setImageFile(null);
        setIsFormOpen(true);
    };

    // Open edit Form
    const openEditForm = (art: BlogArticle) => {
        setEditingArticle(art);
        setTitle(art.title);
        setCategory(art.category);
        setExcerpt(art.excerpt);
        setContent(art.content.join("\n\n"));
        setImage(art.image || "");
        setImageFile(null);
        setIsFormOpen(true);
    };

    // Form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !category || !excerpt || !content) {
            toast.error("Please fill in all blog article fields.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("category", category);
        formData.append("excerpt", excerpt);
        formData.append("content", content);

        if (imageFile) {
            formData.append("image", imageFile);
        } else if (image) {
            formData.append("image", image);
        }

        let success = false;
        if (editingArticle && editingArticle._id) {
            success = await updateBlog(editingArticle._id, formData);
        } else {
            success = await addBlog(formData);
        }

        if (success) {
            setIsFormOpen(false);
        }
    };

    // Delete blog article
    const handleDelete = async (id?: string) => {
        if (!id) return;
        if (!window.confirm("Are you sure you want to delete this article?")) return;
        await deleteBlog(id);
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
                <div className="py-20 text-center border border-dashed border-zinc-700/60 rounded-2xl bg-zinc-900/40">
                    <BookOpen size={32} className="text-zinc-600 mx-auto mb-3" />
                    <h3 className="text-zinc-300 text-xs font-semibold">No published articles</h3>
                    <p className="text-zinc-500 text-[10px] mt-1">Click the publish button to draft your first article.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    {articles.map((art) => (
                        <div key={art.slug} className="bg-zinc-900/60 border border-zinc-700/60 rounded-2xl overflow-hidden hover:border-zinc-500/80 transition-all flex flex-col justify-between relative group shadow-lg">
                            {art.image && (
                                <div className="h-36 bg-zinc-950 overflow-hidden relative border-b border-zinc-800">
                                    <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                                </div>
                            )}
                            <div className="p-6 flex flex-col justify-between flex-1 gap-6">
                                {/* Metadata headers */}
                                <div className="flex items-center justify-between gap-4 pr-16">
                                    <span className={`text-[9px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-md border ${getBadgeStyles(art.category)}`}>
                                        {art.category}
                                    </span>
                                    <div className="flex items-center gap-3 text-[10px] text-zinc-400 font-medium">
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
                                    <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors leading-tight">
                                        {art.title}
                                    </h3>
                                    <p className="text-zinc-300 text-xs leading-relaxed line-clamp-3">
                                        {art.excerpt}
                                    </p>
                                    <span className="text-[9px] text-zinc-400 mt-1 uppercase font-semibold tracking-wider">
                                        {art.content.length} paragraphs written
                                    </span>
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
                                    onClick={() => handleDelete(art._id || art.slug)}
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
                                    <label className="text-[10px] font-semibold tracking-widest text-zinc-400 uppercase">Article Title *</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="E.g. Building Scalable Web Apps with React 19"
                                        className="w-full bg-zinc-950/90 border border-zinc-800/80 hover:border-zinc-700 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/40 text-zinc-100 rounded-xl px-4 py-2.5 text-xs focus:outline-none placeholder-zinc-500 transition-all"
                                    />
                                    {title && (
                                        <span className="text-[9px] text-zinc-400">Slug path: <code className="text-indigo-400">/blog/{generateSlug(title)}</code></span>
                                    )}
                                </div>

                                {/* Category */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-semibold tracking-widest text-zinc-400 uppercase">Category *</label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full bg-zinc-950/90 border border-zinc-800/80 hover:border-zinc-700 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/40 text-zinc-100 rounded-xl px-4 py-2.5 text-xs focus:outline-none cursor-pointer"
                                    >
                                        {blogCategories.filter(c => c !== "All").map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Article Cover Image */}
                                <div className="flex flex-col gap-2 bg-zinc-950/60 p-3.5 rounded-xl border border-zinc-800/80">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[10px] font-semibold tracking-widest text-zinc-300 uppercase flex items-center gap-1.5">
                                            <Camera size={13} className="text-indigo-400" />
                                            <span>Article Cover Image</span>
                                        </label>
                                        <span className="text-[9px] font-medium text-emerald-400">
                                            {imageFile ? "File Picked" : image ? "Image URL Set" : "Default Placeholder"}
                                        </span>
                                    </div>

                                    {/* Live Preview */}
                                    {(image || imageFile) && (
                                        <div className="h-32 w-full rounded-lg overflow-hidden relative border border-zinc-750 bg-black">
                                            <img 
                                                src={imageFile ? URL.createObjectURL(imageFile) : image} 
                                                alt="Article preview" 
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-xs text-white text-[9px] font-semibold px-2 py-0.5 rounded border border-zinc-700">
                                                {imageFile ? "Manual File Upload" : "Image URL"}
                                            </div>
                                        </div>
                                    )}

                                    {/* File Picker */}
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[9px] text-zinc-400 font-medium">Option A: Upload Image File</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    setImageFile(e.target.files[0]);
                                                }
                                            }}
                                            className="text-[10px] text-zinc-400 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-[10px] file:font-semibold file:bg-zinc-800 file:text-zinc-200 hover:file:bg-zinc-700 cursor-pointer"
                                        />
                                    </div>

                                    {/* URL Input */}
                                    <div className="flex flex-col gap-1 mt-1">
                                        <span className="text-[9px] text-zinc-400 font-medium">Option B: Image URL / Unsplash Link</span>
                                        <input
                                            type="url"
                                            value={image}
                                            onChange={(e) => setImage(e.target.value)}
                                            placeholder="https://images.unsplash.com/photo-..."
                                            className="w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 focus:border-indigo-500 text-zinc-100 rounded-lg px-3 py-1.5 text-xs focus:outline-none placeholder-zinc-500"
                                        />
                                    </div>
                                </div>

                                {/* Excerpt */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-semibold tracking-widest text-zinc-400 uppercase">Summary Excerpt *</label>
                                    <textarea
                                        value={excerpt}
                                        onChange={(e) => setExcerpt(e.target.value)}
                                        rows={2}
                                        placeholder="Provide a short excerpt explaining what the article covers..."
                                        className="w-full bg-zinc-950/90 border border-zinc-800/80 hover:border-zinc-700 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/40 text-zinc-100 rounded-xl px-4 py-2.5 text-xs focus:outline-none placeholder-zinc-500 transition-all resize-none"
                                    />
                                </div>

                                {/* Content Paragraphs */}
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[10px] font-semibold tracking-widest text-zinc-400 uppercase">Article Content *</label>
                                        {content && (
                                            <span className="text-[9px] text-zinc-400">{calculateReadTime(content)} calculated</span>
                                        )}
                                    </div>
                                    <textarea
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        rows={8}
                                        placeholder="Write paragraphs here. IMPORTANT: Separate each paragraph by a double enter (double line break) to keep layout split correctly. To make a section subheader, end the paragraph line with a colon (:)."
                                        className="w-full bg-zinc-950/90 border border-zinc-800/80 hover:border-zinc-700 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/40 text-zinc-100 rounded-xl p-4 text-xs focus:outline-none placeholder-zinc-500 transition-all resize-y min-h-40"
                                    />
                                    <span className="text-[9px] text-zinc-500 leading-relaxed">
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

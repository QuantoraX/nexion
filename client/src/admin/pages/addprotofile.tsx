import React, { useState } from "react";
import { Plus, Edit2, Trash2, X, Briefcase, Calendar, ExternalLink, Camera, Globe, Loader2, Zap } from "lucide-react";
import toast from "react-hot-toast";
import { portfolioCategories } from "../../data/portfolio-data";
import { useAppContext, PortfolioProject } from "../../context/appContext";

export default function AddProtofile() {
    const { 
        projects, 
        addProject, 
        updateProject, 
        deleteProject,
        captureWebsiteScreenshot 
    } = useAppContext();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);

    // Form inputs
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("SaaS");
    const [subtitle, setSubtitle] = useState("");
    const [websiteUrl, setWebsiteUrl] = useState("");
    const [src, setSrc] = useState("");
    const [srcFile, setSrcFile] = useState<File | null>(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const [client, setClient] = useState("");
    const [date, setDate] = useState("");
    const [overview, setOverview] = useState("");
    const [challenge, setChallenge] = useState("");
    const [solution, setSolution] = useState("");
    const [techStackRaw, setTechStackRaw] = useState(""); // Comma separated

    // Details inputs (3 items)
    const [detTitle1, setDetTitle1] = useState("");
    const [detDesc1, setDetDesc1] = useState("");
    const [detTitle2, setDetTitle2] = useState("");
    const [detDesc2, setDetDesc2] = useState("");
    const [detTitle3, setDetTitle3] = useState("");
    const [detDesc3, setDetDesc3] = useState("");

    // Open add Form
    const openAddForm = () => {
        setEditingProject(null);
        setTitle("");
        setCategory("SaaS");
        setSubtitle("");
        setWebsiteUrl("");
        setSrc(""); 
        setSrcFile(null);
        setIsCapturing(false);
        setClient("");
        setDate("");
        setOverview("");
        setChallenge("");
        setSolution("");
        setTechStackRaw("");
        setDetTitle1("");
        setDetDesc1("");
        setDetTitle2("");
        setDetDesc2("");
        setDetTitle3("");
        setDetDesc3("");
        setIsFormOpen(true);
    };

    // Open edit Form
    const openEditForm = (proj: PortfolioProject) => {
        setEditingProject(proj);
        setTitle(proj.title);
        setCategory(proj.category);
        setSubtitle(proj.subtitle);
        setWebsiteUrl(proj.websiteUrl || "");
        setSrc(proj.src);
        setSrcFile(null);
        setIsCapturing(false);
        setClient(proj.client);
        setDate(proj.date);
        setOverview(proj.overview);
        setChallenge(proj.challenge);
        setSolution(proj.solution);
        setTechStackRaw(proj.techStack ? proj.techStack.join(", ") : "");

        // Map details arrays
        setDetTitle1(proj.details?.[0]?.title || "");
        setDetDesc1(proj.details?.[0]?.desc || "");
        setDetTitle2(proj.details?.[1]?.title || "");
        setDetDesc2(proj.details?.[1]?.desc || "");
        setDetTitle3(proj.details?.[2]?.title || "");
        setDetDesc3(proj.details?.[2]?.desc || "");
        
        setIsFormOpen(true);
    };

    // Capture website screenshot automatically & upload to Cloudinary
    const handleAutoScreenshot = async () => {
        if (!websiteUrl || !websiteUrl.trim()) {
            toast.error("Please enter a valid website URL first.");
            return;
        }
        setIsCapturing(true);
        const imageUrl = await captureWebsiteScreenshot(websiteUrl.trim());
        setIsCapturing(false);
        if (imageUrl) {
            setSrc(imageUrl);
            setSrcFile(null);
        }
    };

    // Submit handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !category || !subtitle || !client || !date || !overview || !challenge || !solution) {
            toast.error("Please fill in all general project fields.");
            return;
        }

        const detailsArray: { title: string; desc: string }[] = [];
        if (detTitle1 && detDesc1) detailsArray.push({ title: detTitle1, desc: detDesc1 });
        if (detTitle2 && detDesc2) detailsArray.push({ title: detTitle2, desc: detDesc2 });
        if (detTitle3 && detDesc3) detailsArray.push({ title: detTitle3, desc: detDesc3 });

        const formData = new FormData();
        formData.append("title", title);
        formData.append("category", category);
        formData.append("subtitle", subtitle);
        formData.append("websiteUrl", websiteUrl);
        formData.append("client", client);
        formData.append("date", date);
        formData.append("overview", overview);
        formData.append("challenge", challenge);
        formData.append("solution", solution);
        formData.append("techStack", techStackRaw);
        formData.append("details", JSON.stringify(detailsArray));

        if (srcFile) {
            formData.append("src", srcFile);
        } else if (src) {
            formData.append("src", src);
        }

        let success = false;
        if (editingProject && editingProject._id) {
            success = await updateProject(editingProject._id, formData);
        } else {
            success = await addProject(formData);
        }

        if (success) {
            setIsFormOpen(false);
        }
    };

    // Delete handler
    const handleDelete = async (id?: string) => {
        if (!id) return;
        if (!window.confirm("Are you sure you want to delete this case study?")) return;
        await deleteProject(id);
    };

    return (
        <div className="flex flex-col gap-6 font-sans">
            {/* Header row */}
            <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-medium text-white">Showcase Projects Board</h2>
                    <p className="text-xs text-zinc-500">Configure client projects, case studies, metadata features, and screenshots.</p>
                </div>
                <button
                    onClick={openAddForm}
                    className="bg-white hover:bg-zinc-200 text-black text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                    <Plus size={14} />
                    <span>Create Project</span>
                </button>
            </div>

            {/* List Grid */}
            {projects.length === 0 ? (
                <div className="py-20 text-center border border-dashed border-zinc-700/60 rounded-2xl bg-zinc-900/40">
                    <Briefcase size={32} className="text-zinc-600 mx-auto mb-3" />
                    <h3 className="text-zinc-300 text-xs font-semibold">No projects added yet</h3>
                    <p className="text-zinc-500 text-[10px] mt-1">Publish your first portfolio project case study.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                    {projects.map((proj) => (
                        <div key={proj.slug} className="bg-zinc-900/60 border border-zinc-700/60 rounded-2xl overflow-hidden hover:border-zinc-500/80 transition-all flex flex-col gap-4 relative group shadow-lg">
                            {/* Card Image banner */}
                            <div className="h-44 bg-zinc-950 overflow-hidden relative border-b border-zinc-700/60">
                                <img src={proj.src} alt={proj.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                                <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                                <span className="absolute bottom-3 left-4 text-[9px] font-bold uppercase tracking-widest bg-zinc-900/90 border border-zinc-750 px-2 py-0.5 rounded text-zinc-200">
                                    {proj.category}
                                </span>
                            </div>

                            {/* Info body */}
                            <div className="px-5 pb-5 flex flex-col gap-3 flex-1">
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-xs font-bold text-white leading-tight truncate">{proj.title}</h3>
                                    <span className="text-[10px] text-zinc-400 font-medium">{proj.subtitle}</span>
                                </div>
                                <p className="text-zinc-300 text-[11px] leading-relaxed line-clamp-3">
                                    {proj.overview}
                                </p>
                                
                                {/* Tags */}
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {proj.techStack.slice(0, 3).map(tag => (
                                        <span key={tag} className="text-[8px] bg-zinc-950 border border-zinc-750 px-2 py-0.5 rounded text-zinc-300 font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                    {proj.techStack.length > 3 && (
                                        <span className="text-[8px] bg-zinc-950 border border-zinc-750 px-2 py-0.5 rounded text-zinc-400 font-medium">
                                            +{proj.techStack.length - 3} more
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center justify-between border-t border-zinc-800 pt-3 mt-auto text-[10px] text-zinc-400">
                                    <div className="flex items-center gap-1">
                                        <Calendar size={11} />
                                        <span>{proj.date}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {proj.websiteUrl && (
                                            <a 
                                                href={proj.websiteUrl} 
                                                target="_blank" 
                                                rel="noreferrer" 
                                                className="text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5 font-semibold"
                                            >
                                                <Globe size={10} />
                                                <span>Live Site</span>
                                            </a>
                                        )}
                                        <a 
                                            href={`/portfolio/${proj.slug}`} 
                                            target="_blank" 
                                            rel="noreferrer" 
                                            className="hover:text-white flex items-center gap-0.5"
                                        >
                                            <span>Case Study</span>
                                            <ExternalLink size={10} />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Edit buttons hover absolute */}
                            <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                                <button 
                                    onClick={() => openEditForm(proj)}
                                    title="Edit project"
                                    className="size-7 rounded bg-zinc-950/90 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer shadow-md"
                                >
                                    <Edit2 size={11} />
                                </button>
                                <button 
                                    onClick={() => handleDelete(proj._id || proj.slug)}
                                    title="Delete project"
                                    className="size-7 rounded bg-zinc-950/90 border border-zinc-850 flex items-center justify-center text-zinc-500 hover:text-red-400 transition-colors cursor-pointer shadow-md"
                                >
                                    <Trash2 size={11} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal Form Dialog */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-zinc-900 border border-zinc-800 w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                        {/* Header */}
                        <div className="px-6 py-4 bg-zinc-950 border-b border-zinc-850 flex items-center justify-between">
                            <div className="flex flex-col">
                                <h3 className="text-sm font-semibold text-white">{editingProject ? "Edit Project Details" : "Create Showcase Project"}</h3>
                                <span className="text-[10px] text-zinc-500">Slugs are auto-generated. Define details and features.</span>
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
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* Left form column */}
                                <div className="flex flex-col gap-4">
                                    <h4 className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-850 pb-1.5 mb-1">General Settings</h4>
                                    
                                    {/* Title */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] font-semibold text-zinc-400 uppercase">Project Title *</label>
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="E.g. Aegis Analytics Dashboard"
                                            className="w-full bg-zinc-950/90 border border-zinc-800/80 hover:border-zinc-700 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/40 text-zinc-100 rounded-xl px-3.5 py-2 text-xs focus:outline-none placeholder-zinc-500 transition-all"
                                        />
                                    </div>

                                    {/* Category dropdown */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] font-semibold text-zinc-400 uppercase">Category *</label>
                                        <select
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="w-full bg-zinc-950/90 border border-zinc-800/80 hover:border-zinc-700 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/40 text-zinc-100 rounded-xl px-3.5 py-2 text-xs focus:outline-none cursor-pointer"
                                        >
                                            {portfolioCategories.filter(c => c !== "All").map(c => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Subtitle */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] font-semibold text-zinc-400 uppercase">Subtitle *</label>
                                        <input
                                            type="text"
                                            value={subtitle}
                                            onChange={(e) => setSubtitle(e.target.value)}
                                            placeholder="E.g. SaaS · Web App"
                                            className="w-full bg-zinc-950/90 border border-zinc-800/80 hover:border-zinc-700 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/40 text-zinc-100 rounded-xl px-3.5 py-2 text-xs focus:outline-none placeholder-zinc-500 transition-all"
                                        />
                                    </div>
                                    {/* Website URL & Auto Screenshot Generator */}
                                    <div className="flex flex-col gap-1.5 bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80">
                                        <div className="flex items-center justify-between">
                                            <label className="text-[10px] font-semibold text-zinc-300 uppercase flex items-center gap-1">
                                                <Globe size={12} className="text-indigo-400" />
                                                <span>Live Website URL</span>
                                            </label>
                                            <span className="text-[9px] text-zinc-500 font-normal">Auto Capture Available</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="url"
                                                value={websiteUrl}
                                                onChange={(e) => setWebsiteUrl(e.target.value)}
                                                placeholder="https://example.com"
                                                className="flex-1 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 focus:border-indigo-500 text-zinc-100 rounded-lg px-3 py-1.5 text-xs focus:outline-none placeholder-zinc-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleAutoScreenshot}
                                                disabled={isCapturing || !websiteUrl.trim()}
                                                className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer shadow-sm"
                                            >
                                                {isCapturing ? (
                                                    <>
                                                        <Loader2 size={12} className="animate-spin" />
                                                        <span>Capturing...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Zap size={12} />
                                                        <span>Auto Screenshot</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                        <p className="text-[9px] text-zinc-400 mt-0.5">
                                            Captures live full-page screenshot of site and uploads to Cloudinary automatically.
                                        </p>
                                    </div>

                                    {/* Image Src / Manual Upload Options */}
                                    <div className="flex flex-col gap-2 bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80">
                                        <div className="flex items-center justify-between">
                                            <label className="text-[10px] font-semibold text-zinc-300 uppercase flex items-center gap-1">
                                                <Camera size={12} className="text-zinc-400" />
                                                <span>Project Banner / Screenshot Image *</span>
                                            </label>
                                            <span className="text-[9px] font-medium text-emerald-400">
                                                {srcFile ? "File Selected" : src ? "Image Loaded" : "Pending"}
                                            </span>
                                        </div>

                                        {/* Live Preview box */}
                                        {(src || srcFile) && (
                                            <div className="h-28 w-full rounded-lg overflow-hidden relative border border-zinc-750 bg-black">
                                                <img 
                                                    src={srcFile ? URL.createObjectURL(srcFile) : src} 
                                                    alt="Preview" 
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-xs text-white text-[9px] font-semibold px-2 py-0.5 rounded border border-zinc-700">
                                                    {srcFile ? "Manual File Upload" : src.includes("cloudinary") ? "Cloudinary Screenshot" : "Custom Image URL"}
                                                </div>
                                            </div>
                                        )}

                                        {/* Manual File Pick */}
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[9px] text-zinc-400 font-medium">Option A: Upload Manual Photo File</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    if (e.target.files && e.target.files[0]) {
                                                        setSrcFile(e.target.files[0]);
                                                    }
                                                }}
                                                className="text-[10px] text-zinc-400 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-[10px] file:font-semibold file:bg-zinc-800 file:text-zinc-200 hover:file:bg-zinc-700 cursor-pointer"
                                            />
                                        </div>

                                        {/* Manual URL Input */}
                                        <div className="flex flex-col gap-1 mt-1">
                                            <span className="text-[9px] text-zinc-400 font-medium">Option B: Image URL / Cloudinary Link</span>
                                            <input
                                                type="url"
                                                value={src}
                                                onChange={(e) => setSrc(e.target.value)}
                                                placeholder="https://res.cloudinary.com/..."
                                                className="w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 focus:border-indigo-500 text-zinc-100 rounded-lg px-3 py-1.5 text-xs focus:outline-none placeholder-zinc-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Client and Date Grid */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[10px] font-semibold text-zinc-400 uppercase">Client *</label>
                                            <input
                                                type="text"
                                                value={client}
                                                onChange={(e) => setClient(e.target.value)}
                                                placeholder="E.g. Aegis Global Ltd"
                                                className="w-full bg-zinc-950/90 border border-zinc-800/80 hover:border-zinc-700 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/40 text-zinc-100 rounded-xl px-3.5 py-2 text-xs focus:outline-none placeholder-zinc-500 transition-all"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[10px] font-semibold text-zinc-400 uppercase">Launch Date *</label>
                                            <input
                                                type="text"
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                                placeholder="E.g. Sept 2025"
                                                className="w-full bg-zinc-950/90 border border-zinc-800/80 hover:border-zinc-700 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/40 text-zinc-100 rounded-xl px-3.5 py-2 text-xs focus:outline-none placeholder-zinc-500 transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] font-semibold text-zinc-400 uppercase">Tech Stack (comma separated) *</label>
                                        <input
                                            type="text"
                                            value={techStackRaw}
                                            onChange={(e) => setTechStackRaw(e.target.value)}
                                            placeholder="E.g. React, TypeScript, Node.js, WebSockets"
                                            className="w-full bg-zinc-950/90 border border-zinc-800/80 hover:border-zinc-700 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/40 text-zinc-100 rounded-xl px-3.5 py-2 text-xs focus:outline-none placeholder-zinc-500 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Right form column */}
                                <div className="flex flex-col gap-4">
                                    <h4 className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-800 pb-1.5 mb-1">Descriptions & Case Studies</h4>
                                    
                                    {/* Overview */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] font-semibold text-zinc-400 uppercase">Overview *</label>
                                        <textarea
                                            value={overview}
                                            onChange={(e) => setOverview(e.target.value)}
                                            rows={2}
                                            placeholder="Provide a general summary of the project..."
                                            className="w-full bg-zinc-950/90 border border-zinc-800/80 hover:border-zinc-700 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/40 text-zinc-100 rounded-xl p-3 text-xs focus:outline-none placeholder-zinc-500 transition-all resize-none"
                                        />
                                    </div>

                                    {/* Challenge */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] font-semibold text-zinc-400 uppercase">The Challenge *</label>
                                        <textarea
                                            value={challenge}
                                            onChange={(e) => setChallenge(e.target.value)}
                                            rows={2}
                                            placeholder="Explain the client pain points or obstacles..."
                                            className="w-full bg-zinc-950/90 border border-zinc-800/80 hover:border-zinc-700 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/40 text-zinc-100 rounded-xl p-3 text-xs focus:outline-none placeholder-zinc-500 transition-all resize-none"
                                        />
                                    </div>

                                    {/* Solution */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] font-semibold text-zinc-400 uppercase">Our Solution *</label>
                                        <textarea
                                            value={solution}
                                            onChange={(e) => setSolution(e.target.value)}
                                            rows={2}
                                            placeholder="Detail visual, technical, and database patterns engineered..."
                                            className="w-full bg-zinc-950/90 border border-zinc-800/80 hover:border-zinc-700 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/40 text-zinc-100 rounded-xl p-3 text-xs focus:outline-none placeholder-zinc-500 transition-all resize-none"
                                        />
                                    </div>

                                    {/* Detail list points */}
                                    <div className="flex flex-col gap-2 mt-1">
                                        <label className="text-[10px] font-semibold text-zinc-400 uppercase">Key metrics / features (Max 3 points)</label>
                                        
                                        {/* Point 1 */}
                                        <div className="flex flex-col gap-1 border-l-2 border-indigo-500/50 pl-3">
                                            <input
                                                type="text"
                                                value={detTitle1}
                                                onChange={(e) => setDetTitle1(e.target.value)}
                                                placeholder="Metric 1: e.g. Real-time Streaming"
                                                className="bg-zinc-950/90 border border-zinc-800/80 hover:border-zinc-700 focus:border-indigo-500/80 text-zinc-100 rounded-lg px-3 py-1.5 text-[11px] focus:outline-none"
                                            />
                                            <input
                                                type="text"
                                                value={detDesc1}
                                                onChange={(e) => setDetDesc1(e.target.value)}
                                                placeholder="Description 1: e.g. Configured sub-100ms rendering."
                                                className="bg-zinc-950/90 border border-zinc-800/80 hover:border-zinc-700 focus:border-indigo-500/80 text-zinc-300 rounded-lg px-3 py-1.5 text-[11px] focus:outline-none mt-1"
                                            />
                                        </div>

                                        {/* Point 2 */}
                                        <div className="flex flex-col gap-1 border-l-2 border-indigo-500/50 pl-3 mt-1">
                                            <input
                                                type="text"
                                                value={detTitle2}
                                                onChange={(e) => setDetTitle2(e.target.value)}
                                                placeholder="Metric 2: e.g. Encryption Security"
                                                className="bg-zinc-950/90 border border-zinc-800/80 hover:border-zinc-700 focus:border-indigo-500/80 text-zinc-100 rounded-lg px-3 py-1.5 text-[11px] focus:outline-none"
                                            />
                                            <input
                                                type="text"
                                                value={detDesc2}
                                                onChange={(e) => setDetDesc2(e.target.value)}
                                                placeholder="Description 2: e.g. Encrypted ledger using SQLite."
                                                className="bg-zinc-950/90 border border-zinc-800/80 hover:border-zinc-700 focus:border-indigo-500/80 text-zinc-300 rounded-lg px-3 py-1.5 text-[11px] focus:outline-none mt-1"
                                            />
                                        </div>

                                        {/* Point 3 */}
                                        <div className="flex flex-col gap-1 border-l-2 border-indigo-500/50 pl-3 mt-1">
                                            <input
                                                type="text"
                                                value={detTitle3}
                                                onChange={(e) => setDetTitle3(e.target.value)}
                                                placeholder="Metric 3: e.g. Localized Checkout"
                                                className="bg-zinc-950/90 border border-zinc-800/80 hover:border-zinc-700 focus:border-indigo-500/80 text-zinc-100 rounded-lg px-3 py-1.5 text-[11px] focus:outline-none"
                                            />
                                            <input
                                                type="text"
                                                value={detDesc3}
                                                onChange={(e) => setDetDesc3(e.target.value)}
                                                placeholder="Description 3: e.g. Dynamic IP currency checkout."
                                                className="bg-zinc-950/90 border border-zinc-800/80 hover:border-zinc-700 focus:border-indigo-500/80 text-zinc-300 rounded-lg px-3 py-1.5 text-[11px] focus:outline-none mt-1"
                                            />
                                        </div>
                                    </div>
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
                                    {editingProject ? "Save Project" : "Publish Project"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

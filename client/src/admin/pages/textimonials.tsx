import React, { useState } from "react";
import { Plus, Edit2, Trash2, X, Star, Camera } from "lucide-react";
import toast from "react-hot-toast";
import { useAppContext, TestimonialItem } from "../../context/appContext";

export default function Textimonials() {
    const {
        testimonialsCol1: col1,
        testimonialsCol2: col2,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial
    } = useAppContext();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<(TestimonialItem & { originalCol: number }) | null>(null);

    // Form inputs
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [text, setText] = useState("");
    const [targetCol, setTargetCol] = useState(1);

    // Set up adding new review
    const openAddForm = () => {
        setEditingItem(null);
        setName("");
        setLocation("");
        setAvatar("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fit=crop&w=120&h=120&q=80");
        setAvatarFile(null);
        setText("");
        setTargetCol(1);
        setIsFormOpen(true);
    };

    // Set up editing review
    const openEditForm = (item: TestimonialItem, colNum: number) => {
        setEditingItem({ ...item, originalCol: colNum });
        setName(item.name);
        setLocation(item.location);
        setAvatar(item.avatar);
        setAvatarFile(null);
        setText(item.text);
        setTargetCol(colNum);
        setIsFormOpen(true);
    };

    // Form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !location || !text) {
            toast.error("Please fill in all testimonial fields.");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("location", location);
        formData.append("text", text);
        formData.append("column", String(targetCol));

        if (avatarFile) {
            formData.append("avatar", avatarFile);
        } else if (avatar) {
            formData.append("avatar", avatar);
        }

        let success = false;
        const id = editingItem?._id || editingItem?.id;

        if (editingItem && id) {
            success = await updateTestimonial(id, formData);
        } else {
            success = await addTestimonial(formData);
        }

        if (success) {
            setIsFormOpen(false);
        }
    };

    // Delete testimonial review
    const handleDelete = async (id: string | undefined) => {
        if (!id) return;
        if (!window.confirm("Are you sure you want to delete this review?")) return;
        await deleteTestimonial(id);
    };

    return (
        <div className="flex flex-col gap-6 font-sans">
            {/* Top row */}
            <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-medium text-white">Client Reviews Board</h2>
                    <p className="text-xs text-zinc-500">Add, edit, or delete customer reviews displayed in the homepage scroller columns.</p>
                </div>
                <button
                    onClick={openAddForm}
                    className="bg-white hover:bg-zinc-200 text-black text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                    <Plus size={14} />
                    <span>Create Testimonial</span>
                </button>
            </div>

            {/* Testimonials Listing Grid Split by Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
                {/* Column 1 Display */}
                <div className="flex flex-col gap-4 bg-zinc-900/60 border border-zinc-700/60 p-5 rounded-2xl shadow-lg">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-800 pb-3">Marquee Column 1 ({col1.length})</h3>
                    {col1.length === 0 ? (
                        <span className="text-xs text-zinc-500 py-6 text-center border border-dashed border-zinc-700/60 rounded-xl">No reviews in Column 1.</span>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {col1.map((item) => (
                                <div key={item.id} className="bg-zinc-950/70 border border-zinc-800 hover:border-zinc-700 p-5 rounded-xl flex flex-col gap-4 relative group shadow-sm transition-colors">
                                    <div className="flex items-center gap-3">
                                        <img src={item.avatar} alt={item.name} className="size-10 rounded-full object-cover border border-zinc-700/60" />
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-white">{item.name}</span>
                                            <span className="text-[10px] text-zinc-400 font-medium mt-0.5">{item.location}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-0.5">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="size-3 fill-orange-400 text-orange-400" />)}
                                    </div>
                                    <p className="text-xs text-zinc-300 leading-relaxed">{item.text}</p>
                                    
                                    {/* Edit controls hover */}
                                    <div className="absolute top-4 right-4 flex items-center gap-1">
                                        <button 
                                            onClick={() => openEditForm(item, 1)}
                                            className="size-7 rounded-lg bg-zinc-900 border border-zinc-750 flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
                                        >
                                            <Edit2 size={11} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(item._id || item.id)}
                                            className="size-7 rounded-lg bg-zinc-900 border border-zinc-750 flex items-center justify-center text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
                                        >
                                            <Trash2 size={11} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Column 2 Display */}
                <div className="flex flex-col gap-4 bg-zinc-900/60 border border-zinc-700/60 p-5 rounded-2xl shadow-lg">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-800 pb-3">Marquee Column 2 ({col2.length})</h3>
                    {col2.length === 0 ? (
                        <span className="text-xs text-zinc-500 py-6 text-center border border-dashed border-zinc-700/60 rounded-xl">No reviews in Column 2.</span>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {col2.map((item) => (
                                <div key={item.id} className="bg-zinc-950/70 border border-zinc-800 hover:border-zinc-700 p-5 rounded-xl flex flex-col gap-4 relative group shadow-sm transition-colors">
                                    <div className="flex items-center gap-3">
                                        <img src={item.avatar} alt={item.name} className="size-10 rounded-full object-cover border border-zinc-850" />
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-white">{item.name}</span>
                                            <span className="text-[10px] text-zinc-500 mt-0.5">{item.location}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-0.5">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="size-3 fill-orange-400 text-orange-400" />)}
                                    </div>
                                    <p className="text-xs text-zinc-400 leading-relaxed">{item.text}</p>
                                    
                                    {/* Edit controls hover */}
                                    <div className="absolute top-4 right-4 flex items-center gap-1">
                                        <button 
                                            onClick={() => openEditForm(item, 2)}
                                            className="size-7 rounded bg-zinc-950 border border-zinc-850 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                                        >
                                            <Edit2 size={11} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(item._id || item.id)}
                                            className="size-7 rounded bg-zinc-950 border border-zinc-850 flex items-center justify-center text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                                        >
                                            <Trash2 size={11} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Form Overlay */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
                        {/* Header */}
                        <div className="px-6 py-4 bg-zinc-950 border-b border-zinc-850 flex items-center justify-between">
                            <div className="flex flex-col">
                                <h3 className="text-sm font-semibold text-white">{editingItem ? "Edit Testimonial Review" : "Add Testimonial Review"}</h3>
                                <span className="text-[10px] text-zinc-500">Provide details for display in review marquees.</span>
                            </div>
                            <button 
                                onClick={() => setIsFormOpen(false)}
                                className="text-zinc-500 hover:text-white cursor-pointer"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Form Body */}
                        <form onSubmit={handleSubmit} className="flex flex-col overflow-y-auto">
                            <div className="p-6 flex flex-col gap-4">
                                {/* Name Input */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-semibold tracking-widest text-zinc-400 uppercase">Client Name *</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="E.g. Sarah Thompson"
                                        className="w-full bg-zinc-950/90 border border-zinc-800/80 hover:border-zinc-700 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/40 text-zinc-100 rounded-xl px-4 py-2.5 text-xs focus:outline-none placeholder-zinc-500 transition-all"
                                    />
                                </div>

                                {/* Location/Position Input */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-semibold tracking-widest text-zinc-400 uppercase">Position & Company *</label>
                                    <input
                                        type="text"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder="E.g. Founder, Bloom Digital"
                                        className="w-full bg-zinc-950/90 border border-zinc-800/80 hover:border-zinc-700 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/40 text-zinc-100 rounded-xl px-4 py-2.5 text-xs focus:outline-none placeholder-zinc-500 transition-all"
                                    />
                                </div>

                                {/* Avatar Image Upload Container */}
                                <div className="flex flex-col gap-2 bg-zinc-950/60 p-3.5 rounded-xl border border-zinc-800/80">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[10px] font-semibold tracking-widest text-zinc-300 uppercase flex items-center gap-1.5">
                                            <Camera size={13} className="text-indigo-400" />
                                            <span>Client Avatar Picture</span>
                                        </label>
                                        <span className="text-[9px] font-medium text-emerald-400">
                                            {avatarFile ? "File Picked" : avatar ? "Avatar Set" : "Pending"}
                                        </span>
                                    </div>

                                    {/* Live Circle Preview */}
                                    {(avatar || avatarFile) && (
                                        <div className="flex items-center gap-3 p-2 bg-zinc-900 rounded-lg border border-zinc-800">
                                            <img 
                                                src={avatarFile ? URL.createObjectURL(avatarFile) : avatar} 
                                                alt="Avatar preview" 
                                                className="size-12 rounded-full object-cover border border-zinc-700 shadow-sm"
                                            />
                                            <div className="flex flex-col">
                                                <span className="text-xs font-semibold text-white">{name || "Client Name"}</span>
                                                <span className="text-[10px] text-zinc-400">{location || "Position & Company"}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* File Picker */}
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[9px] text-zinc-400 font-medium">Option A: Upload Avatar Photo File</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    setAvatarFile(e.target.files[0]);
                                                }
                                            }}
                                            className="text-[10px] text-zinc-400 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-[10px] file:font-semibold file:bg-zinc-800 file:text-zinc-200 hover:file:bg-zinc-700 cursor-pointer"
                                        />
                                    </div>

                                    {/* URL Input */}
                                    <div className="flex flex-col gap-1 mt-1">
                                        <span className="text-[9px] text-zinc-400 font-medium">Option B: Avatar Image URL / Cloudinary Link</span>
                                        <input
                                            type="url"
                                            value={avatar}
                                            onChange={(e) => setAvatar(e.target.value)}
                                            placeholder="https://images.unsplash.com/photo-..."
                                            className="w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 focus:border-indigo-500 text-zinc-100 rounded-lg px-3 py-1.5 text-xs focus:outline-none placeholder-zinc-500"
                                        />
                                    </div>
                                </div>

                                {/* Text Area content */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-semibold tracking-widest text-zinc-400 uppercase">Review Text *</label>
                                    <textarea
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        rows={4}
                                        placeholder="Write the user experience details..."
                                        className="w-full bg-zinc-950/90 border border-zinc-800/80 hover:border-zinc-700 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/40 text-zinc-100 rounded-xl px-4 py-2.5 text-xs focus:outline-none placeholder-zinc-500 transition-all resize-none"
                                    />
                                </div>

                                {/* Column Selection Dropdown */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-semibold tracking-widest text-zinc-400 uppercase">Target display Column *</label>
                                    <select
                                        value={targetCol}
                                        onChange={(e) => setTargetCol(Number(e.target.value))}
                                        className="w-full bg-zinc-950/90 border border-zinc-800/80 hover:border-zinc-700 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/40 text-zinc-100 rounded-xl px-4 py-2.5 text-xs focus:outline-none cursor-pointer"
                                    >
                                        <option value={1}>Column 1 (Scrolls Upwards)</option>
                                        <option value={2}>Column 2 (Scrolls Downwards)</option>
                                    </select>
                                </div>
                            </div>

                            {/* Footer Submit */}
                            <div className="px-6 py-4 bg-zinc-950 border-t border-zinc-850 flex justify-end gap-3.5">
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
                                    {editingItem ? "Save Changes" : "Create Review"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

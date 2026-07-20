import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Star } from "lucide-react";
import toast from "react-hot-toast";

// Database operations
import { getTestimonialsCol1, getTestimonialsCol2, saveTestimonials, TestimonialItem } from "../../data/data";

export default function Textimonials() {
    const [col1, setCol1] = useState<TestimonialItem[]>([]);
    const [col2, setCol2] = useState<TestimonialItem[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<(TestimonialItem & { originalCol: number }) | null>(null);

    // Form inputs
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [avatar, setAvatar] = useState("");
    const [text, setText] = useState("");
    const [targetCol, setTargetCol] = useState(1);

    const loadTestimonials = () => {
        setCol1(getTestimonialsCol1());
        setCol2(getTestimonialsCol2());
    };

    useEffect(() => {
        loadTestimonials();
    }, []);

    // Set up adding new review
    const openAddForm = () => {
        setEditingItem(null);
        setName("");
        setLocation("");
        setAvatar("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fit=crop&w=120&h=120&q=80");
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
        setText(item.text);
        setTargetCol(colNum);
        setIsFormOpen(true);
    };

    // Form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !location || !avatar || !text) {
            toast.error("Please fill in all testimonial fields.");
            return;
        }

        let updatedCol1 = [...col1];
        let updatedCol2 = [...col2];

        if (editingItem) {
            // EDIT ACTION
            const updatedItem: TestimonialItem = {
                id: editingItem.id,
                name,
                location,
                avatar,
                text
            };

            // Remove from original column
            if (editingItem.originalCol === 1) {
                updatedCol1 = updatedCol1.filter(i => i.id !== editingItem.id);
            } else {
                updatedCol2 = updatedCol2.filter(i => i.id !== editingItem.id);
            }

            // Insert into selected target column
            if (targetCol === 1) {
                updatedCol1.push(updatedItem);
            } else {
                updatedCol2.push(updatedItem);
            }

            toast.success("Testimonial review updated.");
        } else {
            // CREATE ACTION
            const newItem: TestimonialItem = {
                id: "t_" + Date.now(),
                name,
                location,
                avatar,
                text
            };

            if (targetCol === 1) {
                updatedCol1.push(newItem);
            } else {
                updatedCol2.push(newItem);
            }

            toast.success("New testimonial review created.");
        }

        // Save
        saveTestimonials(updatedCol1, updatedCol2);
        loadTestimonials();
        setIsFormOpen(false);
    };

    // Delete testimonial review
    const handleDelete = (id: string | undefined, colNum: number) => {
        if (!id) return;
        if (!window.confirm("Are you sure you want to delete this review?")) return;

        let updatedCol1 = [...col1];
        let updatedCol2 = [...col2];

        if (colNum === 1) {
            updatedCol1 = updatedCol1.filter(i => i.id !== id);
        } else {
            updatedCol2 = updatedCol2.filter(i => i.id !== id);
        }

        saveTestimonials(updatedCol1, updatedCol2);
        loadTestimonials();
        toast.success("Review deleted successfully.");
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
                <div className="flex flex-col gap-4 bg-zinc-900/10 border border-zinc-900 p-5 rounded-2xl">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 border-b border-zinc-900 pb-3">Marquee Column 1 ({col1.length})</h3>
                    {col1.length === 0 ? (
                        <span className="text-xs text-zinc-600 py-6 text-center border border-dashed border-zinc-850 rounded-xl">No reviews in Column 1.</span>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {col1.map((item) => (
                                <div key={item.id} className="bg-zinc-900/40 border border-zinc-900 p-5 rounded-xl flex flex-col gap-4 relative group">
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
                                            onClick={() => openEditForm(item, 1)}
                                            className="size-7 rounded bg-zinc-950 border border-zinc-850 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                                        >
                                            <Edit2 size={11} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(item.id, 1)}
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

                {/* Column 2 Display */}
                <div className="flex flex-col gap-4 bg-zinc-900/10 border border-zinc-900 p-5 rounded-2xl">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 border-b border-zinc-900 pb-3">Marquee Column 2 ({col2.length})</h3>
                    {col2.length === 0 ? (
                        <span className="text-xs text-zinc-600 py-6 text-center border border-dashed border-zinc-850 rounded-xl">No reviews in Column 2.</span>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {col2.map((item) => (
                                <div key={item.id} className="bg-zinc-900/40 border border-zinc-900 p-5 rounded-xl flex flex-col gap-4 relative group">
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
                                            onClick={() => handleDelete(item.id, 2)}
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
                                    <label className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">Client Name *</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="E.g. Sarah Thompson"
                                        className="w-full bg-zinc-950 border border-zinc-850 hover:border-zinc-800 focus:border-zinc-700 text-zinc-150 rounded-lg px-4 py-2 text-xs focus:outline-none placeholder-zinc-650 transition-colors"
                                    />
                                </div>

                                {/* Location/Position Input */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">Position & Company *</label>
                                    <input
                                        type="text"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder="E.g. Founder, Bloom Digital"
                                        className="w-full bg-zinc-950 border border-zinc-850 hover:border-zinc-800 focus:border-zinc-700 text-zinc-150 rounded-lg px-4 py-2 text-xs focus:outline-none placeholder-zinc-650 transition-colors"
                                    />
                                </div>

                                {/* Avatar Image Link */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">Avatar Picture Link *</label>
                                    <input
                                        type="url"
                                        value={avatar}
                                        onChange={(e) => setAvatar(e.target.value)}
                                        placeholder="https://images.unsplash.com/..."
                                        className="w-full bg-zinc-950 border border-zinc-850 hover:border-zinc-800 focus:border-zinc-700 text-zinc-150 rounded-lg px-4 py-2 text-xs focus:outline-none placeholder-zinc-650 transition-colors"
                                    />
                                    <span className="text-[9px] text-zinc-550">Recommended: 120x120px square shape image URL.</span>
                                </div>

                                {/* Text Area content */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">Review Text *</label>
                                    <textarea
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        rows={4}
                                        placeholder="Write the user experience details..."
                                        className="w-full bg-zinc-950 border border-zinc-850 hover:border-zinc-800 focus:border-zinc-700 text-zinc-150 rounded-lg px-4 py-2.5 text-xs focus:outline-none placeholder-zinc-650 transition-colors resize-none"
                                    />
                                </div>

                                {/* Column Selection Dropdown */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">Target display Column *</label>
                                    <select
                                        value={targetCol}
                                        onChange={(e) => setTargetCol(Number(e.target.value))}
                                        className="w-full bg-zinc-950 border border-zinc-850 hover:border-zinc-800 focus:border-zinc-700 text-zinc-150 rounded-lg px-4 py-2 text-xs focus:outline-none cursor-pointer"
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

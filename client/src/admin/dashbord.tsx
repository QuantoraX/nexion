import { useState } from "react";
import { Link } from "react-router-dom";
import { 
    Briefcase, 
    BookOpen, 
    MessageSquare, 
    Inbox, 
    ArrowRight,
    Eye,
    CheckCircle,
    Trash2
} from "lucide-react";
import { useAppContext, ContactSubmission } from "../context/appContext";

export default function Dashboard() {
    const { 
        blogs, 
        projects, 
        testimonials, 
        inquiries, 
        toggleInquiryStatus, 
        deleteInquiry 
    } = useAppContext();

    const [activeInquiry, setActiveInquiry] = useState<ContactSubmission | null>(null);

    const newInquiriesCount = inquiries.filter(s => s.status === "new").length;
    const recentInquiries = inquiries.slice(0, 4);

    // Change Inquiry status
    const toggleStatus = async (id?: string) => {
        if (!id) return;
        await toggleInquiryStatus(id);
    };

    // Delete submission
    const handleDeleteInquiry = async (id?: string) => {
        if (!id) return;
        if (!window.confirm("Are you sure you want to delete this message?")) return;
        await deleteInquiry(id);
    };

    // Open read modal
    const viewMessage = (inquiry: ContactSubmission) => {
        setActiveInquiry(inquiry);
        if (inquiry.status === "new" && (inquiry._id || inquiry.id)) {
            toggleInquiryStatus((inquiry._id || inquiry.id)!);
        }
    };

    return (
        <div className="flex flex-col gap-8 font-sans">
            {/* Greeting Banner */}
            <div className="flex flex-col gap-1">
                <h2 className="text-xl font-medium text-white">System Controls Dashboard</h2>
                <p className="text-xs text-zinc-500">Monitor inquiries, modify portfolios, and write dynamic articles.</p>
            </div>

            {/* Metrics cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* 1. Projects Count */}
                <div className="bg-zinc-900/70 border border-zinc-700/60 rounded-2xl p-5 flex items-center gap-5 hover:border-zinc-500/80 transition-all shadow-md">
                    <div className="size-11 rounded-xl bg-indigo-950/60 border border-indigo-700/50 flex items-center justify-center text-indigo-300 shadow-inner">
                        <Briefcase size={20} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">PORTFOLIO</span>
                        <span className="text-2xl font-bold text-white mt-0.5">{projects.length}</span>
                        <span className="text-[10px] text-zinc-400 font-medium mt-0.5">Projects showcased</span>
                    </div>
                </div>

                {/* 2. Blog Articles Count */}
                <div className="bg-zinc-900/70 border border-zinc-700/60 rounded-2xl p-5 flex items-center gap-5 hover:border-zinc-500/80 transition-all shadow-md">
                    <div className="size-11 rounded-xl bg-purple-950/60 border border-purple-700/50 flex items-center justify-center text-purple-300 shadow-inner">
                        <BookOpen size={20} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">BLOG POSTS</span>
                        <span className="text-2xl font-bold text-white mt-0.5">{blogs.length}</span>
                        <span className="text-[10px] text-zinc-400 font-medium mt-0.5">Articles published</span>
                    </div>
                </div>

                {/* 3. Testimonials Count */}
                <div className="bg-zinc-900/70 border border-zinc-700/60 rounded-2xl p-5 flex items-center gap-5 hover:border-zinc-500/80 transition-all shadow-md">
                    <div className="size-11 rounded-xl bg-orange-950/60 border border-orange-700/50 flex items-center justify-center text-orange-300 shadow-inner">
                        <MessageSquare size={20} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">REVIEWS</span>
                        <span className="text-2xl font-bold text-white mt-0.5">{testimonials.length}</span>
                        <span className="text-[10px] text-zinc-400 font-medium mt-0.5">Client reviews</span>
                    </div>
                </div>

                {/* 4. Contact Inquiries */}
                <div className="bg-zinc-900/70 border border-zinc-700/60 rounded-2xl p-5 flex items-center gap-5 hover:border-zinc-500/80 transition-all shadow-md">
                    <div className="size-11 rounded-xl bg-emerald-950/60 border border-emerald-700/50 flex items-center justify-center text-emerald-300 relative shadow-inner">
                        <Inbox size={20} />
                        {newInquiriesCount > 0 && (
                            <span className="absolute -top-1 -right-1 size-4 bg-emerald-400 text-zinc-950 font-bold text-[9px] rounded-full flex items-center justify-center animate-pulse">
                                {newInquiriesCount}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">INQUIRIES</span>
                        <span className="text-2xl font-bold text-white mt-0.5">{inquiries.length}</span>
                        <span className="text-[10px] text-emerald-400 font-bold mt-0.5">{newInquiriesCount} new messages</span>
                    </div>
                </div>
            </div>

            {/* Main Area: Split layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left block (Recent Inquiries) */}
                <div className="lg:col-span-2 bg-zinc-900/60 border border-zinc-700/60 rounded-2xl p-6 flex flex-col gap-5 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <h3 className="text-sm font-bold text-white">Recent Customer Messages</h3>
                            <span className="text-[10px] text-zinc-400">Form submissions from homepage & contact page.</span>
                        </div>
                        <Link to="/admin/contact" className="text-xs text-zinc-300 hover:text-white flex items-center gap-1 bg-zinc-800/80 px-3 py-1.5 rounded-lg border border-zinc-700/50 transition-colors">
                            <span>View Inbox</span>
                            <ArrowRight size={13} />
                        </Link>
                    </div>

                    {/* Table View */}
                    {recentInquiries.length === 0 ? (
                        <div className="py-12 text-center text-xs text-zinc-500 border border-dashed border-zinc-700/60 rounded-xl">
                            No inquiries recorded in database yet.
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2.5">
                            {recentInquiries.map((inq) => (
                                <div key={inq.id} className="bg-zinc-950/70 border border-zinc-800 hover:border-zinc-700 p-4 rounded-xl flex items-center justify-between gap-4 transition-colors">
                                    <div className="flex flex-col gap-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-semibold text-zinc-200 truncate">{inq.name}</span>
                                            {inq.status === "new" && (
                                                <span className="bg-emerald-950/60 border border-emerald-900 text-emerald-400 text-[8px] font-bold px-1.5 py-0.5 rounded-md uppercase">NEW</span>
                                            )}
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2 text-[10px] text-zinc-500">
                                            <span className="truncate">{inq.email}</span>
                                            <span>•</span>
                                            <span className="bg-zinc-950 px-2 py-0.5 rounded border border-zinc-900 text-zinc-400">{inq.projectType}</span>
                                            <span>•</span>
                                            <span>{inq.date}</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-1.5">
                                        <button 
                                            onClick={() => viewMessage(inq)}
                                            title="View message"
                                            className="size-7 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-900 hover:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                                        >
                                            <Eye size={12} />
                                        </button>
                                        <button 
                                            onClick={() => toggleStatus(inq._id || inq.id)}
                                            title={inq.status === "new" ? "Mark read" : "Mark unread"}
                                            className={`size-7 rounded-lg border flex items-center justify-center transition-colors cursor-pointer ${
                                                inq.status === "new"
                                                    ? "bg-zinc-950 hover:bg-emerald-950 border-zinc-900 hover:border-emerald-900 text-zinc-400 hover:text-emerald-400"
                                                    : "bg-emerald-950 border-emerald-900 text-emerald-400"
                                            }`}
                                        >
                                            <CheckCircle size={12} />
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteInquiry(inq._id || inq.id)}
                                            title="Delete"
                                            className="size-7 rounded-lg bg-zinc-950 hover:bg-red-950 border border-zinc-900 hover:border-red-900 flex items-center justify-center text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right block (Quick Links & Info) */}
                <div className="flex flex-col gap-6">
                    {/* Portal Actions */}
                    <div className="bg-zinc-900/60 border border-zinc-700/60 rounded-2xl p-6 flex flex-col gap-4 shadow-lg">
                        <h3 className="text-sm font-bold text-white">Quick Actions</h3>
                        
                        <div className="flex flex-col gap-2.5">
                            <Link to="/admin/portfolio" className="bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-750 px-4 py-3 rounded-xl flex items-center justify-between group transition-colors shadow-sm">
                                <span className="text-xs text-zinc-200 font-semibold">Add Portfolio Project</span>
                                <ArrowRight size={13} className="text-zinc-400 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                            </Link>
                            <Link to="/admin/blogs" className="bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-750 px-4 py-3 rounded-xl flex items-center justify-between group transition-colors shadow-sm">
                                <span className="text-xs text-zinc-200 font-semibold">Publish Blog Article</span>
                                <ArrowRight size={13} className="text-zinc-400 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                            </Link>
                            <Link to="/admin/testimonials" className="bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-750 px-4 py-3 rounded-xl flex items-center justify-between group transition-colors shadow-sm">
                                <span className="text-xs text-zinc-200 font-semibold">Manage Client Reviews</span>
                                <ArrowRight size={13} className="text-zinc-400 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                            </Link>
                        </div>
                    </div>

                    {/* System specs info box */}
                    <div className="bg-zinc-900/60 border border-zinc-700/60 rounded-2xl p-6 flex flex-col gap-3 shadow-lg">
                        <h4 className="text-xs font-bold uppercase text-zinc-400 tracking-wider">Portal Version Status</h4>
                        <div className="flex flex-col gap-2 text-xs">
                            <div className="flex justify-between border-b border-zinc-800 py-1.5">
                                <span className="text-zinc-400">Core Engine</span>
                                <span className="text-zinc-200 font-medium">React v19.0 (Vite)</span>
                            </div>
                            <div className="flex justify-between border-b border-zinc-800 py-1.5">
                                <span className="text-zinc-400">Visual Styling</span>
                                <span className="text-zinc-200 font-medium">Tailwind CSS v4.0</span>
                            </div>
                            <div className="flex justify-between border-b border-zinc-800 py-1.5">
                                <span className="text-zinc-400">MongoDB API Sync</span>
                                <span className="text-emerald-400 font-bold">Active Sync</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Read Modal */}
            {activeInquiry && (
                <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-md">
                    <div className="bg-zinc-900 border border-zinc-700/80 w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
                        {/* Modal Header */}
                        <div className="px-6 py-4 bg-zinc-950 border-b border-zinc-850 flex items-center justify-between">
                            <div className="flex flex-col">
                                <h3 className="text-sm font-semibold text-white">Submission Details</h3>
                                <span className="text-[10px] text-zinc-500">Received on {activeInquiry.date}</span>
                            </div>
                            <button 
                                onClick={() => setActiveInquiry(null)}
                                className="text-xs text-zinc-500 hover:text-white px-2 py-1 rounded bg-zinc-900 border border-zinc-800 cursor-pointer"
                            >
                                Close
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 flex flex-col gap-4 overflow-y-auto">
                            {/* Sender details */}
                            <div className="grid grid-cols-2 gap-4 bg-zinc-950/40 p-4 rounded-xl border border-zinc-850 text-xs">
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-[9px] uppercase tracking-wider text-zinc-500">Name</span>
                                    <span className="font-medium text-zinc-200">{activeInquiry.name}</span>
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-[9px] uppercase tracking-wider text-zinc-500">Email</span>
                                    <span className="font-medium text-zinc-200 truncate">{activeInquiry.email}</span>
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-[9px] uppercase tracking-wider text-zinc-500">Company</span>
                                    <span className="font-medium text-zinc-200">{activeInquiry.company}</span>
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-[9px] uppercase tracking-wider text-zinc-500">Type</span>
                                    <span className="font-medium text-emerald-400 uppercase tracking-widest">{activeInquiry.projectType}</span>
                                </div>
                            </div>

                            {/* Message text content */}
                            <div className="flex flex-col gap-2">
                                <span className="text-[9px] uppercase tracking-wider text-zinc-500">Message Content</span>
                                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-850 text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap">
                                    {activeInquiry.message}
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 bg-zinc-950/80 border-t border-zinc-850 flex items-center justify-between">
                            <span className="text-[10px] text-zinc-500">Budget Range: {activeInquiry.budget}</span>
                            <button
                                onClick={() => {
                                    window.location.href = `mailto:${activeInquiry.email}?subject=Regarding your Inquiry - Nexion Solutions`;
                                }}
                                className="bg-white hover:bg-zinc-200 text-black text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer"
                            >
                                Send Email Reply
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

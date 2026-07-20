import { useState, useEffect } from "react";
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
import toast from "react-hot-toast";

// Data store imports
import { getBlogArticles } from "../data/blog-data";
import { getPortfolioProjects } from "../data/portfolio-data";
import { getTestimonialsCol1, getTestimonialsCol2, getContactSubmissions, saveContactSubmissions, ContactSubmission } from "../data/data";

export default function Dashboard() {
    const [stats, setStats] = useState({
        projects: 0,
        blogs: 0,
        testimonials: 0,
        inquiries: 0,
        newInquiries: 0
    });
    const [recentInquiries, setRecentInquiries] = useState<ContactSubmission[]>([]);
    const [activeInquiry, setActiveInquiry] = useState<ContactSubmission | null>(null);

    // Refresh states and numbers
    const loadDashboardData = () => {
        const projectsCount = getPortfolioProjects().length;
        const blogsCount = getBlogArticles().length;
        const testimonialsCount = getTestimonialsCol1().length + getTestimonialsCol2().length;
        const submissions = getContactSubmissions();
        const newSubmissionsCount = submissions.filter(s => s.status === "new").length;

        setStats({
            projects: projectsCount,
            blogs: blogsCount,
            testimonials: testimonialsCount,
            inquiries: submissions.length,
            newInquiries: newSubmissionsCount
        });

        // Top 4 recent submissions
        setRecentInquiries(submissions.slice(0, 4));
    };

    useEffect(() => {
        loadDashboardData();
    }, []);

    // Change Inquiry status
    const toggleStatus = (id: string, currentStatus: "new" | "read" | "replied") => {
        const allSubs = getContactSubmissions();
        const updated = allSubs.map(s => {
            if (s.id === id) {
                return { ...s, status: currentStatus === "new" ? ("read" as const) : ("new" as const) };
            }
            return s;
        });
        saveContactSubmissions(updated);
        toast.success("Inquiry status updated.");
        loadDashboardData();
    };

    // Delete submission
    const deleteInquiry = (id: string) => {
        if (!window.confirm("Are you sure you want to delete this message?")) return;
        const allSubs = getContactSubmissions();
        const filtered = allSubs.filter(s => s.id !== id);
        saveContactSubmissions(filtered);
        toast.success("Inquiry message deleted.");
        loadDashboardData();
    };

    // Open read modal
    const viewMessage = (inquiry: ContactSubmission) => {
        setActiveInquiry(inquiry);
        // Automatically mark as read if new
        if (inquiry.status === "new") {
            const allSubs = getContactSubmissions();
            const updated = allSubs.map(s => {
                if (s.id === inquiry.id) {
                    return { ...s, status: "read" as const };
                }
                return s;
            });
            saveContactSubmissions(updated);
            loadDashboardData();
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
                <div className="bg-zinc-900/40 border border-zinc-900 rounded-xl p-5 flex items-center gap-5 hover:border-zinc-800 transition-colors shadow-sm">
                    <div className="size-10 rounded-lg bg-indigo-950/40 border border-indigo-900/30 flex items-center justify-center text-indigo-400">
                        <Briefcase size={20} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">PORTFOLIO</span>
                        <span className="text-2xl font-bold text-white mt-1">{stats.projects}</span>
                        <span className="text-[9px] text-zinc-500 mt-0.5">Projects showcased</span>
                    </div>
                </div>

                {/* 2. Blog Articles Count */}
                <div className="bg-zinc-900/40 border border-zinc-900 rounded-xl p-5 flex items-center gap-5 hover:border-zinc-800 transition-colors shadow-sm">
                    <div className="size-10 rounded-lg bg-purple-950/40 border border-purple-900/30 flex items-center justify-center text-purple-400">
                        <BookOpen size={20} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">BLOG POSTS</span>
                        <span className="text-2xl font-bold text-white mt-1">{stats.blogs}</span>
                        <span className="text-[9px] text-zinc-500 mt-0.5">Articles published</span>
                    </div>
                </div>

                {/* 3. Testimonials Count */}
                <div className="bg-zinc-900/40 border border-zinc-900 rounded-xl p-5 flex items-center gap-5 hover:border-zinc-800 transition-colors shadow-sm">
                    <div className="size-10 rounded-lg bg-orange-950/40 border border-orange-900/30 flex items-center justify-center text-orange-400">
                        <MessageSquare size={20} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">REVIEWS</span>
                        <span className="text-2xl font-bold text-white mt-1">{stats.testimonials}</span>
                        <span className="text-[9px] text-zinc-500 mt-0.5">Client reviews on site</span>
                    </div>
                </div>

                {/* 4. Contact Inquiries */}
                <div className="bg-zinc-900/40 border border-zinc-900 rounded-xl p-5 flex items-center gap-5 hover:border-zinc-800 transition-colors shadow-sm relative overflow-hidden">
                    <div className="size-10 rounded-lg bg-emerald-950/40 border border-emerald-900/30 flex items-center justify-center text-emerald-400">
                        <Inbox size={20} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">TOTAL INBOX</span>
                        <span className="text-2xl font-bold text-white mt-1">{stats.inquiries}</span>
                        <span className="text-[9px] text-emerald-400 mt-0.5 font-medium">{stats.newInquiries} unread messages</span>
                    </div>
                    {stats.newInquiries > 0 && (
                        <div className="absolute top-2 right-2 size-2 bg-emerald-500 rounded-full animate-ping" />
                    )}
                </div>
            </div>

            {/* Main Area: Split layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left block (Recent Inquiries) */}
                <div className="lg:col-span-2 bg-zinc-900/20 border border-zinc-900 rounded-2xl p-6 flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <h3 className="text-sm font-semibold text-white">Recent Customer Messages</h3>
                            <span className="text-[10px] text-zinc-500">Form submissions from homepage & contact page.</span>
                        </div>
                        <Link to="/admin/contact" className="text-xs text-zinc-400 hover:text-white flex items-center gap-1">
                            <span>View Inbox</span>
                            <ArrowRight size={13} />
                        </Link>
                    </div>

                    {/* Table View */}
                    {recentInquiries.length === 0 ? (
                        <div className="py-12 text-center text-xs text-zinc-600 border border-dashed border-zinc-850 rounded-xl">
                            No inquiries recorded in database yet.
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2.5">
                            {recentInquiries.map((inq) => (
                                <div key={inq.id} className="bg-zinc-900/40 border border-zinc-900 hover:border-zinc-850 p-4 rounded-xl flex items-center justify-between gap-4 transition-colors">
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
                                            onClick={() => toggleStatus(inq.id, inq.status)}
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
                                            onClick={() => deleteInquiry(inq.id)}
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
                    <div className="bg-zinc-900/20 border border-zinc-900 rounded-2xl p-6 flex flex-col gap-4">
                        <h3 className="text-sm font-semibold text-white">Quick Actions</h3>
                        
                        <div className="flex flex-col gap-2">
                            <Link to="/admin/portfolio" className="bg-zinc-900 hover:bg-zinc-850 border border-zinc-850 px-4 py-3 rounded-xl flex items-center justify-between group transition-colors">
                                <span className="text-xs text-zinc-300 font-medium">Add Portfolio Project</span>
                                <ArrowRight size={13} className="text-zinc-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                            </Link>
                            <Link to="/admin/blogs" className="bg-zinc-900 hover:bg-zinc-850 border border-zinc-850 px-4 py-3 rounded-xl flex items-center justify-between group transition-colors">
                                <span className="text-xs text-zinc-300 font-medium">Publish Blog Article</span>
                                <ArrowRight size={13} className="text-zinc-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                            </Link>
                            <Link to="/admin/testimonials" className="bg-zinc-900 hover:bg-zinc-850 border border-zinc-850 px-4 py-3 rounded-xl flex items-center justify-between group transition-colors">
                                <span className="text-xs text-zinc-300 font-medium">Manage Client Reviews</span>
                                <ArrowRight size={13} className="text-zinc-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                            </Link>
                        </div>
                    </div>

                    {/* System specs info box */}
                    <div className="bg-zinc-900/20 border border-zinc-900 rounded-2xl p-6 flex flex-col gap-3">
                        <h4 className="text-xs font-semibold uppercase text-zinc-500 tracking-wider">Portal Version Status</h4>
                        <div className="flex flex-col gap-2 text-xs">
                            <div className="flex justify-between border-b border-zinc-900 py-1.5">
                                <span className="text-zinc-500">Core Engine</span>
                                <span className="text-zinc-300">React v19.0 (Vite)</span>
                            </div>
                            <div className="flex justify-between border-b border-zinc-900 py-1.5">
                                <span className="text-zinc-500">Visual Styling</span>
                                <span className="text-zinc-300">Tailwind CSS v4.0</span>
                            </div>
                            <div className="flex justify-between border-b border-zinc-900 py-1.5">
                                <span className="text-zinc-500">Local DB Status</span>
                                <span className="text-emerald-400 font-semibold">Active Sync</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Read Modal */}
            {activeInquiry && (
                <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-zinc-900 border border-zinc-800 w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
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

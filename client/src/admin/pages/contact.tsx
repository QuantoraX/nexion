import { useState, useEffect } from "react";
import { 
    Mail, 
    Trash2, 
    CheckSquare, 
    Square, 
    Search, 
    Eye, 
    Clock, 
    DollarSign, 
    Layers
} from "lucide-react";
import { useAppContext, ContactSubmission } from "../../context/appContext";

export default function Contact() {
    const { 
        inquiries, 
        toggleInquiryStatus, 
        deleteInquiry 
    } = useAppContext();

    const [filteredInquiries, setFilteredInquiries] = useState<ContactSubmission[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState<"all" | "new" | "read">("all");
    const [viewInquiry, setViewInquiry] = useState<ContactSubmission | null>(null);

    // Filter and search logic
    useEffect(() => {
        let result = inquiries;

        // Apply Tab filters
        if (activeTab === "new") {
            result = result.filter(item => item.status === "new");
        } else if (activeTab === "read") {
            result = result.filter(item => item.status !== "new");
        }

        // Apply Search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(item => 
                item.name.toLowerCase().includes(query) ||
                item.email.toLowerCase().includes(query) ||
                item.message.toLowerCase().includes(query) ||
                item.company.toLowerCase().includes(query)
            );
        }

        setFilteredInquiries(result);
    }, [inquiries, activeTab, searchQuery]);

    // View Message
    const openMessage = (inq: ContactSubmission) => {
        setViewInquiry(inq);
        const id = inq._id || inq.id;
        if (inq.status === "new" && id) {
            toggleInquiryStatus(id);
        }
    };

    // Toggle read/unread state manually
    const toggleRead = (id?: string) => {
        if (!id) return;
        toggleInquiryStatus(id);
    };

    // Delete submission
    const deleteMessage = (id?: string) => {
        if (!id) return;
        if (!window.confirm("Are you sure you want to permanently delete this message?")) return;
        deleteInquiry(id);
        if (viewInquiry && (viewInquiry._id === id || viewInquiry.id === id)) {
            setViewInquiry(null);
        }
    };

    return (
        <div className="flex flex-col gap-6 font-sans">
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-medium text-white">Inquiries Inbox</h2>
                    <p className="text-xs text-zinc-500">Read and process contact requests submitted by potential clients.</p>
                </div>
            </div>

            {/* Filter and Search Bar Row */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-zinc-900/60 border border-zinc-700/60 p-4 rounded-2xl shadow-md">
                {/* Search */}
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-2.5 size-4 text-zinc-400" />
                    <input
                        type="text"
                        placeholder="Search name, email, keyword..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-zinc-950/80 border border-zinc-750 hover:border-zinc-650 focus:border-zinc-500 text-zinc-100 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none placeholder-zinc-500 transition-colors"
                    />
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1.5 p-1 bg-zinc-950/80 border border-zinc-800 rounded-xl">
                    <button
                        onClick={() => setActiveTab("all")}
                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                            activeTab === "all" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-400 hover:text-zinc-200"
                        }`}
                    >
                        All ({inquiries.length})
                    </button>
                    <button
                        onClick={() => setActiveTab("new")}
                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                            activeTab === "new" ? "bg-zinc-800 text-emerald-400 shadow-sm" : "text-zinc-400 hover:text-zinc-200"
                        }`}
                    >
                        Unread ({inquiries.filter(i => i.status === "new").length})
                    </button>
                    <button
                        onClick={() => setActiveTab("read")}
                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                            activeTab === "read" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-400 hover:text-zinc-200"
                        }`}
                    >
                        Read ({inquiries.filter(i => i.status !== "new").length})
                    </button>
                </div>
            </div>

            {/* Inquiries List */}
            {filteredInquiries.length === 0 ? (
                <div className="py-20 text-center border border-dashed border-zinc-700/60 rounded-2xl bg-zinc-900/40">
                    <Mail size={32} className="text-zinc-600 mx-auto mb-3" />
                    <h3 className="text-zinc-300 text-xs font-semibold">No messages found</h3>
                    <p className="text-zinc-500 text-[10px] mt-1">Adjust search parameters or filters.</p>
                </div>
            ) : (
                <div className="bg-zinc-900/60 border border-zinc-700/60 rounded-2xl overflow-hidden shadow-lg">
                    {/* Header Columns for Desktop */}
                    <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3.5 bg-zinc-950/80 border-b border-zinc-800 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                        <div className="col-span-1">Status</div>
                        <div className="col-span-3">Sender</div>
                        <div className="col-span-2">Project Type</div>
                        <div className="col-span-2">Budget</div>
                        <div className="col-span-2">Date Received</div>
                        <div className="col-span-2 text-right">Actions</div>
                    </div>

                    {/* Rows */}
                    <div className="flex flex-col divide-y divide-zinc-800/80">
                        {filteredInquiries.map((inq) => (
                            <div 
                                key={inq.id}
                                className={`grid grid-cols-1 lg:grid-cols-12 gap-4 px-6 py-4 items-center transition-colors hover:bg-zinc-900/20 ${
                                    inq.status === "new" ? "bg-zinc-900/10" : ""
                                }`}
                            >
                                {/* Status badge */}
                                <div className="col-span-1">
                                    {inq.status === "new" ? (
                                        <span className="bg-emerald-950/60 border border-emerald-900/50 text-emerald-400 text-[8px] font-bold px-2 py-0.5 rounded-md tracking-wider">NEW</span>
                                    ) : (
                                        <span className="bg-zinc-900/60 border border-zinc-850 text-zinc-500 text-[8px] font-bold px-2 py-0.5 rounded-md tracking-wider">READ</span>
                                    )}
                                </div>

                                {/* Sender detail */}
                                <div className="col-span-3 flex flex-col gap-0.5 min-w-0">
                                    <span className={`text-xs text-zinc-200 truncate ${inq.status === "new" ? "font-bold text-white" : "font-medium"}`}>
                                        {inq.name}
                                    </span>
                                    <span className="text-[10px] text-zinc-500 truncate">{inq.email}</span>
                                    {inq.company && inq.company !== "None" && inq.company !== "None (Homepage Form)" && (
                                        <span className="text-[9px] text-zinc-650 truncate">at {inq.company}</span>
                                    )}
                                </div>

                                {/* Project Service Type */}
                                <div className="col-span-2 flex items-center gap-1.5 text-xs text-zinc-300">
                                    <Layers size={11} className="text-zinc-600" />
                                    <span className="bg-zinc-950/50 px-2 py-0.5 rounded border border-zinc-900 text-zinc-400 text-[10px] uppercase font-semibold tracking-wider truncate">
                                        {inq.projectType}
                                    </span>
                                </div>

                                {/* Budget */}
                                <div className="col-span-2 flex items-center gap-1 text-xs text-zinc-300">
                                    <DollarSign size={11} className="text-zinc-600" />
                                    <span className="truncate">{inq.budget || "Not Specified"}</span>
                                </div>

                                {/* Date */}
                                <div className="col-span-2 flex items-center gap-1 text-[10px] text-zinc-500">
                                    <Clock size={11} className="text-zinc-600" />
                                    <span>{inq.date}</span>
                                </div>

                                {/* Action Buttons */}
                                <div className="col-span-2 flex items-center justify-end gap-1.5">
                                    <button 
                                        onClick={() => openMessage(inq)}
                                        title="Read Full Inquiry"
                                        className="size-7 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-900 hover:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                                    >
                                        <Eye size={12} />
                                    </button>
                                    <button 
                                        onClick={() => toggleRead(inq._id || inq.id)}
                                        title={inq.status === "new" ? "Mark read" : "Mark unread"}
                                        className={`size-7 rounded-lg border flex items-center justify-center transition-colors cursor-pointer ${
                                            inq.status === "new"
                                                ? "bg-zinc-950 hover:bg-emerald-950 border-zinc-900 hover:border-emerald-900 text-zinc-500 hover:text-emerald-400"
                                                : "bg-emerald-950 border-emerald-900 text-emerald-400"
                                        }`}
                                    >
                                        {inq.status === "new" ? <Square size={12} /> : <CheckSquare size={12} />}
                                    </button>
                                    <button 
                                        onClick={() => deleteMessage(inq._id || inq.id)}
                                        title="Delete Permanently"
                                        className="size-7 rounded-lg bg-zinc-950 hover:bg-red-950 border border-zinc-900 hover:border-red-900 flex items-center justify-center text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                                    >
                                        <Trash2 size={12} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Read Message Overlay Modal */}
            {viewInquiry && (
                <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-zinc-900 border border-zinc-850 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
                        {/* Header */}
                        <div className="px-6 py-4 bg-zinc-950 border-b border-zinc-850 flex items-center justify-between">
                            <div className="flex flex-col">
                                <h3 className="text-sm font-semibold text-white">Contact Inquiry details</h3>
                                <span className="text-[10px] text-zinc-500">Inquiry ID: {viewInquiry.id} • Pushed on {viewInquiry.date}</span>
                            </div>
                            <button 
                                onClick={() => setViewInquiry(null)}
                                className="text-xs text-zinc-500 hover:text-white px-2 py-1 rounded bg-zinc-900 border border-zinc-800 cursor-pointer"
                            >
                                Close Modal
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col gap-5 overflow-y-auto">
                            {/* Meta Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-950/40 p-4 rounded-xl border border-zinc-850 text-xs">
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-[9px] uppercase tracking-wider text-zinc-500">Contact Person</span>
                                    <span className="font-semibold text-zinc-200">{viewInquiry.name}</span>
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-[9px] uppercase tracking-wider text-zinc-500">Email Address</span>
                                    <span className="font-semibold text-zinc-200 truncate">{viewInquiry.email}</span>
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-[9px] uppercase tracking-wider text-zinc-500">Company Organization</span>
                                    <span className="font-semibold text-zinc-200">{viewInquiry.company}</span>
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-[9px] uppercase tracking-wider text-zinc-500">Service Category</span>
                                    <span className="font-bold text-emerald-400 uppercase tracking-widest">{viewInquiry.projectType}</span>
                                </div>
                            </div>

                            {/* Message Body */}
                            <div className="flex flex-col gap-2">
                                <span className="text-[9px] uppercase tracking-wider text-zinc-500">Message Content</span>
                                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-850 text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap">
                                    {viewInquiry.message}
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 bg-zinc-950/80 border-t border-zinc-850 flex items-center justify-between">
                            <span className="text-[10px] text-zinc-500">Project Budget Scope: {viewInquiry.budget}</span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => deleteMessage(viewInquiry.id)}
                                    className="bg-zinc-900 border border-zinc-800 hover:border-red-950 hover:bg-red-950/10 text-xs font-semibold px-4 py-2 rounded-lg text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => {
                                        window.location.href = `mailto:${viewInquiry.email}?subject=Response from Nexion Solutions`;
                                    }}
                                    className="bg-white hover:bg-zinc-200 text-black text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                                >
                                    Reply via Mail
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

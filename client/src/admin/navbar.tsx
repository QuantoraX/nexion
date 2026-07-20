import { useLocation } from "react-router-dom";
import { UserCheck, Calendar } from "lucide-react";

export default function Navbar() {
    const location = useLocation();
    
    // Compute dynamic dashboard section title
    const getPageTitle = () => {
        const path = location.pathname.split("/").pop();
        if (!path || path === "admin") return "Overview Dashboard";
        if (path === "blogs") return "Blog Articles Manager";
        if (path === "portfolio") return "Portfolio Projects Manager";
        if (path === "testimonials") return "Client Testimonials Manager";
        if (path === "contact") return "Inquiries Inbox";
        return path.charAt(0).toUpperCase() + path.slice(1) + " Management";
    };

    const formattedDate = new Date().toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric"
    });

    return (
        <header className="h-[70px] border-b border-zinc-800/80 bg-zinc-900/60 backdrop-blur-xl px-6 md:px-8 flex items-center justify-between sticky top-0 z-30 shadow-md">
            {/* Title Section */}
            <div className="flex flex-col">
                <h1 className="text-base font-bold tracking-tight text-white">{getPageTitle()}</h1>
                <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest mt-0.5 hidden sm:block">Nexion Admin Portal</p>
            </div>

            {/* Profile / Calendar Details */}
            <div className="flex items-center gap-6">
                {/* Date Display */}
                <div className="hidden md:flex items-center gap-2 text-zinc-300 text-xs bg-zinc-900/90 px-3.5 py-1.5 rounded-xl border border-zinc-700/60 shadow-sm">
                    <Calendar size={13} className="text-indigo-400" />
                    <span className="font-medium">{formattedDate}</span>
                </div>

                {/* User Status Profile */}
                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end">
                        <span className="text-xs font-bold text-zinc-100">Admin Staff</span>
                        <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest mt-0.5 flex items-center gap-1">
                            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Online
                        </span>
                    </div>
                    <div className="size-9 rounded-xl bg-zinc-850 border border-zinc-700/60 flex items-center justify-center text-white shadow-sm">
                        <UserCheck size={16} className="text-indigo-300" />
                    </div>
                </div>
            </div>
        </header>
    );
}

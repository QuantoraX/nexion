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
        <header className="h-[70px] border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md px-6 md:px-8 flex items-center justify-between sticky top-0 z-30">
            {/* Title Section */}
            <div className="flex flex-col">
                <h1 className="text-base font-semibold tracking-tight text-white">{getPageTitle()}</h1>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-0.5 hidden sm:block">Nexion Admin Portal</p>
            </div>

            {/* Profile / Calendar Details */}
            <div className="flex items-center gap-6">
                {/* Date Display */}
                <div className="hidden md:flex items-center gap-2 text-zinc-400 text-xs bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
                    <Calendar size={13} className="text-zinc-500" />
                    <span>{formattedDate}</span>
                </div>

                {/* User Status Profile */}
                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end">
                        <span className="text-xs font-semibold text-zinc-200">Admin Staff</span>
                        <span className="text-[9px] font-semibold text-emerald-400 uppercase tracking-widest mt-0.5">Online</span>
                    </div>
                    <div className="size-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
                        <UserCheck size={16} className="text-zinc-400" />
                    </div>
                </div>
            </div>
        </header>
    );
}

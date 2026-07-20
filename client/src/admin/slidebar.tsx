import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
    LayoutDashboard, 
    BookOpen, 
    Briefcase, 
    MessageSquare, 
    Inbox, 
    LogOut,
    Terminal
} from "lucide-react";
import toast from "react-hot-toast";

export default function Slidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        {
            name: "Overview",
            path: "/admin/dashboard",
            icon: <LayoutDashboard size={16} />
        },
        {
            name: "Portfolio Projects",
            path: "/admin/portfolio",
            icon: <Briefcase size={16} />
        },
        {
            name: "Blog Articles",
            path: "/admin/blogs",
            icon: <BookOpen size={16} />
        },
        {
            name: "Testimonials",
            path: "/admin/testimonials",
            icon: <MessageSquare size={16} />
        },
        {
            name: "Inquiries Inbox",
            path: "/admin/contact",
            icon: <Inbox size={16} />
        }
    ];

    const isActive = (path: string) => {
        if (path === "/admin/dashboard" && location.pathname === "/admin") return true;
        return location.pathname === path;
    };

    const handleLogout = () => {
        localStorage.removeItem("nexion_auth");
        localStorage.removeItem("nexion_auth_token");
        toast.success("Successfully logged out.", {
            style: { borderRadius: "12px", background: "#18181b", color: "#fafafa", border: "1px solid #3f3f46" }
        });
        navigate("/cms_dash");
    };

    return (
        <aside className="w-64 border-r border-zinc-800/80 bg-zinc-900/60 backdrop-blur-xl flex flex-col justify-between shrink-0 h-screen sticky top-0 shadow-xl">
            {/* Upper Logo / Links Section */}
            <div className="flex flex-col">
                {/* Brand Logo Header */}
                <div className="h-17.5 border-b border-zinc-800/80 px-6 flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-zinc-850 border border-zinc-700/60 flex items-center justify-center text-white shadow-inner">
                        <Terminal size={16} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold tracking-wider text-white leading-none">NEXION</span>
                        <span className="text-[9px] font-bold text-indigo-400 tracking-widest mt-1">CMS ADMIN</span>
                    </div>
                </div>

                {/* Navigation menu list */}
                <nav className="p-4 flex flex-col gap-1.5">
                    <span className="text-[9px] font-bold text-zinc-400 tracking-widest px-3 mb-1 uppercase">Menu Navigation</span>
                    {menuItems.map((item) => {
                        const active = isActive(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none border ${
                                    active
                                        ? "bg-white text-zinc-950 border-white shadow-lg shadow-white/10 font-bold"
                                        : "text-zinc-300 border-transparent hover:text-white hover:bg-zinc-800/60 hover:border-zinc-700/50"
                                }`}
                            >
                                <span className={active ? "text-zinc-950" : "text-zinc-400"}>
                                    {item.icon}
                                </span>
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Logout Footer Section */}
            <div className="p-4 border-t border-zinc-800/80">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-400 border border-red-900/30 hover:border-red-800/60 hover:bg-red-950/30 transition-all cursor-pointer select-none"
                >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
}

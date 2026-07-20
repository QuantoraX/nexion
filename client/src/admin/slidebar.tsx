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
        toast.success("Successfully logged out.", {
            style: { borderRadius: "12px", background: "#18181b", color: "#fafafa", border: "1px solid #3f3f46" }
        });
        navigate("/admin/login");
    };

    return (
        <aside className="w-64 border-r border-zinc-900 bg-zinc-950 flex flex-col justify-between shrink-0 h-screen sticky top-0">
            {/* Upper Logo / Links Section */}
            <div className="flex flex-col">
                {/* Brand Logo Header */}
                <div className="h-[70px] border-b border-zinc-900 px-6 flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
                        <Terminal size={16} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold tracking-tight text-white leading-none">NEXION</span>
                        <span className="text-[9px] font-semibold text-zinc-500 tracking-wider mt-1">DASHBOARD</span>
                    </div>
                </div>

                {/* Navigation menu list */}
                <nav className="p-4 flex flex-col gap-1">
                    <span className="text-[9px] font-bold text-zinc-600 tracking-widest px-3 mb-2 uppercase">Menu Options</span>
                    {menuItems.map((item) => {
                        const active = isActive(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer select-none ${
                                    active
                                        ? "bg-white text-black font-semibold shadow-md"
                                        : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
                                }`}
                            >
                                <span className={active ? "text-black" : "text-zinc-500"}>
                                    {item.icon}
                                </span>
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Logout Footer Section */}
            <div className="p-4 border-t border-zinc-900">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-950/20 transition-all cursor-pointer select-none"
                >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
}

import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Slidebar from "./slidebar";
import Navbar from "./navbar";

export default function AdminLayout() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const auth = localStorage.getItem("nexion_auth") === "true";
        setIsAuthenticated(auth);
    }, []);

    // Show loading state while checking authentication
    if (isAuthenticated === null) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-500 text-xs tracking-widest uppercase">
                Verifying authorization credentials...
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex font-sans overflow-x-hidden">
            {/* Left Column: Fixed Sidebar */}
            <Slidebar />

            {/* Right Column: Dynamic Workspace */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Workspace Header */}
                <Navbar />

                {/* Workspace Main Outlet */}
                <main className="flex-1 p-6 md:p-8 overflow-y-auto max-h-[calc(100vh-70px)]">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

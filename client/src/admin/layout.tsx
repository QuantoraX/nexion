import { Navigate, Outlet } from "react-router-dom";
import Slidebar from "./slidebar";
import Navbar from "./navbar";
import { useAppContext } from "../context/appContext";

export default function AdminLayout() {
    const { isAdminLoggedIn, adminToken } = useAppContext();

    // Strict Auth Check: Check both React context state and localStorage token
    const hasValidToken = isAdminLoggedIn && !!adminToken && !!localStorage.getItem("nexion_auth_token");

    // Redirect unauthenticated visitors to public home
    if (!hasValidToken) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="min-h-screen bg-zinc-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] text-zinc-100 flex font-sans overflow-x-hidden">
            {/* Left Column: Fixed Sidebar */}
            <Slidebar />

            {/* Right Column: Dynamic Workspace */}
            <div className="flex-1 flex flex-col min-w-0 bg-zinc-950/90">
                {/* Top Workspace Header */}
                <Navbar />

                {/* Workspace Main Outlet */}
                <main className="flex-1 p-6 md:p-8 overflow-y-auto max-h-[calc(100vh-4.375rem)]">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

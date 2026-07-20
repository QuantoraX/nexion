import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, Terminal, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/appContext";

export default function Login() {
    const navigate = useNavigate();
    const { loginAdmin, isAdminLoggedIn } = useAppContext();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Redirect if already logged in with valid token
    useEffect(() => {
        if (isAdminLoggedIn && !!localStorage.getItem("nexion_auth_token")) {
            navigate("/admin/dashboard");
        }
    }, [isAdminLoggedIn, navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!username || !password) {
            toast.error("Please fill in all fields.");
            return;
        }

        setIsLoading(true);

        const success = await loginAdmin(username, password);
        setIsLoading(false);

        if (success) {
            navigate("/admin/dashboard");
        }
    };

    return (
        <div className="min-h-screen bg-black text-zinc-100 flex items-center justify-center relative overflow-hidden font-sans">
            {/* Background Accent Gradients */}
            <div className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-md p-8 relative z-10">
                {/* Logo & Subtitle */}
                <div className="text-center mb-10 flex flex-col items-center">
                    <div className="size-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(255,255,255,0.03)]">
                        <Terminal className="size-6 text-zinc-200" />
                    </div>
                    <h1 className="text-2xl font-semibold tracking-tight text-white">Nexion Solutions</h1>
                    <p className="text-xs text-zinc-500 mt-2">Control Tower & Content Management Systems</p>
                </div>

                {/* Login Card */}
                <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <h2 className="text-sm font-semibold tracking-wider text-zinc-400 uppercase mb-6">ADMIN PORTAL LOGIN</h2>
                    
                    <form onSubmit={handleLogin} className="flex flex-col gap-5">
                        {/* Username Input */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">Username</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-600">
                                    <User size={14} />
                                </span>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter admin username"
                                    className="w-full bg-black/40 border border-zinc-850 hover:border-zinc-800 focus:border-zinc-700 text-zinc-100 rounded-lg pl-10 pr-4 py-2.5 text-xs transition-colors focus:outline-none placeholder-zinc-600"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">Password</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-600">
                                    <Lock size={14} />
                                </span>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-black/40 border border-zinc-850 hover:border-zinc-800 focus:border-zinc-700 text-zinc-100 rounded-lg pl-10 pr-4 py-2.5 text-xs transition-colors focus:outline-none placeholder-zinc-650"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="mt-4 w-full bg-white hover:bg-zinc-200 text-black text-xs font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-md cursor-pointer disabled:opacity-50"
                        >
                            {isLoading ? "AUTHENTICATING..." : (
                                <>
                                    <span>LOG IN TO DASHBOARD</span>
                                    <ArrowRight size={14} />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="text-center mt-8">
                    <a href="/" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
                        ← Back to public website
                    </a>
                </div>
            </div>
        </div>
    );
}

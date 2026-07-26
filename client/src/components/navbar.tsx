import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";

export function Navbar() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Reset scroll state on route change
    useEffect(() => {
        window.scrollTo(0, 0);
        setScrolled(false);
    }, [location.pathname]);

    const linkClass = `transition-colors duration-500 ${scrolled ? "text-zinc-800 hover:text-zinc-600" : "text-white hover:text-white/80"}`;
    const activeLinkClass = `transition-colors duration-500 font-medium ${scrolled ? "text-zinc-950 underline underline-offset-4" : "text-white underline underline-offset-4"}`;

    const isActive = (path: string) => location.pathname === path;

    const navLinks = [
        { label: "Home", to: "/" },
        { label: "About", to: "/about" },
        { label: "Services", to: "/services" },
        { label: "Portfolio", to: "/portfolio" },
        { label: "Blog", to: "/blog" },
        { label: "Contact", to: "/contact" },
    ];

    return (
        <>
            <nav className={`fixed z-50 flex items-center justify-between left-1/2 -translate-x-1/2 transition-all duration-500 p-4 ${scrolled ? "lg:w-5xl w-[calc(100vw-14px)] bg-white/60 backdrop-blur-2xl rounded-full mt-4 pl-6 pr-6 shadow" : "md:px-16 lg:px-24 xl:px-32 w-full pt-6"}`}>
                <Link to="/" className="flex items-center py-0.5">
                    <img
                        src={scrolled ? logo1 : logo2}
                        alt="Nexion Solutions Logo"
                        className={`w-auto object-contain transition-all duration-500 ${
                            scrolled ? "h-12 md:h-14 scale-110 origin-left" : "h-16 md:h-20 lg:h-24 scale-110 md:scale-125 origin-left -my-2"
                        }`}
                    />
                </Link>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-6 md:gap-10 text-sm">
                    {navLinks.map(link => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={isActive(link.to) ? activeLinkClass : linkClass}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <Link
                    to="/about"
                    className={`hidden md:block px-6 py-2.5 rounded-full text-sm font-medium cursor-pointer transition-all duration-500 ${scrolled ? "bg-zinc-900 text-white hover:bg-zinc-800" : "bg-zinc-50 text-zinc-800 hover:bg-zinc-200"}`}
                >
                    Get Started
                </Link>

                <button onClick={() => setMobileOpen(true)} className={`md:hidden p-2 rounded-md aspect-square font-medium transition cursor-pointer ${scrolled ? "text-zinc-800" : "text-white"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 12h16" /><path d="M4 18h16" /><path d="M4 6h16" />
                    </svg>
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-50 bg-zinc-950/98 backdrop-blur flex flex-col items-center justify-center gap-8 md:hidden transition-all duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <button 
                    onClick={() => setMobileOpen(false)} 
                    className="absolute top-6 right-6 text-white p-2.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                    </svg>
                </button>

                <div className="flex flex-col items-center gap-6">
                    {navLinks.map(link => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setMobileOpen(false)}
                            className="text-white hover:text-zinc-300 transition-colors text-2xl font-medium tracking-wide"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

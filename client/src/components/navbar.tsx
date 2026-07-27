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
            <nav className={`fixed z-50 flex items-center justify-between left-1/2 -translate-x-1/2 transition-all duration-500 p-4 ${scrolled ? "lg:w-5xl w-[calc(100vw-14px)] bg-white/60 backdrop-blur-2xl rounded-full mt-4 pl-6 pr-6 shadow" : "px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 w-full pt-6"}`}>
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
                    <a
                        href="https://wa.me/94762871658"
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => setMobileOpen(false)}
                        className="mt-4 bg-[#25D366] hover:bg-[#20ba5a] text-white px-6 py-3 rounded-full text-base font-semibold flex items-center gap-2.5 shadow-lg shadow-emerald-950/50 transition-all cursor-pointer"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.887-9.885 9.887m0-18.375C6.27 3.41 1.41 8.27 1.41 14.28c0 2.07.59 4.09 1.71 5.85L1.5 22.5l2.45-1.6c1.7 1 3.68 1.53 5.67 1.53h.01c6.01 0 10.87-4.86 10.87-10.87 0-2.9-.13-5.63-2.25-7.75A10.8 10.8 0 0012.05 3.41z" />
                        </svg>
                        <span>WhatsApp with Us</span>
                    </a>
                </div>
            </div>
        </>
    );
}

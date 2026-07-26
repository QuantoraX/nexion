import { Link } from "react-router-dom";
import logo2 from "../assets/logo2.png";

export function Footer() {
    return (
        <div className="bg-black pt-16 px-4 w-full overflow-hidden">
            <footer className="bg-[#111113] border border-zinc-800/80 w-full max-w-[1380px] mx-auto text-white pt-10 lg:pt-14 px-5 sm:px-8 md:px-14 lg:px-20 rounded-t-3xl overflow-hidden relative shadow-2xl">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-8 md:gap-12">
                    
                    {/* Brand Column */}
                    <div className="lg:col-span-3 space-y-6">
                        <Link to="/" className="block select-none">
                            <img src={logo2} alt="Nexion Solutions" className="h-24 md:h-28 w-auto object-contain" />
                        </Link>
                        <p className="text-sm/6 text-zinc-400 max-w-md">
                            Nexion Solutions empowers businesses through cutting-edge technology, custom software engineering, and robust digital platforms.
                        </p>
                        
                        {/* Social Icons */}
                        <div className="flex gap-5 md:gap-6 items-center pt-2">
                            {/* X (Twitter) */}
                            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors" title="Twitter / X">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                                </svg>
                            </a>
                            {/* Github */}
                            <a href="https://github.com/QuantoraX/nexion" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors" title="GitHub">
                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>
                                </svg>
                            </a>
                            {/* Linkedin */}
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors" title="LinkedIn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
                                </svg>
                            </a>
                            {/* Instagram */}
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors" title="Instagram">
                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12 items-start">
                        {/* Solutions */}
                        <div>
                            <h3 className="font-semibold text-sm mb-4 text-white tracking-wider uppercase text-xs">Solutions</h3>
                            <ul className="space-y-3 text-sm text-zinc-400">
                                <li><Link to="/services" className="hover:text-white transition-colors">Custom Software</Link></li>
                                <li><Link to="/services" className="hover:text-white transition-colors">Mobile Apps</Link></li>
                                <li><Link to="/services" className="hover:text-white transition-colors">Cloud & DevOps</Link></li>
                                <li><Link to="/services" className="hover:text-white transition-colors">AI & ML Solutions</Link></li>
                            </ul>
                        </div>

                        {/* Navigation */}
                        <div>
                            <h3 className="font-semibold text-sm mb-4 text-white tracking-wider uppercase text-xs">Explore</h3>
                            <ul className="space-y-3 text-sm text-zinc-400">
                                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                                <li><Link to="/portfolio" className="hover:text-white transition-colors">Work Portfolio</Link></li>
                                <li><Link to="/blog" className="hover:text-white transition-colors">Tech Blog</Link></li>
                            </ul>
                        </div>

                        {/* Company & Support */}
                        <div className="col-span-2 sm:col-span-1">
                            <h3 className="font-semibold text-sm mb-4 text-white tracking-wider uppercase text-xs">Company</h3>
                            <ul className="space-y-3 text-sm text-zinc-400">
                                <li><Link to="/contact" className="text-indigo-400 font-medium hover:text-indigo-300 transition-colors flex items-center gap-1">Contact Us →</Link></li>
                                <li className="flex items-center gap-2">
                                    <Link to="/about" className="hover:text-white transition-colors">Careers</Link>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">HIRING</span>
                                </li>
                                <li><Link to="/cms_dash" className="hover:text-white transition-colors text-zinc-500">Admin Portal</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright Divider */}
                <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <p className="text-zinc-500 text-xs">© 2026 Nexion Solutions. All rights reserved.</p>
                    <div className="flex items-center gap-6 text-xs text-zinc-500">
                        <Link to="/contact" className="hover:text-zinc-300 transition-colors">Privacy Policy</Link>
                        <Link to="/contact" className="hover:text-zinc-300 transition-colors">Terms of Service</Link>
                        <Link to="/contact" className="hover:text-zinc-300 transition-colors">Security</Link>
                    </div>
                </div>

                {/* Big Glow Brand Banner */}
                <div className="relative mt-8 select-none pointer-events-none overflow-hidden">
                    <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-4xl h-full max-h-64 bg-zinc-400/10 rounded-full blur-[140px] pointer-events-none" />
                    <h3 className="text-center font-extrabold leading-[0.75] text-transparent text-[clamp(4rem,18vw,16rem)] [-webkit-text-stroke:1.5px_#d4d4d8] md:[-webkit-text-stroke:2px_#e4e4e7] mt-4 tracking-tighter uppercase opacity-85">
                        NEXION
                    </h3>
                </div>
            </footer>
        </div>
    );
}

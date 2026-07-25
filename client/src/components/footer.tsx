import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo2 from "../assets/logo2.png";

const MotionLink = motion(Link);

export function Footer() {
    return (
        <footer className="bg-black text-white pt-16 pb-8 px-4 md:px-16 lg:px-24 xl:px-32 w-full overflow-hidden relative">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">

                    {/* Left Brand Details */}
                    <div className="lg:col-span-7 flex flex-col items-start gap-6">
                        <Link to="/" className="select-none">
                            <img src={logo2} alt="Nexion Solutions Logo" className="h-28 md:h-32 w-auto object-contain" />
                        </Link>
                        <p className="text-zinc-300 text-sm/5.5 max-w-md">
                            Empowering businesses through cutting-edge technology, custom software, and robust digital solutions.
                        </p>
                    </div>

                    {/* Right Link Columns */}
                    <div className="lg:col-span-5 flex justify-between gap-8 flex-wrap">
                        {/* Explore */}
                        <div className="flex flex-col gap-5">
                            <span className="text-white font-medium">Explore</span>
                            <div className="flex flex-col gap-3 text-xs text-zinc-300">
                                <MotionLink to="/" className="hover:text-white transition-colors duration-200" 
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                >
                                    Home
                                </MotionLink>
                                <MotionLink to="/about" className="hover:text-white transition-colors duration-200" 
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                >
                                    About Us
                                </MotionLink>
                                <MotionLink to="/services" className="hover:text-white transition-colors duration-200" 
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                >
                                    Services
                                </MotionLink>
                                <MotionLink to="/portfolio" className="hover:text-white transition-colors duration-200" 
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                >
                                    Portfolio
                                </MotionLink>
                                <MotionLink to="/blog" className="hover:text-white transition-colors duration-200" 
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                >
                                    Blog
                                </MotionLink>
                            </div>
                        </div>

                        {/* Company & Support */}
                        <div className="flex flex-col gap-5">
                            <span className="text-white font-medium">Connect</span>
                            <div className="flex flex-col gap-3 text-xs text-zinc-300">
                                <MotionLink to="/contact" className="hover:text-white transition-colors duration-200 font-semibold text-indigo-400" 
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                >
                                    Contact Us →
                                </MotionLink>
                                <MotionLink to="/cms_dash" className="hover:text-white transition-colors duration-200 text-zinc-400" 
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                >
                                    Admin CMS
                                </MotionLink>
                                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-200">
                                    LinkedIn
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-200">
                                    Twitter / X
                                </a>
                                <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-200">
                                    GitHub
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full h-px bg-zinc-800"></div>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-5 text-xs text-zinc-300">
                    <p>Copyright 2026 © Nexion Solutions. All Rights Reserved.</p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors duration-200">Cookie Policy</a>
                    </div>
                </div>
            </div>

            {/* Watermark Big Text */}
            <div className="absolute bottom-0 right-0 translate-y-1/4 select-none pointer-events-none text-zinc-900/15 font-black text-[6rem] sm:text-[10rem] md:text-[14rem] lg:text-[20rem] leading-none tracking-tighter uppercase font-sans z-0">
                NEXION
            </div>
        </footer>
    );
}

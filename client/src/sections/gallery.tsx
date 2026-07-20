import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getPortfolioProjects, PortfolioProject } from "../data/portfolio-data";

export function Gallery() {
    const [projects, setProjects] = useState<PortfolioProject[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setProjects(getPortfolioProjects());
    }, []);

    // Double list to keep horizontal track width for horizontal scroll experience
    const displayProjects = [...projects, ...projects];

    useEffect(() => {
        const container = containerRef.current;
        const track = trackRef.current;
        if (!container || !track || displayProjects.length === 0) return;

        const handleScroll = () => {
            const rect = container.getBoundingClientRect();
            const viewHeight = window.innerHeight;
            const totalHeight = rect.height;
            const scrolled = -rect.top;
            const maxScroll = totalHeight - viewHeight;

            if (maxScroll <= 0) return;

            // Clamped scroll progress (0 to 1)
            const progress = Math.max(0, Math.min(1, scrolled / maxScroll));
            
            // Calculate limit (total scrollable horizontal width)
            const limit = Math.max(0, track.scrollWidth - window.innerWidth);
            
            // Apply horizontal transform on the track
            track.style.transform = `translateX(-${progress * limit}px)`;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll);
        
        // Timeout to ensure elements are measured after paint/images loaded
        const timer = setTimeout(handleScroll, 100);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
            clearTimeout(timer);
        };
    }, [displayProjects.length]);

    return (
        <section ref={containerRef} className="relative h-[220vh] w-full">
            {/* Sticky view wrapper */}
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">

                {/* Section Header */}
                <div className="px-4 md:px-16 lg:px-24 xl:px-32 mb-10">
                    <motion.div className="flex items-center gap-1.5 mb-4"
                        initial={{ y: -20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                    >
                        <span className="size-1.5 bg-zinc-900"></span>
                        <span className="text-sm text-zinc-900 tracking-widest uppercase">Our Projects</span>
                    </motion.div>

                    <div className="flex items-end justify-between max-w-full">
                        <motion.h2 className="text-4xl md:text-5xl text-zinc-900 font-medium leading-tight max-w-xl"
                            initial={{ y: 40, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
                        >
                            Work We're <br />Proud Of
                        </motion.h2>
                        <motion.p className="hidden md:block text-zinc-500 text-sm max-w-xs text-right"
                            initial={{ y: 40, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                        >
                            A curated selection of digital products we've crafted for our clients worldwide.
                        </motion.p>
                    </div>
                </div>

                {/* Horizontal scroll track */}
                <div
                    ref={trackRef}
                    className="flex gap-5 px-4 md:px-16 lg:px-24 xl:px-32 will-change-transform transition-transform duration-300 ease-out"
                >
                    {displayProjects.map((project, index) => (
                        <Link 
                            key={index} 
                            to={`/portfolio/${project.slug}`}
                            className="relative w-80 h-96 shrink-0 overflow-hidden rounded-2xl group cursor-pointer block shadow-lg border border-zinc-100"
                        >
                            <img
                                src={project.src}
                                alt={project.title}
                                className="w-full h-full object-cover pointer-events-none transition-transform duration-500 group-hover:scale-105"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                            {/* Label */}
                            <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <span className="text-xs text-zinc-300 uppercase tracking-widest">{project.subtitle}</span>
                                <h3 className="text-white text-lg font-medium mt-1">{project.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}
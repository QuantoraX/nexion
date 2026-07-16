import { CodeIcon } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
    return (
        <motion.section className="flex flex-col items-center min-h-screen justify-center bg-black bg-[url('tech-hero-bg.png')] bg-cover bg-center bg-no-repeat px-4 w-full" 
            initial={{ opacity: 0.4 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/50 pointer-events-none" />

            <motion.div className="relative z-10 bg-white/20 backdrop-blur text-sm text-white pl-2 pr-4 py-1 rounded-full flex items-center gap-2 border border-white/20" 
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
            >
                <CodeIcon size={16} />
                <p>Transforming Ideas Into Powerful Digital Solutions</p>
            </motion.div>
            <motion.h1 className="relative z-10 text-5xl md:text-[64px] text-zinc-50 font-medium max-w-3xl text-center mt-5 leading-tight" 
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
            >
                Transforming Ideas Into Powerful Digital Solutions
            </motion.h1>
            <motion.p className="relative z-10 text-white max-w-xl text-center mt-3" 
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
            >
                Discover custom software development, expert tech consulting, and seamless digital transformation tailored to your business goals.
            </motion.p>
            <motion.div className="relative z-10 flex items-center gap-4 mt-8"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
            >
                <button className="bg-zinc-50 hover:bg-zinc-200 px-6 py-2.5 rounded-md text-zinc-800 text-sm font-medium cursor-pointer transition">
                    Our Services
                </button>
                <button className="border border-slate-200 text-zinc-50 px-5 py-2.5 rounded-md text-sm font-medium cursor-pointer transition group">
                    <div className="relative overflow-hidden">
                        <span className="block transition-transform duration-200 group-hover:-translate-y-full">
                            Talk to an Expert
                        </span>
                        <span className="absolute top-0 left-0 block transition-transform duration-200 group-hover:translate-y-0 translate-y-full">
                            Talk to an Expert
                        </span>
                    </div>
                </button>
            </motion.div>
        </motion.section>
    )
}
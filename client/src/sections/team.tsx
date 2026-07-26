import { motion, Variants } from "framer-motion";
import { teamMembers } from "../data/about-data";

const fadeUp: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: (i = 0) => ({
        y: 0,
        opacity: 1,
        transition: { delay: i * 0.1, type: "spring" as const, stiffness: 240, damping: 70 }
    })
};

export function TeamSection() {
    return (
        <section className="py-20 px-4 md:px-16 lg:px-24 xl:px-32 w-full bg-white">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="flex items-center gap-1.5 mb-6"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <span className="size-1.5 bg-zinc-900 inline-block" />
                    <span className="text-sm text-zinc-900 uppercase tracking-widest font-medium">The Team</span>
                </motion.div>

                <motion.h2
                    className="text-4xl md:text-5xl font-medium text-zinc-900 mb-12 max-w-2xl leading-tight"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    The minds behind the mission
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="border border-zinc-200/90 rounded-2xl p-5 flex flex-col gap-4 hover:shadow-xl transition-all duration-300 bg-white group"
                        >
                            {/* Large Team Member Photo */}
                            <div className="w-full h-64 sm:h-60 md:h-64 rounded-xl overflow-hidden border border-zinc-200/80 shadow-xs shrink-0 bg-zinc-100">
                                <img 
                                    src={member.image} 
                                    alt={member.name} 
                                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" 
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <h3 className="text-zinc-900 font-semibold text-xl">{member.name}</h3>
                                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">{member.role}</span>
                            </div>

                            <p className="text-zinc-500 text-sm leading-relaxed flex-1">{member.bio}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

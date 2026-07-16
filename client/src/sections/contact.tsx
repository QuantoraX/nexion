
import { motion } from "framer-motion";
import contactBg from "../assets/contact-bg.png";

export function Contact() {
    return (
        <section className="py-20 w-full flex items-center justify-center">
            <div className="max-w-5xl w-full mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                {/* Left Column: Contact Form */}
                <div className="flex flex-col">

                    <motion.div className="flex items-center gap-1.5"
                        initial={{ y: -20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                    >
                        <span className="size-1.5 bg-zinc-900"></span>
                        <span className="text-sm text-zinc-900">
                            CONTACT
                        </span>
                    </motion.div>

                    <motion.h2 className="text-3xl md:text-[40px]/11 text-zinc-900 mt-5 leading-tight font-medium max-w-100"
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
                    >
                        Let's Build Something <br />Great Together
                    </motion.h2>

                    {/* Form */}
                    <form className="mt-15 flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Name */}
                            <div className="flex flex-col">
                                <motion.label className="text-sm text-zinc-600 mb-2"
                                    initial={{ y: 50, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                                >
                                    YOUR NAME
                                </motion.label>
                                <motion.input type="text" placeholder="Michael Anderson" className="w-full border border-zinc-200 rounded-sm px-4 py-2.5 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-300 transition-colors" 
                                    initial={{ y: 50, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                                />
                            </div>

                            {/* Email */}
                            <div className="flex flex-col">
                                <motion.label className="text-sm text-zinc-600 mb-2"
                                    initial={{ y: 50, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                                >
                                    EMAIL ADDRESS
                                </motion.label>
                                <motion.input type="email" placeholder="michael@company.com" className="w-full border border-zinc-200 rounded-sm px-4 py-2.5 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-300 transition-colors" 
                                    initial={{ y: 50, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Phone */}
                            <div className="flex flex-col">
                                <motion.label className="text-sm text-zinc-600 mb-2"
                                    initial={{ y: 50, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                                >
                                    PHONE NUMBER
                                </motion.label>
                                <motion.input type="tel" placeholder="E.g. +1 234 567 8900" className="w-full border border-zinc-200 rounded-sm px-4 py-2.5 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-300 transition-colors" 
                                    initial={{ y: 50, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                                />
                            </div>

                            {/* Subject Dropdown */}
                            <div className="flex flex-col">
                                <motion.label className="text-sm text-zinc-600 mb-2"
                                    initial={{ y: 50, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                                >
                                    SERVICE NEEDED
                                </motion.label>
                                <motion.select
                                    className="w-full border border-zinc-200 rounded-sm px-4 py-2.5 text-xs text-zinc-800 bg-white focus:outline-none focus:border-zinc-300 transition-colors cursor-pointer appearance-none"
                                    defaultValue=""
                                    initial={{ y: 50, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                                >
                                    <option value="" disabled>Select a service...</option>
                                    <option value="web">Web Development</option>
                                    <option value="mobile">Mobile App</option>
                                    <option value="cloud">Cloud Migration</option>
                                    <option value="uiux">UI/UX Design</option>
                                </motion.select>
                            </div>
                        </div>

                        {/* Message */}
                        <div className="flex flex-col">
                            <motion.label className="text-sm text-zinc-600 mb-2"
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                            >
                                MESSAGE
                            </motion.label>
                            <motion.textarea rows={4} placeholder="Tell us about your project, goals, or challenges..." className="w-full border border-zinc-200 rounded-sm px-4 py-2.5 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-300 transition-colors resize-none" 
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                            />
                        </div>

                        {/* Submit Button */}
                        <motion.div className="mt-2"
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                        >
                            <button type="submit" className="bg-black hover:bg-zinc-900 text-white text-xs px-6 py-3.5 rounded-full transition-colors duration-200 cursor-pointer">
                                SEND MESSAGE
                            </button>
                        </motion.div>
                    </form>
                </div>

                {/* Right Column: Image Card */}
                <motion.div className="relative overflow-hidden group flex justify-center" 
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                >
                    <div className="relative w-95.5 h-113.75 overflow-hidden rounded-xl">
                        <img src={contactBg} alt="Code on screen" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 select-none brightness-80" />

                        {/* Details Content Overlay */}
                        <div className="absolute bottom-10 left-10 flex flex-col gap-2.5 z-10">
                            <span className="text-base text-white">
                                GET IN TOUCH
                            </span>
                            <motion.div className="flex flex-col gap-1 text-sm text-white"
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                            >
                                <p>Available Mon–Fri: 9 AM – 6 PM</p>
                                <p>Response within 24 hours</p>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}


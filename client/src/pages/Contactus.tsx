import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppContext } from "../context/appContext";
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    ArrowRight,
    ChevronDown,
    CheckCircle2,
    MessageSquare,
    Copy,
    Send,
    Sparkles
} from "lucide-react";
import { projectTypeOptions, contactFaqs } from "../data/contact-data";
import contactWorkspace from "../assets/contact-workspace.png";
import contactHeroBg from "../assets/contactus hero.jpg";

/* ─── Animation Variant ─────────────────────────────────────────── */
const fadeUp = {
    hidden: { y: 30, opacity: 0 },
    visible: (i = 0) => ({
        y: 0,
        opacity: 1,
        transition: { delay: i * 0.08, type: "spring" as const, stiffness: 240, damping: 70 }
    })
};

/* ─── FAQ Accordion Item ─────────────────────────────────────────── */
function FAQItem({ faq, index, open, onToggle }: {
    faq: { q: string; a: string };
    index: number;
    open: boolean;
    onToggle: () => void;
}) {
    return (
        <motion.div
            custom={index}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="border border-zinc-200 rounded-xl overflow-hidden bg-white shadow-xs"
        >
            <button
                onClick={onToggle}
                className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer hover:bg-zinc-50/50 transition-colors"
            >
                <span className="text-base font-medium text-zinc-900 pr-4">{faq.q}</span>
                <div className={`p-1.5 rounded-full bg-zinc-100 text-zinc-600 transition-transform duration-300 ${open ? "rotate-180 bg-zinc-950 text-white" : ""}`}>
                    <ChevronDown size={14} />
                </div>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="px-6 pb-6 pt-1 text-sm text-zinc-600 leading-relaxed border-t border-zinc-100/60">
                            {faq.a}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

/* ─── Main Component ──────────────────────────────────────────────── */
export default function Contactus() {
    const navigate = useNavigate();
    const { submitInquiry } = useAppContext();
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        projectType: "",
        message: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [copiedEmail, setCopiedEmail] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCopyEmail = () => {
        navigator.clipboard.writeText("nexionsoft0@gmail.com");
        setCopiedEmail(true);
        toast.success("Email address copied to clipboard!", {
            style: { borderRadius: "12px", background: "#18181b", color: "#fafafa", border: "1px solid #3f3f46" },
            iconTheme: { primary: "#10b981", secondary: "#18181b" }
        });
        setTimeout(() => setCopiedEmail(false), 2000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.projectType || !formData.message) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setIsSubmitting(true);

        const success = await submitInquiry({
            name: formData.name,
            email: formData.email,
            company: formData.company || "Not specified",
            budget: "Not Specified",
            projectType: formData.projectType,
            message: formData.message
        });

        setIsSubmitting(false);

        if (success) {
            setFormData({
                name: "",
                email: "",
                company: "",
                projectType: "",
                message: ""
            });
            setTimeout(() => {
                navigate("/");
            }, 1500);
        }
    };

    return (
        <div className="bg-white text-zinc-900 w-full overflow-x-hidden">

            {/* ══ 1. HERO SECTION ════════════════════════════════════════ */}
            <section className="relative flex flex-col items-center justify-center min-h-[60vh] px-4 text-center overflow-hidden bg-black bg-cover bg-center" style={{ backgroundImage: `url(${contactHeroBg})` }}>
                <div className="absolute inset-0 bg-black/70 pointer-events-none" />

                <motion.div
                    className="relative z-10 bg-white/10 backdrop-blur border border-white/20 text-xs text-white pl-3 pr-5 py-1.5 rounded-full flex items-center gap-2 mb-6"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring" as const, stiffness: 320, damping: 70 }}
                >
                    <MessageSquare size={13} />
                    <span>Let's Connect & Innovate</span>
                </motion.div>

                <motion.h1
                    className="relative z-10 text-4xl md:text-6xl font-medium leading-tight max-w-3xl text-white"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring" as const, stiffness: 240, damping: 70 }}
                >
                    Let’s build something great together
                </motion.h1>

                <motion.p
                    className="relative z-10 mt-4 text-zinc-300 max-w-lg text-sm md:text-base leading-relaxed"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring" as const, stiffness: 320, damping: 70 }}
                >
                    Whether you have a fully drafted project specification or just an early idea, we’re here to help you scope, design, and build your custom digital platform.
                </motion.p>
            </section>

            {/* ══ 2. TWO-COLUMN LAYOUT (FORM & DIRECT CONTACT) ══════════ */}
            <section className="py-20 px-4 md:px-16 lg:px-24 xl:px-32 w-full bg-zinc-50/50">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* Left: Contact Form Card */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                            className="bg-white border border-zinc-200/90 rounded-3xl p-6 md:p-10 shadow-sm"
                        >
                            <div className="flex items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-100">
                                <div>
                                    <h2 className="text-2xl font-medium text-zinc-900">Send Us a Message</h2>
                                    <p className="text-zinc-500 text-xs mt-1">Fill out the details below and we will get back to you within 24 hours.</p>
                                </div>
                                <div className="hidden sm:flex size-10 rounded-2xl bg-zinc-900 text-white items-center justify-center shrink-0">
                                    <Sparkles size={18} />
                                </div>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="name" className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="E.g. Alex Morgan"
                                            className="px-4 py-3 border border-zinc-200 rounded-xl text-sm bg-white text-zinc-900 focus:outline-none focus:border-zinc-950 hover:border-zinc-400 focus:ring-4 focus:ring-zinc-950/5 transition-all duration-300"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="email" className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                                            Email Address <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="alex@company.com"
                                            className="px-4 py-3 border border-zinc-200 rounded-xl text-sm bg-white text-zinc-900 focus:outline-none focus:border-zinc-950 hover:border-zinc-400 focus:ring-4 focus:ring-zinc-950/5 transition-all duration-300"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {/* Company / Website (Optional) */}
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="company" className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                                            Company / Website <span className="text-zinc-400 font-normal lowercase">(optional)</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                            placeholder="Acme Corp / https://..."
                                            className="px-4 py-3 border border-zinc-200 rounded-xl text-sm bg-white text-zinc-900 focus:outline-none focus:border-zinc-950 hover:border-zinc-400 focus:ring-4 focus:ring-zinc-950/5 transition-all duration-300"
                                        />
                                    </div>

                                    {/* Project Type */}
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="projectType" className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                                            Project Type <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <select
                                                id="projectType"
                                                name="projectType"
                                                value={formData.projectType}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full appearance-none px-4 py-3 border border-zinc-200 rounded-xl text-sm bg-white text-zinc-900 focus:outline-none focus:border-zinc-950 hover:border-zinc-400 focus:ring-4 focus:ring-zinc-950/5 transition-all duration-300 pr-10 cursor-pointer"
                                            >
                                                {projectTypeOptions.map(opt => (
                                                    <option key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={16} />
                                        </div>
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="message" className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                                        Project Details & Message <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Please describe your requirements, key features, goals, or timeline..."
                                        className="px-4 py-3 border border-zinc-200 rounded-xl text-sm bg-white text-zinc-900 focus:outline-none focus:border-zinc-950 hover:border-zinc-400 focus:ring-4 focus:ring-zinc-950/5 transition-all duration-300 resize-none leading-relaxed"
                                    />
                                </div>

                                {/* Submit button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full flex items-center justify-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white py-4 px-6 rounded-xl text-sm font-medium transition duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed shadow-md mt-2"
                                >
                                    {isSubmitting ? (
                                        <span>Submitting Inquiry...</span>
                                    ) : (
                                        <>
                                            <Send size={15} />
                                            <span>Send Message</span>
                                            <ArrowRight size={15} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </div>

                    {/* Right: Direct Contact & Info Panel */}
                    <div className="lg:col-span-5 flex flex-col gap-8">
                        {/* Direct Contact Info Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 200, damping: 60 }}
                            className="bg-black text-white rounded-3xl p-8 shadow-xl flex flex-col gap-6 relative overflow-hidden"
                        >
                            {/* Decorative background glow */}
                            <div className="absolute -top-24 -right-24 size-64 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

                            <div className="flex flex-col gap-2 relative z-10">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 bg-indigo-950/80 border border-indigo-800/80 px-3 py-1 rounded-full w-fit">
                                    Direct Contact
                                </span>
                                <h3 className="text-2xl font-medium text-white leading-tight mt-2">
                                    We’re here to help you scope and build.
                                </h3>
                                <p className="text-zinc-400 text-xs leading-relaxed">
                                    Prefer standard communication channels? Feel free to reach out directly.
                                </p>
                            </div>

                            {/* Prominent Direct Email Highlight Box */}
                            <div className="relative z-10 bg-zinc-900/90 border border-zinc-800 p-5 rounded-2xl flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] uppercase font-semibold text-zinc-400 tracking-wider flex items-center gap-1.5">
                                        <Mail size={12} className="text-indigo-400" />
                                        Primary Email Address
                                    </span>
                                    <button
                                        type="button"
                                        onClick={handleCopyEmail}
                                        className="text-[10px] text-zinc-400 hover:text-white flex items-center gap-1 bg-zinc-800 hover:bg-zinc-700 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                                    >
                                        <Copy size={11} />
                                        <span>{copiedEmail ? "Copied!" : "Copy"}</span>
                                    </button>
                                </div>
                                <a
                                    href="mailto:nexionsoft0@gmail.com"
                                    className="text-lg font-bold text-white hover:text-indigo-300 transition-colors break-all flex items-center gap-2 group"
                                >
                                    <span>nexionsoft0@gmail.com</span>
                                    <ArrowRight size={16} className="text-zinc-500 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>

                            {/* Other Contact Channels */}
                            <div className="relative z-10 flex flex-col gap-4 pt-2">
                                <div className="flex items-center gap-3.5 p-3.5 bg-zinc-900/50 border border-zinc-850 rounded-xl">
                                    <div className="p-2.5 bg-zinc-800 text-white rounded-lg">
                                        <Phone size={16} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-medium">Call or WhatsApp</span>
                                        <a href="https://wa.me/9477000000" target="_blank" rel="noreferrer" className="text-xs font-semibold text-white hover:underline">
                                            +94 77 000 0000
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3.5 p-3.5 bg-zinc-900/50 border border-zinc-850 rounded-xl">
                                    <div className="p-2.5 bg-zinc-800 text-white rounded-lg">
                                        <MapPin size={16} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-medium">Remote-First Operations</span>
                                        <span className="text-xs font-semibold text-white">Colombo, Sri Lanka · Global Clients</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3.5 p-3.5 bg-zinc-900/50 border border-zinc-850 rounded-xl">
                                    <div className="p-2.5 bg-zinc-800 text-white rounded-lg">
                                        <Clock size={16} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-medium">Guaranteed SLA Response</span>
                                        <span className="text-xs font-semibold text-white">Within 24 business hours</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Image Banner Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 180, damping: 50 }}
                            className="relative w-full h-56 rounded-3xl overflow-hidden border border-zinc-200 shadow-sm"
                        >
                            <img
                                src={contactWorkspace}
                                alt="Modern tech workspace"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
                            <div className="absolute bottom-5 left-5 right-5 flex items-center gap-2.5 text-white">
                                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                                <span className="text-xs font-medium text-zinc-200">Verified Custom Software Engineering Firm</span>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* ══ 3. FAQ SECTION ════════════════════════════════════════ */}
            <section className="py-20 px-4 md:px-16 lg:px-24 xl:px-32 bg-white w-full border-t border-zinc-100">
                <div className="max-w-3xl mx-auto">
                    <div className="flex flex-col items-center text-center mb-12">
                        <motion.div
                            className="flex items-center gap-1.5 mb-4"
                            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        >
                            <span className="size-1.5 bg-zinc-900 inline-block rounded-full" />
                            <span className="text-xs text-zinc-900 uppercase tracking-widest font-semibold">Frequently Asked Questions</span>
                        </motion.div>
                        <motion.h2
                            className="text-3xl md:text-4xl font-medium text-zinc-900 leading-tight"
                            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        >
                            Got questions? We have answers.
                        </motion.h2>
                    </div>

                    <div className="flex flex-col gap-3">
                        {contactFaqs.map((faq, i) => (
                            <FAQItem
                                key={i}
                                faq={faq}
                                index={i}
                                open={openFAQ === i}
                                onToggle={() => setOpenFAQ(openFAQ === i ? null : i)}
                            />
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}

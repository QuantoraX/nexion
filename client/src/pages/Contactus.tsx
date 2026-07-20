import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getContactSubmissions, saveContactSubmissions, ContactSubmission } from "../data/data";
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    ArrowRight,
    ChevronDown,
    CheckCircle2,
    MessageSquare,
} from "lucide-react";
import { budgetOptions, projectTypeOptions, contactInfo, contactFaqs } from "../data/contact-data";
import contactWorkspace from "../assets/contact-workspace.png";

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
            className="border border-zinc-200 rounded-xl overflow-hidden bg-white"
        >
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group cursor-pointer hover:bg-zinc-50 transition-colors duration-200"
            >
                <span className="text-zinc-900 font-medium text-sm md:text-base leading-snug">{faq.q}</span>
                <ChevronDown
                    size={18}
                    className={`text-zinc-400 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                />
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="px-6 pb-5 text-zinc-500 text-sm leading-relaxed border-t border-zinc-100 pt-4">
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
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        budget: "",
        projectType: "",
        message: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.projectType || !formData.message) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setIsSubmitting(true);

        // Save submission to localStorage
        const submissions = getContactSubmissions();
        const newSub: ContactSubmission = {
            id: Date.now().toString(),
            name: formData.name,
            email: formData.email,
            company: formData.company || "None",
            budget: formData.budget || "Not Specified",
            projectType: formData.projectType,
            message: formData.message,
            date: new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }),
            status: "new"
        };
        submissions.unshift(newSub);
        saveContactSubmissions(submissions);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            toast.success("Thank you! We will get in touch within 24 hours.", {
                style: { borderRadius: "12px", background: "#18181b", color: "#fafafa", border: "1px solid #3f3f46" },
                iconTheme: { primary: "#10b981", secondary: "#18181b" }
            });
            setFormData({
                name: "",
                email: "",
                company: "",
                budget: "",
                projectType: "",
                message: ""
            });
            setTimeout(() => {
                navigate("/");
            }, 1500);
        }, 1200);
    };

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case "email": return <Mail className="size-5 text-zinc-700" />;
            case "phone": return <Phone className="size-5 text-zinc-700" />;
            case "location": return <MapPin className="size-5 text-zinc-700" />;
            case "clock": return <Clock className="size-5 text-zinc-700" />;
            default: return null;
        }
    };

    return (
        <div className="bg-white text-zinc-900 w-full overflow-x-hidden">

            {/* ══ 1. HERO SECTION ════════════════════════════════════════ */}
            <section className="relative flex flex-col items-center justify-center min-h-[65vh] px-4 text-center overflow-hidden bg-black bg-[url('/tech-hero-bg.png')] bg-cover bg-center">
                <div className="absolute inset-0 bg-black/60 pointer-events-none" />

                <motion.div
                    className="relative z-10 bg-white/10 backdrop-blur border border-white/20 text-sm text-white pl-3 pr-5 py-1.5 rounded-full flex items-center gap-2 mb-6"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring" as const, stiffness: 320, damping: 70 }}
                >
                    <MessageSquare size={14} />
                    <span>Let's Connect</span>
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
                    className="relative z-10 mt-4 text-zinc-300 max-w-lg text-base leading-relaxed"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring" as const, stiffness: 320, damping: 70 }}
                >
                    Whether you have a fully drafted spec or just an idea, we’re here to help you scope, design, and build your digital solution.
                </motion.p>
            </section>

            {/* ══ 2. TWO-COLUMN LAYOUT (FORM & DETAILS) ═════════════════ */}
            <section className="py-20 px-4 md:px-16 lg:px-24 xl:px-32 w-full">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
                    
                    {/* Left: Contact Form */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                            className="bg-white border border-zinc-200 rounded-2xl p-6 md:p-10 shadow-sm"
                        >
                            <h2 className="text-2xl font-medium text-zinc-900 mb-6">Send Us a Message</h2>
                            
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="name" className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="John Doe"
                                            className="px-4 py-3 border border-zinc-200 rounded-lg text-sm bg-white text-zinc-900 focus:outline-none focus:border-zinc-950 hover:border-zinc-400 focus:ring-4 focus:ring-zinc-950/5 focus:shadow-[0_0_20px_rgba(24,24,27,0.08)] transition-all duration-300"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="email" className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                                            Email Address <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="john@company.com"
                                            className="px-4 py-3 border border-zinc-200 rounded-lg text-sm bg-white text-zinc-900 focus:outline-none focus:border-zinc-950 hover:border-zinc-400 focus:ring-4 focus:ring-zinc-950/5 focus:shadow-[0_0_20px_rgba(24,24,27,0.08)] transition-all duration-300"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {/* Company Name */}
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="company" className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                                            Company / Website <span className="text-zinc-400 font-normal">(Optional)</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                            placeholder="Acme Corp"
                                            className="px-4 py-3 border border-zinc-200 rounded-lg text-sm bg-white text-zinc-900 focus:outline-none focus:border-zinc-950 hover:border-zinc-400 focus:ring-4 focus:ring-zinc-950/5 focus:shadow-[0_0_20px_rgba(24,24,27,0.08)] transition-all duration-300"
                                        />
                                    </div>

                                    {/* Project Budget */}
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="budget" className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                                            Project Budget
                                        </label>
                                        <div className="relative">
                                            <select
                                                id="budget"
                                                name="budget"
                                                value={formData.budget}
                                                onChange={handleInputChange}
                                                className="w-full appearance-none px-4 py-3 border border-zinc-200 rounded-lg text-sm bg-white text-zinc-900 focus:outline-none focus:border-zinc-950 hover:border-zinc-400 focus:ring-4 focus:ring-zinc-950/5 focus:shadow-[0_0_20px_rgba(24,24,27,0.08)] transition-all duration-300 pr-10"
                                            >
                                                {budgetOptions.map(opt => (
                                                    <option key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={16} />
                                        </div>
                                    </div>
                                </div>

                                {/* Project Type */}
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="projectType" className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                                        Project Type <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="projectType"
                                            name="projectType"
                                            value={formData.projectType}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full appearance-none px-4 py-3 border border-zinc-200 rounded-lg text-sm bg-white text-zinc-900 focus:outline-none focus:border-zinc-950 hover:border-zinc-400 focus:ring-4 focus:ring-zinc-950/5 focus:shadow-[0_0_20px_rgba(24,24,27,0.08)] transition-all duration-300 pr-10"
                                        >
                                            {projectTypeOptions.map(opt => (
                                                <option key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={16} />
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="message" className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                                        Project Details <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Please tell us a bit about what you want to build, key features, and scope..."
                                        className="px-4 py-3 border border-zinc-200 rounded-lg text-sm bg-white text-zinc-900 focus:outline-none focus:border-zinc-950 hover:border-zinc-400 focus:ring-4 focus:ring-zinc-950/5 focus:shadow-[0_0_20px_rgba(24,24,27,0.08)] transition-all duration-300 resize-none"
                                    />
                                </div>

                                {/* Submit button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full flex items-center justify-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white py-3.5 px-6 rounded-lg text-sm font-medium transition cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                                >
                                    {isSubmitting ? (
                                        <span>Submitting...</span>
                                    ) : (
                                        <>
                                            <span>Book Free Consultation</span>
                                            <ArrowRight size={16} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </div>

                    {/* Right: Info details and trust badges */}
                    <div className="lg:col-span-5 flex flex-col justify-between gap-12">
                        {/* Direct Contact info */}
                        <div className="flex flex-col gap-8">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 200, damping: 60 }}
                                className="flex flex-col gap-4"
                            >
                                <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">Direct Contact</span>
                                <h3 className="text-2xl font-medium text-zinc-900 leading-tight">We’re here to help you scope and build.</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">
                                    Prefer standard communication channels? Feel free to reach out directly.
                                </p>
                            </motion.div>

                            <div className="flex flex-col gap-6">
                                {contactInfo.map((info, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.05, type: "spring", stiffness: 200, damping: 60 }}
                                        className="flex gap-4 p-4 border border-zinc-150 rounded-xl hover:shadow-sm transition-shadow bg-white"
                                    >
                                        <div className="p-2.5 bg-zinc-100 rounded-lg shrink-0 h-fit">
                                            {getIcon(info.icon)}
                                        </div>
                                        <div>
                                            <span className="text-xs text-zinc-400 font-medium block uppercase tracking-widest">{info.label}</span>
                                            {info.href ? (
                                                <a
                                                    href={info.href}
                                                    target={info.href.startsWith("http") ? "_blank" : "_self"}
                                                    rel="noreferrer"
                                                    className="text-zinc-950 font-medium text-sm hover:underline"
                                                >
                                                    {info.value}
                                                </a>
                                            ) : (
                                                <span className="text-zinc-950 font-medium text-sm">{info.value}</span>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Image decoration */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 180, damping: 50 }}
                            className="relative w-full aspect-4/3 rounded-2xl overflow-hidden border border-zinc-200"
                        >
                            <img
                                src={contactWorkspace}
                                alt="Modern tech workspace"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/45 to-transparent pointer-events-none" />
                            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-white">
                                <CheckCircle2 size={16} className="text-zinc-100" />
                                <span className="text-xs font-medium">Verified Custom Software Engineering Firm</span>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* ══ 3. FAQ SECTION ════════════════════════════════════════ */}
            <section className="py-20 px-4 md:px-16 lg:px-24 xl:px-32 bg-gray-50 w-full border-t border-zinc-100">
                <div className="max-w-3xl mx-auto">
                    <div className="flex flex-col items-center text-center mb-12">
                        <motion.div
                            className="flex items-center gap-1.5 mb-5"
                            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        >
                            <span className="size-1.5 bg-zinc-900 inline-block rounded-full" />
                            <span className="text-sm text-zinc-900 uppercase tracking-widest font-medium">FAQ</span>
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

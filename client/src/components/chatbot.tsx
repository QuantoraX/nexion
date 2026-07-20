import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
    Sparkles, 
    X, 
    Send, 
    Bot, 
    User, 
    RotateCcw, 
    ChevronRight, 
    ArrowUpRight,
    Zap
} from "lucide-react";
import { useAppContext } from "../context/appContext";

interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: string;
}

const INITIAL_GREETING: ChatMessage = {
    id: "welcome-1",
    role: "assistant",
    content: `Hello! I'm **NOVA**, the AI Consultant for **Nexion Solutions**. ⚡

How can I assist your team today? Feel free to ask about:
• Our **custom software & mobile app** services
• **Pricing guidelines & budget tiers**
• Our **modern tech stack & cloud architectures**
• How to **book a free 30-min discovery call**`,
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
};

const SUGGESTED_PROMPTS = [
    "What services do you offer?",
    "How much does custom software cost?",
    "What tech stack do you use?",
    "How can I book a discovery call?"
];

export function Chatbot() {
    const { sendChatMessage } = useAppContext();
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto scroll to latest message
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isTyping, isOpen]);

    // Handle sending message
    const handleSend = async (textToSend?: string) => {
        const query = (textToSend || input).trim();
        if (!query || isTyping) return;

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            role: "user",
            content: query,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        };

        const updatedHistory = [...messages, userMsg];
        setMessages(updatedHistory);
        if (!textToSend) setInput("");
        setIsTyping(true);

        // Map for API history payload (only role & content)
        const apiPayload = updatedHistory.map(m => ({
            role: m.role,
            content: m.content
        }));

        const responseText = await sendChatMessage(apiPayload);

        const botMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: responseText,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        };

        setMessages(prev => [...prev, botMsg]);
        setIsTyping(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const resetChat = () => {
        setMessages([INITIAL_GREETING]);
        setInput("");
    };

    // Helper: Simple Markdown formatting parser (handles **bold**, • bullets, and linebreaks)
    const formatMessageText = (text: string) => {
        const lines = text.split("\n");
        return lines.map((line, idx) => {
            // Process bold markers **text**
            const parts = line.split(/(\*\*.*?\*\*)/g);
            const formattedLine = parts.map((part, pIdx) => {
                if (part.startsWith("**") && part.endsWith("**")) {
                    return <strong key={pIdx} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
                }
                return part;
            });

            const isBullet = line.trim().startsWith("•") || line.trim().startsWith("-");

            return (
                <span key={idx} className={`block ${isBullet ? "pl-2 py-0.5" : idx > 0 ? "mt-1.5" : ""}`}>
                    {formattedLine}
                </span>
            );
        });
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 font-sans select-none">
            {/* ══ 1. FLOATING LAUNCHER BUTTON ════════════════════════════ */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(true)}
                        className="group relative flex items-center gap-3 bg-zinc-950 text-white pl-4 pr-5 py-3 rounded-full border border-zinc-800 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-zinc-700 transition-all cursor-pointer overflow-hidden"
                    >
                        {/* Glow ambient background */}
                        <div className="absolute inset-0 bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-transparent pointer-events-none group-hover:opacity-100 opacity-60 transition-opacity" />

                        {/* Bot Avatar Icon */}
                        <div className="relative size-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-indigo-400 group-hover:text-indigo-300 transition-colors shrink-0">
                            <Sparkles size={16} className="animate-pulse" />
                            <span className="absolute -top-0.5 -right-0.5 size-2.5 bg-emerald-500 rounded-full border-2 border-zinc-950" />
                        </div>

                        <div className="flex flex-col items-start text-left">
                            <span className="text-xs font-semibold tracking-tight leading-none text-zinc-100 flex items-center gap-1">
                                <span>Ask NOVA AI</span>
                                <span className="bg-indigo-950 border border-indigo-900 text-indigo-400 text-[8px] font-bold px-1.5 py-0.2 rounded uppercase tracking-wider">ONLINE</span>
                            </span>
                            <span className="text-[10px] text-zinc-400 mt-1">Tech & Project Assistant</span>
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* ══ 2. CHAT DRAWER MODAL WINDOW ════════════════════════════ */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        className="w-[92vw] sm:w-[400px] h-[580px] max-h-[85vh] bg-zinc-950/95 backdrop-blur-2xl border border-zinc-800/90 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden relative"
                    >
                        {/* Background subtle ambient lights */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

                        {/* ── HEADER ── */}
                        <div className="px-5 py-4 bg-zinc-900/60 border-b border-zinc-850 flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="size-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-indigo-400 relative">
                                    <Bot size={18} />
                                    <span className="absolute bottom-0 right-0 size-2.5 bg-emerald-500 rounded-full border-2 border-zinc-950" />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-xs font-semibold text-white flex items-center gap-1.5">
                                        <span>NOVA Assistant</span>
                                        <Zap size={11} className="text-amber-400 fill-amber-400" />
                                    </h3>
                                    <span className="text-[10px] text-zinc-400">Nexion Solutions AI Consultant</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-1">
                                <button
                                    onClick={resetChat}
                                    title="Reset Conversation"
                                    className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-850 rounded-lg transition-colors cursor-pointer"
                                >
                                    <RotateCcw size={14} />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    title="Close Chat"
                                    className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-850 rounded-lg transition-colors cursor-pointer"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>

                        {/* ── MESSAGES THREAD ── */}
                        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 relative z-10">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex gap-3 max-w-[88%] ${
                                        msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                                    }`}
                                >
                                    {/* Avatar */}
                                    <div
                                        className={`size-7 rounded-full flex items-center justify-center shrink-0 text-xs border ${
                                            msg.role === "user"
                                                ? "bg-white text-zinc-950 border-white"
                                                : "bg-zinc-900 text-indigo-400 border-zinc-800"
                                        }`}
                                    >
                                        {msg.role === "user" ? <User size={13} /> : <Bot size={13} />}
                                    </div>

                                    {/* Bubble */}
                                    <div className="flex flex-col gap-1">
                                        <div
                                            className={`px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                                                msg.role === "user"
                                                    ? "bg-white text-zinc-950 rounded-tr-xs font-medium shadow-sm"
                                                    : "bg-zinc-900/90 border border-zinc-850 text-zinc-300 rounded-tl-xs shadow-sm"
                                            }`}
                                        >
                                            {formatMessageText(msg.content)}
                                        </div>
                                        <span className="text-[9px] text-zinc-500 px-1">
                                            {msg.timestamp}
                                        </span>
                                    </div>
                                </div>
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <div className="flex gap-3 max-w-[88%] mr-auto items-end">
                                    <div className="size-7 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-indigo-400 shrink-0">
                                        <Bot size={13} />
                                    </div>
                                    <div className="bg-zinc-900/90 border border-zinc-850 px-4 py-3 rounded-2xl rounded-tl-xs flex items-center gap-1.5 text-zinc-400">
                                        <span className="size-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        <span className="size-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <span className="size-1.5 bg-zinc-500 rounded-full animate-bounce" />
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* ── QUICK SUGGESTION PILLS ── */}
                        {messages.length <= 2 && (
                            <div className="px-4 py-2 border-t border-zinc-900 flex items-center gap-1.5 overflow-x-auto no-scrollbar relative z-10">
                                {SUGGESTED_PROMPTS.map((prompt, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleSend(prompt)}
                                        className="shrink-0 text-[10px] text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-850 border border-zinc-800/80 px-3 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1"
                                    >
                                        <span>{prompt}</span>
                                        <ChevronRight size={10} className="text-zinc-500" />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* ── INPUT FORM & ACTION BAR ── */}
                        <div className="p-3 bg-zinc-900/80 border-t border-zinc-850 flex flex-col gap-2 relative z-10">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSend();
                                }}
                                className="flex items-center gap-2"
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ask NOVA anything about your project..."
                                    className="flex-1 bg-zinc-950 border border-zinc-850 focus:border-zinc-700 text-zinc-100 placeholder-zinc-500 px-4 py-2.5 rounded-xl text-xs focus:outline-none transition-colors"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isTyping}
                                    className="size-9 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0 shadow-sm"
                                >
                                    <Send size={14} />
                                </button>
                            </form>

                            {/* Direct Lead Booking CTA */}
                            <div className="flex items-center justify-between px-1 text-[10px] text-zinc-500">
                                <span>Powered by Nexion AI Core</span>
                                <Link
                                    to="/contact"
                                    onClick={() => setIsOpen(false)}
                                    className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-0.5 transition-colors"
                                >
                                    <span>Book Discovery Call</span>
                                    <ArrowUpRight size={11} />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

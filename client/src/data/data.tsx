import React from "react";
import { Code2, BrainCircuit, Layers, ShieldCheck, Headset } from "lucide-react";
import wcuCustomDev from "../assets/wcu_custom_dev.png";
import wcuConsultation from "../assets/wcu_consultation.png";
import wcuAgileDelivery from "../assets/wcu_agile_delivery.png";
import wcuSecureScalable from "../assets/wcu_secure_scalable.png";
import wcuSupport from "../assets/wcu_support.png";

export interface WhyChooseUsItem {
    icon: React.ReactNode;
    title: string;
    description: string;
    image: string;
}

export const whyChooseUsData: WhyChooseUsItem[] = [
    {
        icon: <Code2 className="size-5 text-zinc-600" />,
        title: "Custom Software Development",
        description: "Tailor-made web and mobile applications built with cutting-edge technologies to match your exact business needs.",
        image: wcuCustomDev
    },
    {
        icon: <BrainCircuit className="size-5 text-zinc-600" />,
        title: "Expert Tech Consultation",
        description: "Make informed technology decisions with our seasoned architects who analyze your workflows and future goals.",
        image: wcuConsultation
    },
    {
        icon: <Layers className="size-5 text-zinc-600" />,
        title: "Agile & Seamless Delivery",
        description: "We guide you through every sprint, from UI/UX wireframing and development to final deployment and cloud hosting.",
        image: wcuAgileDelivery
    },
    {
        icon: <ShieldCheck className="size-5 text-zinc-600" />,
        title: "Scalable & Secure Solutions",
        description: "High-performance architectures built with top-tier security standards, ready to grow as your business scales.",
        image: wcuSecureScalable
    },
    {
        icon: <Headset className="size-5 text-zinc-600" />,
        title: "24/7 Dedicated Support",
        description: "Our technical team is available round-the-clock to monitor infrastructure, fix bugs, and ensure zero downtime.",
        image: wcuSupport
    }
];

export interface TestimonialItem {
    name: string;
    location: string;
    avatar: string;
    text: string;
}

export const testimonialsCol1: TestimonialItem[] = [
    {
        name: "Michael Anderson",
        location: "CTO, Nexaflow Inc.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=120&h=120&q=80",
        text: "The custom dashboard they built completely transformed how we monitor our operations. Delivered on time and beyond expectations."
    },
    {
        name: "Sarah Thompson",
        location: "Founder, Bloom Digital",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=120&h=120&q=80",
        text: "Exceptional team. They understood our vision from day one and turned it into a scalable product we're proud to ship."
    },
    {
        name: "Emma Rodriguez",
        location: "Product Lead, Orbita SaaS",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=120&h=120&q=80",
        text: "From initial wireframes to deployment, their attention to detail and technical expertise was outstanding."
    }
];

export const testimonialsCol2: TestimonialItem[] = [
    {
        name: "David Wilson",
        location: "CEO, Stackline Labs",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=120&h=120&q=80",
        text: "Their expertise in cloud architecture saved us months of engineering time. The performance gains were immediately visible."
    },
    {
        name: "Daniel Kim",
        location: "Head of Engineering, Velotra",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?fit=crop&w=120&h=120&q=80",
        text: "We brought them in for a critical migration and they nailed it. Zero downtime, clean code, and great communication throughout."
    },
    {
        name: "James Parker",
        location: "Startup Founder, Clario AI",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?fit=crop&w=120&h=120&q=80",
        text: "As a non-technical founder, I felt fully supported. They translated my ideas into a working MVP within six weeks."
    }
];

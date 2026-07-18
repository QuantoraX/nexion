/* ─── Contact Page Data ──────────────────────────────────────────── */

export interface FAQ {
    q: string;
    a: string;
}

export const budgetOptions = [
    { value: "", label: "Select your budget range" },
    { value: "under-5k",   label: "Under $5,000" },
    { value: "5k-20k",     label: "$5,000 – $20,000" },
    { value: "20k-50k",    label: "$20,000 – $50,000" },
    { value: "50k-plus",   label: "$50,000+" },
];

export const projectTypeOptions = [
    { value: "",                 label: "Select project type" },
    { value: "web",              label: "Web Development" },
    { value: "mobile",           label: "Mobile App (iOS / Android)" },
    { value: "custom-software",  label: "Custom Software" },
    { value: "uiux",             label: "UI/UX Design" },
    { value: "cloud",            label: "Cloud & DevOps" },
    { value: "consulting",       label: "Tech Consulting" },
];

export const contactInfo = [
    {
        icon: "email",
        label: "Email Us",
        value: "hello@nexion.solutions",
        href: "mailto:hello@nexion.solutions",
    },
    {
        icon: "phone",
        label: "Call or WhatsApp",
        value: "+94 77 000 0000",
        href: "https://wa.me/9477000000",
    },
    {
        icon: "location",
        label: "Remote-First Agency",
        value: "Colombo, Sri Lanka · Global Operations",
        href: null,
    },
    {
        icon: "clock",
        label: "Response Time",
        value: "Within 24 business hours",
        href: null,
    },
];

export const contactFaqs: FAQ[] = [
    {
        q: "What happens after I submit the form?",
        a: "You'll receive an acknowledgement email immediately. Within one business day, one of our senior consultants will reach out to schedule a free 30-minute discovery call to understand your project and propose a way forward.",
    },
    {
        q: "Is my project idea safe with you?",
        a: "Absolutely. We sign a mutual Non-Disclosure Agreement (NDA) before any technical or business discussions take place. Your idea, data, and intellectual property are fully protected from day one.",
    },
    {
        q: "Do you work on fixed-price or hourly projects?",
        a: "Both. For well-defined scopes we offer fixed-price proposals. For evolving projects we use a transparent time-and-materials model with weekly billing summaries. We'll recommend the best fit after our discovery call.",
    },
];

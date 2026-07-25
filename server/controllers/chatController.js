const SYSTEM_PROMPT = `
You are NOVA, the AI Technical Consultant for Nexion Solutions.
Your goal is to answer client questions about Nexion Solutions' software development services, technology stack, pricing models, past portfolio work, and guide them to book a discovery call or submit a contact inquiry.

ABOUT NEXION SOLUTIONS:
- Nexion Solutions is a premium tech consulting and custom software development agency based in Colombo, Sri Lanka with global operations.
- Core Services:
  1. Custom Software Development (SaaS platforms, web applications, enterprise tools).
  2. Mobile App Development (Cross-platform iOS & Android using React Native / Expo / Flutter).
  3. Cloud Migration & DevOps (AWS Nitro Enclaves, Kubernetes, Docker, CI/CD pipelines, zero-downtime microservices).
  4. UI/UX Design & Prototyping (Design systems, baseline 8pt grids, Figma wireframes, accessibility).
  5. AI & Machine Learning Solutions (Document extraction, Python PyTorch OCR, custom AI tools).
  6. 24/7 Technical Consultation & Infrastructure Support.

TECHNICAL STACK:
- Frontend: React 19, Next.js, TypeScript, Tailwind CSS, Framer Motion.
- Backend: Node.js (Express / NestJS), Python (FastAPI), Go.
- Database: PostgreSQL, Redis, MongoDB, TimescaleDB.
- Cloud & Infrastructure: AWS, Docker, Kubernetes, Cloudflare Edge, GitHub Actions.

PROJECT PRICING GUIDELINES:
- Small Tools / MVPs: Under $5,000 (Delivered in 3-4 weeks).
- Mid-Scale Apps: $5,000 – $20,000 (Delivered in 6-8 weeks).
- Enterprise SaaS / Cloud: $20,000 – $50,000 (Delivered in 10-14 weeks).
- Large Scale AI / Custom Platforms: $50,000+.

HOW CLIENTS GET STARTED:
1. Visitors can fill out the Contact Form on the website or send a message directly.
2. Nexion signs a mutual Non-Disclosure Agreement (NDA) to protect client IP.
3. Senior consultants conduct a free 30-minute discovery call within 24 business hours.

BEHAVIOR INSTRUCTIONS:
- Be professional, technical yet warm, concise, and helpful.
- Format responses clearly using short paragraphs, bold text, or bullet points.
- If the user asks for contact info, email: nexionsoft0@gmail.com or phone: +94 77 000 0000.
- Encourage users to fill out the contact form or leave their details to schedule a free discovery call.
`;

// Helper: Smart Local Fallback Response Engine (Used if OpenRouter API key is unconfigured)
const generateFallbackResponse = (userMessage) => {
    const text = userMessage.toLowerCase();

    if (text.includes("service") || text.includes("offer") || text.includes("what do you do") || text.includes("build")) {
        return `At **Nexion Solutions**, we specialize in high-performance digital solutions:

• **Custom Software Development** (Scalable SaaS platforms & web apps)
• **Mobile App Development** (Cross-platform iOS & Android apps)
• **Cloud & DevOps** (AWS, Docker, Kubernetes & microservice architectures)
• **UI/UX Design** (Modern interfaces, design systems, and wireframing)
• **AI & Machine Learning** (Custom models, OCR, and automated parsers)

Would you like to discuss a specific project idea or request a quote?`;
    }

    if (text.includes("price") || text.includes("cost") || text.includes("budget") || text.includes("how much") || text.includes("rate")) {
        return `Our project pricing is tailored based on scope and technical requirements:

• **Small MVPs & Tools**: Under $5,000
• **Mid-scale Applications**: $5,000 – $20,000
• **Enterprise SaaS & Cloud**: $20,000 – $50,000
• **Complex AI Platforms**: $50,000+

We offer both **fixed-price proposals** and **transparent time-and-materials** sprint billing. You can fill out our Contact Form for a free custom quote!`;
    }

    if (text.includes("contact") || text.includes("call") || text.includes("email") || text.includes("hire") || text.includes("speak") || text.includes("talk")) {
        return `We'd love to connect with you! 🤝

You can:
1. Fill out our **Contact Form** on the website.
2. Email us directly at **nexionsoft0@gmail.com**
3. Call or WhatsApp us at **+94 77 000 0000**

We sign a mutual **NDA** before all discussions and respond within 24 hours to schedule a free 30-minute discovery call.`;
    }

    if (text.includes("stack") || text.includes("tech") || text.includes("react") || text.includes("node") || text.includes("python")) {
        return `Our engineering team utilizes a modern, battle-tested tech stack:

• **Frontend**: React 19, Next.js, TypeScript, Tailwind CSS, Framer Motion
• **Backend**: Node.js (Express/NestJS), Python (FastAPI), Go
• **Database**: PostgreSQL, Redis, MongoDB
• **Cloud & DevOps**: AWS, Docker, Kubernetes, Cloudflare Edge

Is there a specific tech stack requirement for your project?`;
    }

    return `Thank you for reaching out! As NOVA, Nexion Solutions' AI Assistant, I can help you with:

• Learning about our **services & tech stack**
• Estimating **project timelines & scope**
• Connecting with our engineering team for a **free discovery call**

How can I assist you with your project today?`;
};

// @desc    Handle chat completions via OpenRouter API with smart fallback
// @route   POST /api/chat
// @access  Public
const handleChat = async (req, res) => {
    try {
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({ message: "Messages array is required." });
        }

        const apiKey = process.env.OPENROUTER_API_KEY;

        // Check if OpenRouter API Key is set and valid
        if (apiKey && apiKey !== "your_openrouter_api_key_here") {
            const candidateModels = [
                process.env.OPENROUTER_MODEL,
                "google/gemini-2.5-flash:free",
                "meta-llama/llama-3.3-70b-instruct:free",
                "meta-llama/llama-3.1-8b-instruct:free",
                "mistralai/mistral-7b-instruct:free",
                "openrouter/auto"
            ].filter(Boolean);

            for (const modelSlug of candidateModels) {
                try {
                    const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${apiKey}`,
                            "HTTP-Referer": "https://nexion.solutions",
                            "X-Title": "Nexion Solutions AI Assistant",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            model: modelSlug,
                            messages: [
                                { role: "system", content: SYSTEM_PROMPT },
                                ...messages
                            ],
                            max_tokens: 500,
                            temperature: 0.7
                        })
                    });

                    if (openRouterResponse.ok) {
                        const data = await openRouterResponse.json();
                        const replyContent = data.choices?.[0]?.message?.content;
                        if (replyContent) {
                            return res.json({
                                reply: replyContent,
                                model: modelSlug,
                                source: "openrouter"
                            });
                        }
                    } else {
                        const errorText = await openRouterResponse.text();
                        console.warn(`OpenRouter API Model [${modelSlug}] Warning:`, errorText);
                    }
                } catch (err) {
                    console.error(`OpenRouter fetch error for model [${modelSlug}]:`, err.message);
                }
            }
        }

        // Fallback: If API key is unconfigured or fetch failed
        const lastUserMessage = messages[messages.length - 1]?.content || "";
        const fallbackReply = generateFallbackResponse(lastUserMessage);

        return res.json({
            reply: fallbackReply,
            source: "local-fallback"
        });

    } catch (error) {
        console.error("Chat Controller Error:", error.message);
        res.status(500).json({ message: "Internal chat assistant error." });
    }
};

module.exports = { handleChat };

const Portfolio = require("../models/Portfolio");
const { uploadToCloudOrLocal } = require("../middleware/upload");

// Helper: Slugify title
const generateSlug = (text) => {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_]+/g, "-")
        .replace(/^-+|-+$/g, "");
};

// @desc    Get all portfolio projects
// @route   GET /api/portfolio
// @access  Public
const getPortfolios = async (req, res) => {
    try {
        const { category } = req.query;
        let query = {};

        if (category && category !== "All") {
            query.category = category;
        }

        const projects = await Portfolio.find(query).sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single portfolio project by slug
// @route   GET /api/portfolio/:slug
// @access  Public
const getPortfolioBySlug = async (req, res) => {
    try {
        const project = await Portfolio.findOne({ slug: req.params.slug });
        if (!project) {
            return res.status(404).json({ message: "Project case study not found" });
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new portfolio project
// @route   POST /api/portfolio
// @access  Private
const createPortfolio = async (req, res) => {
    try {
        const { 
            title, 
            category, 
            subtitle, 
            client, 
            date, 
            overview, 
            challenge, 
            solution, 
            techStack, 
            details,
            websiteUrl,
            src
        } = req.body;

        if (!title || !category || !subtitle || !client || !date || !overview || !challenge || !solution) {
            return res.status(400).json({ message: "Please fill in all general project fields" });
        }

        // Parse tech stack tags
        let parsedTechStack = [];
        if (Array.isArray(techStack)) {
            parsedTechStack = techStack;
        } else if (typeof techStack === "string") {
            parsedTechStack = techStack.split(",").map(t => t.trim()).filter(t => t.length > 0);
        }

        // Parse details array
        let parsedDetails = [];
        if (details) {
            if (typeof details === "string") {
                try {
                    parsedDetails = JSON.parse(details);
                } catch {
                    parsedDetails = [];
                }
            } else if (Array.isArray(details)) {
                parsedDetails = details;
            }
        }

        const slug = generateSlug(title);

        // Check duplicate slug
        const exists = await Portfolio.findOne({ slug });
        if (exists) {
            return res.status(400).json({ message: "A case study with this title slug already exists" });
        }

        // Handle image file upload or manually passed src URL
        let imageUrl = "";
        if (req.file) {
            imageUrl = await uploadToCloudOrLocal(req.file, "nexion_portfolios");
        } else if (src && src.trim() !== "") {
            imageUrl = src.trim();
        } else {
            // Default placeholder mockup
            imageUrl = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?fit=crop&w=800&q=80";
        }

        const project = await Portfolio.create({
            title,
            slug,
            category,
            subtitle,
            src: imageUrl,
            client,
            date,
            overview,
            challenge,
            solution,
            techStack: parsedTechStack,
            details: parsedDetails,
            websiteUrl: websiteUrl || ""
        });

        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a portfolio project
// @route   PUT /api/portfolio/:id
// @access  Private
const updatePortfolio = async (req, res) => {
    try {
        const project = await Portfolio.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: "Project case study not found" });
        }

        const { 
            title, 
            category, 
            subtitle, 
            client, 
            date, 
            overview, 
            challenge, 
            solution, 
            techStack, 
            details,
            websiteUrl,
            src
        } = req.body;

        if (title) {
            project.title = title;
            project.slug = generateSlug(title);
        }
        if (category) project.category = category;
        if (subtitle) project.subtitle = subtitle;
        if (client) project.client = client;
        if (date) project.date = date;
        if (overview) project.overview = overview;
        if (challenge) project.challenge = challenge;
        if (solution) project.solution = solution;
        if (websiteUrl !== undefined) project.websiteUrl = websiteUrl;

        if (techStack) {
            if (Array.isArray(techStack)) {
                project.techStack = techStack;
            } else if (typeof techStack === "string") {
                project.techStack = techStack.split(",").map(t => t.trim()).filter(t => t.length > 0);
            }
        }

        if (details) {
            if (typeof details === "string") {
                try {
                    project.details = JSON.parse(details);
                } catch {
                    // Ignore invalid JSON parsing
                }
            } else if (Array.isArray(details)) {
                project.details = details;
            }
        }

        // Handle new image file upload or manually passed src
        if (req.file) {
            project.src = await uploadToCloudOrLocal(req.file, "nexion_portfolios");
        } else if (src && src.trim() !== "") {
            project.src = src.trim();
        }

        const updatedProject = await project.save();
        res.json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a portfolio project
// @route   DELETE /api/portfolio/:id
// @access  Private
const deletePortfolio = async (req, res) => {
    try {
        const project = await Portfolio.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: "Project case study not found" });
        }

        await project.deleteOne();
        res.json({ message: "Project case study deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Capture live website screenshot & upload to Cloudinary
// @route   POST /api/portfolio/screenshot
// @access  Private
const captureScreenshot = async (req, res) => {
    try {
        let { url } = req.body;
        if (!url) {
            return res.status(400).json({ message: "Website URL is required" });
        }

        // Standardize URL protocol
        if (!/^https?:\/\//i.test(url)) {
            url = `https://${url}`;
        }

        // Fetch high-res screenshot buffer using Microlink Screenshot API engine
        const screenshotApiUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&embed=screenshot.url&viewport.width=1440&viewport.height=900&viewport.deviceScaleFactor=1`;

        const response = await fetch(screenshotApiUrl);
        if (!response.ok) {
            throw new Error(`Failed to capture screenshot for website: ${url}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const mockFile = {
            buffer,
            originalname: `website-ss-${Date.now()}.png`,
            mimetype: "image/png"
        };

        const imageUrl = await uploadToCloudOrLocal(mockFile, "nexion_portfolios");

        res.json({
            success: true,
            imageUrl,
            message: "Website screenshot captured and uploaded to Cloudinary successfully!"
        });
    } catch (error) {
        console.error("Screenshot Capture Error:", error);
        res.status(500).json({ message: error.message || "Failed to capture website screenshot" });
    }
};

module.exports = {
    getPortfolios,
    getPortfolioBySlug,
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
    captureScreenshot
};

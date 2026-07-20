const Blog = require("../models/Blog");
const { uploadToCloudOrLocal } = require("../middleware/upload");

// Helper: Slugify title
const generateSlug = (text) => {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_]+/g, "-")
        .replace(/^-+|-+$/g, "");
};

// Helper: Calculate read time from text/paragraphs
const calculateReadTime = (contentArray) => {
    const textCombined = contentArray.join(" ");
    const wordsPerMinute = 200;
    const wordCount = textCombined.split(/\s+/).filter(w => w.length > 0).length;
    const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
    return `${minutes} min read`;
};

// @desc    Get all blog articles
// @route   GET /api/blogs
// @access  Public
const getBlogs = async (req, res) => {
    try {
        const { category } = req.query;
        let query = {};
        
        if (category && category !== "All") {
            query.category = category;
        }

        const blogs = await Blog.find(query).sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single blog article by slug
// @route   GET /api/blogs/:slug
// @access  Public
const getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });
        if (!blog) {
            return res.status(404).json({ message: "Article not found" });
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new blog article
// @route   POST /api/blogs
// @access  Private
const createBlog = async (req, res) => {
    try {
        const { title, category, excerpt, content } = req.body;

        if (!title || !category || !excerpt || !content) {
            return res.status(400).json({ message: "Please fill in all required fields" });
        }

        // Parse content: can be array or string split by double newlines
        let contentParagraphs = [];
        if (Array.isArray(content)) {
            contentParagraphs = content;
        } else {
            contentParagraphs = content.split("\n\n").map(p => p.trim()).filter(p => p.length > 0);
        }

        // Generate properties
        const slug = generateSlug(title);
        const readTime = calculateReadTime(contentParagraphs);
        
        // Check duplicate slug
        const exists = await Blog.findOne({ slug });
        if (exists) {
            return res.status(400).json({ message: "An article with this title slug already exists" });
        }

        // Handle image upload if exists
        let imageUrl = "";
        if (req.file) {
            imageUrl = await uploadToCloudOrLocal(req.file, "nexion_blogs");
        } else {
            // Placeholder technology background
            imageUrl = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?fit=crop&w=800&q=80";
        }

        const blog = await Blog.create({
            title,
            slug,
            category,
            readTime,
            date: new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric"
            }),
            excerpt,
            content: contentParagraphs,
            image: imageUrl
        });

        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a blog article
// @route   PUT /api/blogs/:id
// @access  Private
const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Article not found" });
        }

        const { title, category, excerpt, content } = req.body;

        if (title) {
            blog.title = title;
            blog.slug = generateSlug(title);
        }
        if (category) blog.category = category;
        if (excerpt) blog.excerpt = excerpt;

        if (content) {
            let contentParagraphs = [];
            if (Array.isArray(content)) {
                contentParagraphs = content;
            } else {
                contentParagraphs = content.split("\n\n").map(p => p.trim()).filter(p => p.length > 0);
            }
            blog.content = contentParagraphs;
            blog.readTime = calculateReadTime(contentParagraphs);
        }

        // Handle new image upload
        if (req.file) {
            blog.image = await uploadToCloudOrLocal(req.file, "nexion_blogs");
        }

        const updatedBlog = await blog.save();
        res.json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a blog article
// @route   DELETE /api/blogs/:id
// @access  Private
const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Article not found" });
        }

        await blog.deleteOne();
        res.json({ message: "Article deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getBlogs,
    getBlogBySlug,
    createBlog,
    updateBlog,
    deleteBlog
};

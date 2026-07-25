const Testimonial = require("../models/Testimonial");
const { uploadToCloudOrLocal } = require("../middleware/upload");

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
const getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new testimonial review
// @route   POST /api/testimonials
// @access  Private
const createTestimonial = async (req, res) => {
    try {
        const { name, location, text, column } = req.body;

        if (!name || !location || !text || !column) {
            return res.status(400).json({ message: "Please fill in all testimonial fields" });
        }

        // Handle image upload
        let avatarUrl = "";
        if (req.file) {
            avatarUrl = await uploadToCloudOrLocal(req.file, "nexion_testimonials");
        } else if (req.body.avatar && req.body.avatar.trim() !== "") {
            avatarUrl = req.body.avatar.trim();
        } else {
            // Default placeholder avatar
            avatarUrl = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fit=crop&w=120&h=120&q=80";
        }

        const testimonial = await Testimonial.create({
            name,
            location,
            avatar: avatarUrl,
            text,
            column: Number(column)
        });

        res.status(201).json(testimonial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a testimonial review
// @route   PUT /api/testimonials/:id
// @access  Private
const updateTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) {
            return res.status(404).json({ message: "Testimonial review not found" });
        }

        const { name, location, text, column } = req.body;

        if (name) testimonial.name = name;
        if (location) testimonial.location = location;
        if (text) testimonial.text = text;
        if (column) testimonial.column = Number(column);

        // Handle new avatar upload
        if (req.file) {
            testimonial.avatar = await uploadToCloudOrLocal(req.file, "nexion_testimonials");
        } else if (req.body.avatar && req.body.avatar.trim() !== "") {
            testimonial.avatar = req.body.avatar.trim();
        }

        const updatedTestimonial = await testimonial.save();
        res.json(updatedTestimonial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a testimonial review
// @route   DELETE /api/testimonials/:id
// @access  Private
const deleteTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) {
            return res.status(404).json({ message: "Testimonial review not found" });
        }

        await testimonial.deleteOne();
        res.json({ message: "Testimonial review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
};

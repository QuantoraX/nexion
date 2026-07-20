const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ["Engineering", "Design", "Productivity", "Startup"],
        trim: true
    },
    readTime: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    excerpt: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: [String],
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Blog", BlogSchema);

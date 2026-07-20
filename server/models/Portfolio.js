const mongoose = require("mongoose");

const ProjectDetailSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    }
}, { _id: false });

const PortfolioSchema = new mongoose.Schema({
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
        trim: true
    },
    subtitle: {
        type: String,
        required: true,
        trim: true
    },
    src: {
        type: String,
        required: true
    },
    client: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: String,
        required: true,
        trim: true
    },
    overview: {
        type: String,
        required: true,
        trim: true
    },
    challenge: {
        type: String,
        required: true,
        trim: true
    },
    solution: {
        type: String,
        required: true,
        trim: true
    },
    techStack: {
        type: [String],
        required: true
    },
    details: {
        type: [ProjectDetailSchema],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Portfolio", PortfolioSchema);

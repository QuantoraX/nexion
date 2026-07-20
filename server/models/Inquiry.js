const mongoose = require("mongoose");

const InquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    company: {
        type: String,
        default: "None"
    },
    budget: {
        type: String,
        default: "Not Specified"
    },
    projectType: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["new", "read", "replied"],
        default: "new"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Inquiry", InquirySchema);

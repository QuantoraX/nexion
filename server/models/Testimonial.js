const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
        trim: true
    },
    column: {
        type: Number,
        required: true,
        enum: [1, 2],
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Testimonial", TestimonialSchema);

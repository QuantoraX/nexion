const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Config imports
const connectDB = require("./config/db");
const { seedAdminUser } = require("./controllers/authController");

// Route imports
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");

// Instantiate Express
const app = express();

// Connect to Database
connectDB().then(() => {
    // Seed default admin user (admin/nexion2026) on startup if db is empty
    seedAdminUser();
});

// Configure CORS (Allow local Vite frontend connections)
app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true
}));

// Request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded media files locally as static resources
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// Mount API routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/inquiries", inquiryRoutes);

// Base ping endpoint
app.get("/api/health", (req, res) => {
    res.json({ status: "healthy", timestamp: new Date() });
});

// Global central error handler middleware
app.use((err, req, res, next) => {
    console.error("Global Server Error:", err.stack || err.message);
    
    // Check if error is from Multer file limit
    if (err instanceof require("multer").MulterError) {
        return res.status(400).json({ message: `Upload error: ${err.message}` });
    }
    
    res.status(500).json({ 
        message: err.message || "An unexpected internal server error occurred" 
    });
});

// Start listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Nexion Server: Running in active dev mode on port ${PORT}...`);
});

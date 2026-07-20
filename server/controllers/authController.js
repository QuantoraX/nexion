const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Generate JWT token helper
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || "nexion_jwt_secret_key_2026", {
        expiresIn: "30d"
    });
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(450).json({ message: "Please provide both username and password" });
        }

        // Find user by username or email
        const user = await User.findOne({
            $or: [{ username }, { email: username.toLowerCase() }]
        });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public (Can be restricted/disabled after seeding)
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const userExists = await User.findOne({ 
            $or: [{ email: email.toLowerCase() }, { username }] 
        });

        if (userExists) {
            return res.status(400).json({ message: "User already exists with this username or email" });
        }

        const user = await User.create({
            username,
            email,
            password
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Verify active auth token and return profile
// @route   GET /api/auth/verify
// @access  Private
const verifyToken = async (req, res) => {
    try {
        res.json({
            _id: req.user._id,
            username: req.user.username,
            email: req.user.email
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Helper: Seed default admin user if database is empty
const seedAdminUser = async () => {
    try {
        const count = await User.countDocuments();
        if (count === 0) {
            console.log("Database: User collection is empty. Seeding default administrator account...");
            await User.create({
                username: "admin",
                email: "admin@nexion.solutions",
                password: "nexion2026" // Will be hashed automatically by schema pre-save hook
            });
            console.log("Database: Default administrator seeded successfully (admin/nexion2026).");
        }
    } catch (error) {
        console.error("Database Seeding Error:", error.message);
    }
};

module.exports = {
    loginUser,
    registerUser,
    verifyToken,
    seedAdminUser
};

const express = require("express");
const { loginUser, registerUser, verifyToken } = require("../controllers/authController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/verify", protect, verifyToken);

module.exports = router;

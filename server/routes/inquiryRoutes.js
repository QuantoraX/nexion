const express = require("express");
const {
    getInquiries,
    createInquiry,
    toggleInquiryStatus,
    replyInquiry,
    deleteInquiry
} = require("../controllers/inquiryController");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Public submission path
router.post("/", createInquiry);

// Protected administration inbox paths
router.get("/", protect, getInquiries);
router.put("/:id", protect, toggleInquiryStatus);
router.post("/:id/reply", protect, replyInquiry);
router.delete("/:id", protect, deleteInquiry);

module.exports = router;

const express = require("express");
const {
    getTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
} = require("../controllers/testimonialController");
const { protect } = require("../middleware/auth");
const { upload } = require("../middleware/upload");

const router = express.Router();

router.get("/", getTestimonials);

// Protected routes (require JWT and handle review avatar uploads)
router.post("/", protect, upload.single("avatar"), createTestimonial);
router.put("/:id", protect, upload.single("avatar"), updateTestimonial);
router.delete("/:id", protect, deleteTestimonial);

module.exports = router;

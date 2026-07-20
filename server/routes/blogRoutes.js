const express = require("express");
const { 
    getBlogs, 
    getBlogBySlug, 
    createBlog, 
    updateBlog, 
    deleteBlog 
} = require("../controllers/blogController");
const { protect } = require("../middleware/auth");
const { upload } = require("../middleware/upload");

const router = express.Router();

router.get("/", getBlogs);
router.get("/:slug", getBlogBySlug);

// Protected routes (require valid JWT and handle image uploads)
router.post("/", protect, upload.single("image"), createBlog);
router.put("/:id", protect, upload.single("image"), updateBlog);
router.delete("/:id", protect, deleteBlog);

module.exports = router;

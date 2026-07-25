const express = require("express");
const {
    getPortfolios,
    getPortfolioBySlug,
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
    captureScreenshot
} = require("../controllers/portfolioController");
const { protect } = require("../middleware/auth");
const { upload } = require("../middleware/upload");

const router = express.Router();

router.get("/", getPortfolios);
router.get("/:slug", getPortfolioBySlug);

// Protected routes (require JWT and handle project screen upload)
router.post("/screenshot", protect, captureScreenshot);
router.post("/", protect, upload.single("src"), createPortfolio);
router.put("/:id", protect, upload.single("src"), updatePortfolio);
router.delete("/:id", protect, deletePortfolio);

module.exports = router;

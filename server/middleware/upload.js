const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { cloudinary, isCloudinaryConfigured } = require("../config/cloudinary");

// Configure memory storage
const storage = multer.memoryStorage();

// Accept image files only
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files (JPEG, PNG, WEBP, etc.) are allowed!"), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // Limit: 5MB
    },
    fileFilter: fileFilter
});

// Helper function to upload image dynamically to Cloudinary or save locally
const uploadToCloudOrLocal = async (file, subfolder = "nexion") => {
    if (!file) return null;

    if (isCloudinaryConfigured) {
        // Upload to Cloudinary via upload_stream
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: subfolder },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary upload stream error:", error);
                        return reject(error);
                    }
                    resolve(result.secure_url);
                }
            );
            stream.end(file.buffer);
        });
    } else {
        // Fallback: Write file to local server directory 'public/uploads/'
        try {
            const uploadsDir = path.join(__dirname, "../public/uploads");
            if (!fs.existsSync(uploadsDir)) {
                fs.mkdirSync(uploadsDir, { recursive: true });
            }

            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            const extension = path.extname(file.originalname) || ".png";
            const filename = `${uniqueSuffix}${extension}`;
            const filepath = path.join(uploadsDir, filename);

            fs.writeFileSync(filepath, file.buffer);
            console.log(`Saved file locally: ${filepath}`);

            // Return relative asset URL
            return `/uploads/${filename}`;
        } catch (error) {
            console.error("Local file save error:", error);
            throw error;
        }
    }
};

module.exports = {
    upload,
    uploadToCloudOrLocal
};

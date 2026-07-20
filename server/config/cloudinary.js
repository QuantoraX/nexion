const cloudinary = require("cloudinary").v2;

const isConfigured = 
    process.env.CLOUDINARY_CLOUD_NAME && 
    process.env.CLOUDINARY_CLOUD_NAME !== "your_cloud_name" &&
    process.env.CLOUDINARY_API_KEY && 
    process.env.CLOUDINARY_API_SECRET;

if (isConfigured) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    console.log("Cloudinary Media Engine: Configured Successfully.");
} else {
    console.warn("Cloudinary Media Engine: Credentials missing in .env. System will fallback to local asset storage.");
}

module.exports = {
    cloudinary,
    isCloudinaryConfigured: !!isConfigured
};

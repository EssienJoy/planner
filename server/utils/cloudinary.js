const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary's SDK is callback/stream based — wrap an in-memory buffer
// upload in a promise so route middleware can await it.
function uploadBuffer(buffer, options = {}) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: 'planner/avatars',
                resource_type: 'image',
                ...options,
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            },
        );
        stream.end(buffer);
    });
}

module.exports = { cloudinary, uploadBuffer };

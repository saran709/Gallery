import multer from 'multer'

// Store uploads in memory so we can persist bytes into MongoDB instead of disk
const storage = multer.memoryStorage();

// Filter to accept both images and videos
const fileFilter = (req: any, file: any, cb: any) => {
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg'];
    const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/mpeg', 'video/quicktime'];
    const allowedTypes = [...allowedImageTypes, ...allowedVideoTypes];
    
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images and videos are allowed.'));
    }
};

export default multer({ 
    storage,
    fileFilter,
    limits: {
        fileSize: 500 * 1024 * 1024 // 500MB limit for videos
    }
});
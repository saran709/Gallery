"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Models
const Photo_1 = __importDefault(require("../models/Photo"));
async function getPhotos(req, res) {
    const photos = await Photo_1.default.find();
    return res.json(photos);
}
exports.getPhotos = getPhotos;
;
async function createPhoto(req, res) {
    if (!req.file) {
        return res.status(400).json({ message: 'Image or video file is required' });
    }
    const { title, description } = req.body;
    const isVideo = req.file.mimetype.startsWith('video/');
    const newPhoto = {
        title,
        description,
        fileType: isVideo ? 'video' : 'image',
        media: {
            data: req.file.buffer,
            contentType: req.file.mimetype
        }
    };
    const photo = new Photo_1.default(newPhoto);
    await photo.save();
    return res.json({
        message: 'File Saved Successfully',
        photo
    });
}
exports.createPhoto = createPhoto;
;
async function getPhoto(req, res) {
    const { id } = req.params;
    const photo = await Photo_1.default.findById(id);
    return res.json(photo);
}
exports.getPhoto = getPhoto;
async function getPhotoImage(req, res) {
    const { id } = req.params;
    const photo = await Photo_1.default.findById(id).select('media');
    if (!photo || !photo.media || !photo.media.data) {
        return res.status(404).json({ message: 'Media not found' });
    }
    res.contentType(photo.media.contentType || 'application/octet-stream');
    return res.send(photo.media.data);
}
exports.getPhotoImage = getPhotoImage;
async function deletePhoto(req, res) {
    const { id } = req.params;
    await Photo_1.default.findByIdAndRemove(id);
    return res.json({ message: 'Photo Deleted' });
}
exports.deletePhoto = deletePhoto;
;
async function updatePhoto(req, res) {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedPhoto = await Photo_1.default.findByIdAndUpdate(id, {
        title,
        description
    });
    return res.json({
        message: 'Successfully updated',
        updatedPhoto
    });
}
exports.updatePhoto = updatePhoto;

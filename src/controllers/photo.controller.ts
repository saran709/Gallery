import { Request, Response } from 'express'

// Models
import Photo from '../models/Photo';

export async function getPhotos(req: Request, res: Response): Promise<Response> {
    const photos = await Photo.find();
    return res.json(photos);
};

export async function createPhoto(req: Request, res: Response): Promise<Response> {
    if (!req.file) {
        return res.status(400).json({ message: 'Image or video file is required' });
    }

    const { title, description } = req.body;
    const isVideo = req.file.mimetype.startsWith('video/');
    
    const newPhoto: any = {
        title,
        description,
        fileType: isVideo ? 'video' : 'image',
        media: {
            data: req.file.buffer,
            contentType: req.file.mimetype
        }
    };

    const photo = new Photo(newPhoto);
    await photo.save();
    return res.json({
        message: 'File Saved Successfully',
        photo
    });
};

export async function getPhoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const photo = await Photo.findById(id);
    return res.json(photo);
}

export async function getPhotoImage(req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params;
    const photo = await Photo.findById(id).select('media');
    if (!photo || !photo.media || !photo.media.data) {
        return res.status(404).json({ message: 'Media not found' });
    }

    res.contentType(photo.media.contentType || 'application/octet-stream');
    return res.send(photo.media.data);
}

export async function deletePhoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await Photo.findByIdAndRemove(id);
    return res.json({ message: 'Photo Deleted' });
};

export async function updatePhoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedPhoto = await Photo.findByIdAndUpdate(id, {
        title,
        description
    });
    return res.json({
        message: 'Successfully updated',
        updatedPhoto
    });
}
import { Router } from 'express'
const router = Router();

import upload from '../libs/multer'
import { getPhotos, createPhoto, deletePhoto, getPhoto, updatePhoto, getPhotoImage } from '../controllers/photo.controller'

// middleware
// router.use(upload.single('image'));

// routes
router.route('/photos')
    .get(getPhotos)
    .post(upload.single('image'), createPhoto);

router.route('/photos/:id')
    .get(getPhoto)
    .delete(deletePhoto)
    .put(updatePhoto);

router.get('/photos/:id/image', getPhotoImage);

export default router;
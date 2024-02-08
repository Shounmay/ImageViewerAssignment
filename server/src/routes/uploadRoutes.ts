import {
	getImagesController,
	uploadImageTest,
} from '../controllers/uploadController';
import express from 'express';

export default (router: express.Router) => {
	router.get('/get-images', getImagesController);
	router.post('/upload-image', uploadImageTest);
};

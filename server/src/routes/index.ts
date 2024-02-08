import express from 'express';
import uploadRoutes from './uploadRoutes';

const router = express.Router();

export default (): express.Router => {
	uploadRoutes(router);

	return router;
};

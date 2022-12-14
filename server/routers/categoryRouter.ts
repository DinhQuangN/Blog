import express from 'express';
import {
	createCategory,
	getCategories
} from '../controllers/categoryController';

const router = express.Router();

router.get('/getCategories', getCategories);
router.post('/createCategory', createCategory);

export default router;

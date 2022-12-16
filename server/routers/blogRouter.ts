import express from 'express';
import { createBlog, getBlog } from '../controllers/blogController';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/getBlog', getBlog);
router.post('/createBlog', auth, createBlog);

export default router;

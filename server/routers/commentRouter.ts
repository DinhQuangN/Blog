import express from 'express';
import { createComment } from '../controllers/commentController';
import auth from '../middleware/auth';
const router = express.Router();

router.post('/createComment', auth, createComment);

export default router;

import express from 'express';
import {
	createBlog,
	getBlog,
	getHomeBlogs
} from '../controllers/blogController';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/getHomeBlogs', getHomeBlogs);
router.post('/createBlog', auth, createBlog);
router.route('/getBlog/:id').get(getBlog);

export default router;

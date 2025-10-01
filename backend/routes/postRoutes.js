import express from 'express';
const router = express.Router();
import { 
  getPosts, 
  getPostBySlug,
  createPost,
  updatePost,
  deletePost
} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js'; // Import protect

// Public routes
router.route('/').get(getPosts);
router.route('/:slug').get(getPostBySlug);

// Admin routes (Protected)
router.route('/').post(protect, createPost);
router.route('/:id').put(protect, updatePost).delete(protect, deletePost);

export default router;
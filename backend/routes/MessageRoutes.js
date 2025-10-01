import express from 'express';
const router = express.Router();
import { getMessages, deleteMessage, markMessageAsRead } from '../controllers/MessageController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getMessages);
router.route('/:id').delete(protect, deleteMessage);
router.route('/:id/read').put(protect, markMessageAsRead);

export default router;
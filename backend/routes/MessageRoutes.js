// This file is at backend/routes/messageRoutes.js
import express from 'express';
const router = express.Router();
import { 
  getMessages, 
  deleteMessage, 
  markMessageAsRead, 
  createMessage // Import the new function
} from '../controllers/MessageController.js';
import { protect } from '../middleware/authMiddleware.js';

// PUBLIC ROUTE to create a new message (from the contact form)
router.route('/').post(createMessage); 

// PROTECTED ADMIN ROUTES
router.route('/').get(protect, getMessages);
router.route('/:id').delete(protect, deleteMessage);
router.route('/:id/read').put(protect, markMessageAsRead);

export default router;
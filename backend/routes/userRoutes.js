import express from 'express';
const router = express.Router();
import { authUser } from '../controllers/userController.js';

// @desc    Authenticate a user and get a token
// @route   POST /api/users/login
// @access  Public
router.post('/login', authUser);

export default router;
import express from 'express';
const router = express.Router();
import { 
  getProjects, 
  createProject, 
  updateProject,
  deleteProject
} from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js'; // Import protect

// Public route - anyone can see projects
router.route('/').get(getProjects);

// Protected routes - only a logged-in admin can create, update, or delete
router.route('/').post(protect, createProject);
router.route('/:id').put(protect, updateProject).delete(protect, deleteProject);

export default router;
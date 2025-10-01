import express from 'express';
const router = express.Router();
import { 
  getPricingTiers,
  createTier,
  updateTier,
  deleteTier
} from '../controllers/pricingController.js';
import { protect } from '../middleware/authMiddleware.js';

// Public route
router.route('/').get(getPricingTiers);

// Admin routes (Protected)
router.route('/').post(protect, createTier);
router.route('/:id').put(protect, updateTier).delete(protect, deleteTier);

export default router;
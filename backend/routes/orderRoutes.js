import express from 'express';
import {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder
} from '../controllers/orderController.js';
import { optionalAuth, requireAuth } from '../middleware/auth.js';
import { validateOrder } from '../validators/orderValidator.js';
import { handleValidationErrors } from '../middleware/validator.js';
import { orderLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/', orderLimiter, optionalAuth, validateOrder, handleValidationErrors, createOrder);
router.get('/my-orders', optionalAuth, getMyOrders);
router.get('/:id', optionalAuth, getOrderById);
router.patch('/:id/cancel', optionalAuth, cancelOrder);

export default router;

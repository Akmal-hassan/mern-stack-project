import express from 'express';
import {
  getCart,
  addItem,
  updateQuantity,
  removeItem,
  clearCart,
  applyCoupon,
  removeCoupon
} from '../controllers/cartController.js';

const router = express.Router();

router.get('/', getCart);
router.post('/items', addItem);
router.put('/items/:productId', updateQuantity);
router.delete('/items/:productId', removeItem);
router.delete('/', clearCart);
router.post('/coupon', applyCoupon);
router.delete('/coupon', removeCoupon);

export default router;

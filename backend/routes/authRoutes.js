import express from 'express';
import { register, login, logout, getMe, updateProfile } from '../controllers/authController.js';
import { validateRegister, validateLogin, validateProfileUpdate } from '../validators/authValidator.js';
import { handleValidationErrors } from '../middleware/validator.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', authLimiter, validateRegister, handleValidationErrors, register);
router.post('/login', authLimiter, validateLogin, handleValidationErrors, login);
router.post('/logout', logout);
router.get('/me', getMe);
router.put('/profile', requireAuth, validateProfileUpdate, handleValidationErrors, updateProfile);

export default router;

import { body } from 'express-validator';

export const validateRegister = [
  body('name')
    .trim()
    .notEmpty().withMessage('Full name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email address is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

export const validateLogin = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email address is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
];

export const validateProfileUpdate = [
  body('name').optional().trim().isLength({ min: 2, max: 100 }),
  body('phone').optional().trim(),
  body('address').optional().trim(),
  body('city').optional().trim(),
  body('state').optional().trim(),
  body('postalCode').optional().trim()
];

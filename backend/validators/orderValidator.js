import { body } from 'express-validator';

export const validateOrder = [
  body('customer.fullName')
    .trim()
    .notEmpty().withMessage('Customer full name is required'),
  body('customer.email')
    .trim()
    .isEmail().withMessage('Valid customer email is required')
    .normalizeEmail(),
  body('customer.phone')
    .trim()
    .notEmpty().withMessage('Customer phone number is required'),
  body('customer.address')
    .trim()
    .notEmpty().withMessage('Delivery address is required'),
  body('customer.city')
    .trim()
    .notEmpty().withMessage('Delivery city is required'),
  body('items')
    .isArray({ min: 1 }).withMessage('Order must contain at least one product item'),
  body('items.*.id')
    .notEmpty().withMessage('Each item must specify a valid product id'),
  body('items.*.quantity')
    .isInt({ min: 1 }).withMessage('Item quantity must be at least 1')
];

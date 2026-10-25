import express from 'express';
import {
  getProducts,
  getProductById,
  getBrands,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
import { optionalAuth } from '../middleware/auth.js';
import { handleFileUpload } from '../middleware/upload.js';
import { validateProduct } from '../validators/productValidator.js';
import { handleValidationErrors } from '../middleware/validator.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/brands', getBrands);
router.get('/categories', getCategories);
router.get('/brand/:brand', (req, res, next) => {
  req.query.brand = req.params.brand;
  getProducts(req, res, next);
});
router.get('/brands/:brand/products', (req, res, next) => {
  req.query.brand = req.params.brand;
  getProducts(req, res, next);
});
router.get('/:id', getProductById);

// Product CRUD routes with multipart/form-data upload support
router.post('/', optionalAuth, handleFileUpload, validateProduct, handleValidationErrors, createProduct);
router.put('/:id', optionalAuth, handleFileUpload, updateProduct);
router.patch('/:id', optionalAuth, handleFileUpload, updateProduct);
router.delete('/:id', optionalAuth, deleteProduct);

export default router;

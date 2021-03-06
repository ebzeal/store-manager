import express from 'express';
import { adminAccess, userAccess } from '../validation/auth';
// import upload from '../middleware/imageUpload';
import Product from '../controllers/products';

const router = express.Router();
// folderName('products');
// Load Product Routes
router.get('/', userAccess, Product.getAll);
router.get('/:id', userAccess, Product.getOne);
router.post('/', adminAccess, Product.create);
router.put('/:id', adminAccess, Product.update);
router.delete('/:id', adminAccess, Product.delete);

module.exports = router;

import express from 'express';
import { adminAccess, userAccess } from '../validation/auth';
import Category from '../controllers/categories';

const router = express.Router();

// Load Category Routes
router.get('/', userAccess, Category.getAll);
router.get('/:id', userAccess, Category.getOne);
router.post('/', adminAccess, Category.create);
router.put('/:id', adminAccess, Category.update);
router.delete('/:id', adminAccess, Category.delete);

module.exports = router;

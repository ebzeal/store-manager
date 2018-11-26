import express from 'express';
import { adminAccess, userAccess } from '../validation/auth';
import Search from '../controllers/search';

const router = express.Router();

router.get('/productsbycategories/:id', userAccess, Search.searchProductsByCategories);
router.get('/productsbytext/:id', userAccess, Search.searchProductsByText);

module.exports = router;

import express from 'express';
import { adminAccess, userAccess } from '../validation/auth';
import Sales from '../controllers/sales';

const router = express.Router();
// Load Sales Routes
router.get('/', adminAccess, Sales.getAll);
router.get('/:id', adminAccess, Sales.getOne);
router.post('/', userAccess, Sales.create);

module.exports = router;

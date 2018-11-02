import express from 'express';
import { adminAccess, userAccess } from '../validation/auth';
import User from '../controllers/users';

const router = express.Router();
// Load User Routes
router.get('/', adminAccess, User.getAll);
router.get('/:id', adminAccess, User.getOne);
router.get('/profile/:id', userAccess, User.getOwn);
router.put('/:id', adminAccess, User.update);
router.delete('/:id', adminAccess, User.delete);

module.exports = router;

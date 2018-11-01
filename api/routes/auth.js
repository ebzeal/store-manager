import express from 'express';
import { adminAccess } from '../validation/auth';
import User from '../controllers/users';

const router = express.Router();


// Load auth Routes
router.post('/login', User.logIn);
router.post('/signup', adminAccess, User.signUp);
module.exports = router;

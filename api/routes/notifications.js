import express from 'express';
import { adminAccess, userAccess } from '../validation/auth';
import notification from '../controllers/notifications';

const router = express.Router();

// Load notifications Routes
router.get('/', userAccess, notification.getAll);
router.post('/', adminAccess, notification.create);


module.exports = router;

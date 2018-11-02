import express from 'express';
import { adminAccess, userAccess } from '../validation/auth';
import Incident from '../controllers/categories';

const router = express.Router();

// Load Incidents Routes
router.get('/', adminAccess, Incident.getAll);
router.get('/:id', adminAccess, Incident.getOne);
router.post('/', userAccess, Incident.create);


module.exports = router;

import { Router } from 'express';
import { signup, login } from '../controllers/authController';
import { authenticateJWT, authorizeRoles } from '../middleware/authmiddleware';
import { createSoftware, getAllSoftware } from '../controllers/softwareController';
import { getPendingRequests, submitRequest, updateRequestStatus } from '../controllers/requestController';

const router = Router();

router.post('/auth/signup', signup);
router.post('/auth/login', login);

router.post('/create-software', authenticateJWT, authorizeRoles('Admin'), createSoftware);
router.post('/request-access', authenticateJWT, authorizeRoles('Employee'), submitRequest);
router.get('/get-software', authenticateJWT, authorizeRoles('Employee'), getAllSoftware);
// Manager routes
router.get('/pending-requests',authenticateJWT,authorizeRoles('Manager'), getPendingRequests)
router.patch('/requests/:id',authenticateJWT,authorizeRoles('Manager'), updateRequestStatus)

export default router;

import { Router } from 'express';
const router = Router();

import * as UserController from '../controllers/user.controller';
import { verifyToken } from '../middlewares/verifyToken';

/* ----- User Routes ----- */

router.get('/profile', [verifyToken], UserController.getProfile);

export default router;
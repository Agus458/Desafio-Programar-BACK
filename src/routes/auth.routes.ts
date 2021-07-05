import { Router } from 'express';
const router = Router();

import * as AuthController from '../controllers/auth.controller';

/* ----- Auth Routes ----- */

router.post('/signin', AuthController.signin);

// router.post('/signup', AuthController.signup);

export default router;
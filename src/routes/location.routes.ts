import { Router } from 'express';
import * as LocationController from '../controllers/location.controller';
import { isAdmin } from '../middlewares/isAdmin';
const router = Router();

import { verifyToken } from '../middlewares/verifyToken';

/* ----- Location Routes ----- */

router.post('/', [verifyToken, isAdmin], LocationController.createLocation);

router.get('/', [verifyToken], LocationController.getLocations);

router.get('/:id', [verifyToken], LocationController.getLocation);

router.put('/:id', [verifyToken, isAdmin], LocationController.putLocation);

router.delete('/:id', [verifyToken, isAdmin], LocationController.deleteLocation);

export default router;
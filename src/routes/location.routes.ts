import { Router } from 'express';
import * as LocationController from '../controllers/location.controller';
const router = Router();

import { verifyToken } from '../middlewares/verifyToken';

/* ----- Location Routes ----- */

router.post('/', [verifyToken], LocationController.createLocation);

router.get('/', [verifyToken], LocationController.getLocations);

router.get('/:id', [verifyToken], LocationController.getLocation);

router.put('/:id', [verifyToken], LocationController.putLocation);

router.delete('/:id', [verifyToken], LocationController.deleteLocation);

export default router;
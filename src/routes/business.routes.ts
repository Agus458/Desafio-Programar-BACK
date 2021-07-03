import { Router } from 'express';
import * as BusinessController from '../controllers/business.controller';
const router = Router();

import { verifyToken } from '../middlewares/verifyToken';

/* ----- Businnes Routes ----- */

router.post('/', [verifyToken], BusinessController.createBusiness);

router.get('/', [verifyToken], BusinessController.getBusinesses);

router.get('/:rut', [verifyToken], BusinessController.getBusiness);

router.put('/:rut', [verifyToken], BusinessController.putBusiness);

router.delete('/:rut', [verifyToken], BusinessController.deleteBusiness);

export default router;
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

/* ----- Businnes_Person Routes ----- */

router.post('/addPerson', [verifyToken], BusinessController.addPerson);

router.put('/putBP/:id', [verifyToken], BusinessController.putBP);

router.delete('/deleteBP/:id', [verifyToken], BusinessController.deleteBP);

export default router;
import { Router } from 'express';
import * as BusinessController from '../controllers/business.controller';
const router = Router();

import { verifyToken } from '../middlewares/verifyToken';

/* ----- Businnes Routes ----- */

router.post('/', [verifyToken], BusinessController.createBusiness);

router.get('/', [verifyToken], BusinessController.getBusinesses);

router.get('/:id', [verifyToken], BusinessController.getBusiness);

router.put('/:id', [verifyToken], BusinessController.putBusiness);

router.delete('/:id', [verifyToken], BusinessController.deleteBusiness);

/* ----- Businnes_Person Routes ----- */

router.get('/persons/:id', [verifyToken], BusinessController.getPersonsBusiness);

router.post('/addPerson', [verifyToken], BusinessController.addPerson);

router.put('/putBP/:id', [verifyToken], BusinessController.putBP);

router.delete('/deleteBP/:id', [verifyToken], BusinessController.deleteBP);

export default router;
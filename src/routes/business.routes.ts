import { Router } from 'express';
import * as BusinessController from '../controllers/business.controller';
import { isAdmin } from '../middlewares/isAdmin';
const router = Router();

import { verifyToken } from '../middlewares/verifyToken';

/* ----- Businnes Routes ----- */

router.post('/', [verifyToken, isAdmin], BusinessController.createBusiness);

router.get('/', [verifyToken, isAdmin], BusinessController.getBusinesses);

router.get('/:id', [verifyToken, isAdmin], BusinessController.getBusiness);

router.put('/:id', [verifyToken, isAdmin], BusinessController.putBusiness);

router.delete('/:id', [verifyToken, isAdmin], BusinessController.deleteBusiness);

router.get('/goDown/:id', [verifyToken], BusinessController.goDown),

/* ----- Businnes_Person Routes ----- */

router.get('/persons/:id', [verifyToken], BusinessController.getPersonsBusiness);

router.post('/addPerson', [verifyToken], BusinessController.addPerson);

router.put('/putBP/:id', [verifyToken], BusinessController.putBP);

router.delete('/deleteBP/:id', [verifyToken], BusinessController.deleteBP);

export default router;
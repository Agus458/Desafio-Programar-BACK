import { Router } from 'express';
import * as PersonController from '../controllers/person.controller';
const router = Router();

import { verifyToken } from '../middlewares/verifyToken';

/* ----- Person Routes ----- */

router.get('/', [verifyToken], PersonController.getPersons);

router.get('/:id', [verifyToken], PersonController.getPerson);

router.post('/', [verifyToken], PersonController.createPerson);

router.put('/:id', [verifyToken], PersonController.updatePerson);

router.delete('/:id', [verifyToken], PersonController.deletePerson);

export default router;
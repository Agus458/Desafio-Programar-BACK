import { Router } from 'express';
import * as PersonController from '../controllers/person.controller';
import { isAdmin } from '../middlewares/isAdmin';
const router = Router();

import { verifyToken } from '../middlewares/verifyToken';

/* ----- Person Routes ----- */

router.get('/', [verifyToken], PersonController.getPersons);

router.get('/:id', [verifyToken], PersonController.getPerson);

router.post('/', [verifyToken, isAdmin], PersonController.createPerson);

router.put('/:id', [verifyToken, isAdmin], PersonController.updatePerson);

router.delete('/:id', [verifyToken, isAdmin], PersonController.deletePerson);

export default router;
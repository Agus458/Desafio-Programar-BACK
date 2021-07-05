import { Router } from 'express';
import * as DepartmentController from '../controllers/department.controller';
import { isAdmin } from '../middlewares/isAdmin';
const router = Router();

import { verifyToken } from '../middlewares/verifyToken';

/* ----- Department Routes ----- */

router.post('/', [verifyToken, isAdmin], DepartmentController.createDepartment);

router.get('/', [verifyToken], DepartmentController.getDepartments);

router.get('/:id', [verifyToken], DepartmentController.getDepartment);

router.put('/:id', [verifyToken, isAdmin], DepartmentController.putDepartment);

router.delete('/:id', [verifyToken, isAdmin], DepartmentController.deleteDepartment);

export default router;
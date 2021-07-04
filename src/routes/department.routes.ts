import { Router } from 'express';
import * as DepartmentController from '../controllers/department.controller';
const router = Router();

import { verifyToken } from '../middlewares/verifyToken';

/* ----- Department Routes ----- */

router.post('/', [verifyToken], DepartmentController.createDepartment);

router.get('/', [verifyToken], DepartmentController.getDepartments);

router.get('/:id', [verifyToken], DepartmentController.getDepartment);

router.put('/:id', [verifyToken], DepartmentController.putDepartment);

router.delete('/:id', [verifyToken], DepartmentController.deleteDepartment);

export default router;
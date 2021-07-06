import { Router } from 'express';
import * as ReportsController from '../controllers/reports.controller';
const router = Router();

import { verifyToken } from '../middlewares/verifyToken';

/* ----- Reports Routes ----- */

router.get('/countActives/', [verifyToken], ReportsController.countActives);

router.get('/listByActivity/:activity', [verifyToken], ReportsController.businessesByActivity);

router.get('/countByLocation/:locationId', [verifyToken], ReportsController.businessesByLocation);

// router.get('/UDbyMonth/:date', [verifyToken], ReportsController.UDbyMonth);


export default router;
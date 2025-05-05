import { Router } from 'express';
import { initiateSTKPush } from '../controllers/mpesaController.js';
const router = Router();

router.post('/pay', initiateSTKPush);
export default router;

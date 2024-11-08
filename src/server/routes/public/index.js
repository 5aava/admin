import express from 'express';

import { alive } from './alive.js';
import { sleep } from './sleep.js';

const router = express.Router();


router.get('/', alive);
router.get('/sleep', sleep);

export default router;

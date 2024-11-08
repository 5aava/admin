import express from 'express';
import { getAdmin } from './getAdmin.js';
import { syncMarket } from './syncMarket.js';
import { syncOwners } from './syncOwners.js';
import { failed } from './failed.js';
import { cancelDroped } from './cancelDroped.js';


const router = express.Router();

router.get('/getAdmin', getAdmin);
router.get('/syncMarket', syncMarket);
router.get('/syncOwners', syncOwners);

router.get('/failed', failed);
router.get('/cancelDroped', cancelDroped);

export default router;

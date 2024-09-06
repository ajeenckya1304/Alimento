import express from 'express';
import { NGOupdateUser, deleteNGOUser, testN } from '../controllers/NGOUser.controller.js';
import { NGOverifyToken } from '../utils/verifyNGOUser.js';

const router = express.Router();

router.get('/testN', testN);
router.post('/NGOupdate/:id', NGOverifyToken, NGOupdateUser)
router.delete('/delete/:id', NGOverifyToken, deleteNGOUser)

export default router;
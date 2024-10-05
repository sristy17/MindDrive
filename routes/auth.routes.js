// routes/auth.routes.js

import express from 'express';
import { signin, signup,Logout } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/logout', Logout);

// Default export of the router
export default router;

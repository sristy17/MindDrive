// routes/gemini.routes.js

import express from 'express';
import { trackMood, getTasks, botresponse } from '../controllers/gemini.controller.js';

const router = express.Router();

router.post('/track-mood', trackMood);
router.post('/get-tasks', getTasks);
router.post('/bot', botresponse);

// Default export of the router
export default router;

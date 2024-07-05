import express from 'express';
import {trackMood, getTasks} from '../controllers/gemini.controller.js';

const router = express.Router();

router.post('/track-mood', trackMood);
router.post('/get-tasks', getTasks);

export default router;
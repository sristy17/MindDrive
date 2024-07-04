import express from 'express';
import trackMood from '../controllers/gemini.controller.js';

const router = express.Router();

router.post('/track-mood', trackMood);

export default router;
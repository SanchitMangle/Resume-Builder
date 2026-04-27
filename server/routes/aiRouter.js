import express from 'express'
import { enhaceJobDescription, enhaceProfessinoalSummary } from '../controllers/aiController.js';
import { updateResume } from '../controllers/resumeController';
import protect from '../middlewares/auth.js';

const aiRouter = express.Router();

aiRouter.post('/enhace-pro-sum', protect, enhaceProfessinoalSummary)
aiRouter.post('/enhace-job-desc', protect, enhaceJobDescription)
aiRouter.post('/upload-resume', protect, updateResume)

export default aiRouter;
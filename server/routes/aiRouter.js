import express from 'express'
import { atsScore, enhanceJobDescription, enhanceProfessionalSummary, uploadResume } from '../controllers/aiController.js';
import protect from '../middlewares/auth.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { atsScoreSchema, enhanceTextSchema, uploadResumeSchema } from '../validators/aiValidators.js';

const aiRouter = express.Router();

aiRouter.post('/enhance-pro-sum', protect, validateRequest(enhanceTextSchema), enhanceProfessionalSummary)
aiRouter.post('/enhance-job-desc', protect, validateRequest(enhanceTextSchema), enhanceJobDescription)
aiRouter.post('/upload-resume', protect, validateRequest(uploadResumeSchema), uploadResume)
aiRouter.post('/ats-score', protect, validateRequest(atsScoreSchema), atsScore)

export default aiRouter;
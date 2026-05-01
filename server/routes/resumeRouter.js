import express from 'express'
import { createResume, deleteResume, getPublicResumeById, getResumeById, getResumes, renameResume, updateResume } from '../controllers/resumeController.js';
import protect from '../middlewares/auth.js'
import { upload } from '../config/multer.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { createResumeSchema, updateResumeSchema } from '../validators/resumeValidators.js';

const resumeRouter = express.Router();

resumeRouter.get('/', protect, getResumes)
resumeRouter.post('/', protect, validateRequest(createResumeSchema), createResume)
resumeRouter.get('/public/:resumeId', getPublicResumeById)
resumeRouter.get('/:resumeId', protect, getResumeById)
resumeRouter.put('/:resumeId', upload.single('image'), protect, validateRequest(updateResumeSchema), updateResume)
resumeRouter.patch('/:resumeId/rename', protect, renameResume)
resumeRouter.delete('/:resumeId', protect, deleteResume)

export default resumeRouter;
import express from 'express'
import { createResume, deleteRsume, getPublicResumeById, getResumeById, updateResume } from '../controllers/resumeController.js';
import protect from '../middlewares/auth.js'
import { upload } from '../config/multer.js';

const resumeRouter = express.Router();

resumeRouter.post('/create', protect, createResume)
resumeRouter.get('/get/:resumeId', protect, getResumeById)
resumeRouter.get('/public/:resumeId', getPublicResumeById)
resumeRouter.put('/update', upload.single('image'), protect, updateResume)
resumeRouter.delete('/delete/:resumeId', protect, deleteRsume)

export default resumeRouter;
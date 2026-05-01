import express from 'express'
import { getUserById, getUserResumes, registerUser, userLogin } from '../controllers/userController.js';
import protect from '../middlewares/auth.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { loginSchema, registerSchema } from '../validators/authValidators.js';
import { authRateLimiter } from '../middlewares/rateLimiters.js';

const userRouter = express.Router();

userRouter.post("/register", authRateLimiter, validateRequest(registerSchema), registerUser)
userRouter.post("/login", authRateLimiter, validateRequest(loginSchema), userLogin)
userRouter.get("/data",protect, getUserById)
userRouter.get("/resumes",protect, getUserResumes)

export default userRouter
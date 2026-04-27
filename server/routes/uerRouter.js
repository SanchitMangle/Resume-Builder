import express from 'express'
import { getUserById, getUserResumes, registerUser, userLogin } from '../controllers/userController.js';
import protect from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post("/register",registerUser)
userRouter.post("/login",userLogin)
userRouter.get("/data",protect, getUserById)
userRouter.get("/resumes",protect, getUserResumes)

export default userRouter
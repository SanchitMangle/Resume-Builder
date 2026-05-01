import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/db.js';
import userRouter from './routes/userRouter.js';
import resumeRouter from './routes/resumeRouter.js';
import aiRouter from './routes/aiRouter.js';
import logger from './config/logger.js';
import requestLogger from './middlewares/requestLogger.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';

// DB Connection
await connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())
app.use(requestLogger)

app.get("/", (req, res) => res.send("API WORKING"))
app.use('/api/users', userRouter)
app.use('/api/resumes', resumeRouter)
app.use('/api/ai', aiRouter)
app.use(notFoundHandler)
app.use(errorHandler)

app.listen(PORT, () => logger.info(`Server running on PORT : ${PORT}`))
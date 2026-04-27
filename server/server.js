import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/db.js';
import userRouter from './routes/uerRouter.js';
import resumeRouter from './routes/resumeRouter.js';
import aiRouter from './routes/aiRouter.js';

// DB Connection
await connectDB();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors())

app.get("/", (req, res) => res.send("API WORKING"))
app.use('/api/users', userRouter)
app.use('/api/resumes', resumeRouter)
app.use('/api/ai', aiRouter)

app.listen(PORT, () => console.log(`Server running on PORT : ${PORT}`))
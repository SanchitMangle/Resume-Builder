import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/db.js';

// DB Connection
await connectDB();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors())

app.get("/", (req, res) => res.send("API WORKING"))

app.listen(PORT, () => console.log(`Server running on PORT : ${PORT}`))
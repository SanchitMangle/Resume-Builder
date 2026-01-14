import express from 'express'
import 'dotenv/config'
import connectDB from './db.js';

// DB Connection
await connectDB();

const app = express();
const PORT = 8080;

app.get("/", (req, res) => res.send("API WORKING"))

app.listen(PORT, () => console.log(`Server running on PORT : ${PORT}`))
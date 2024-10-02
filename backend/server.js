import express from 'express'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { connectDB } from './databaseConn/db.js';
import authRoutes from './routes/auth.route.js'


const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;
app.get('/', (req,res) => {
    res.send("Hello World!")
})

app.use(express.json());        // allows us to parse incoming requests: req.body
app.use(cookieParser());        // allows to access cookies which have been created

app.use('/api/auth',authRoutes)
app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running in port ${PORT}`)
})
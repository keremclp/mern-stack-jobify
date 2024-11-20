import 'express-async-errors'
import * as dotenv from "dotenv";
dotenv.config();

import mongoose from 'mongoose';
import cookieParser from "cookie-parser";

// application
import express from 'express'
const app = express()

import morgan from 'morgan';

// middlewares
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from "./middleware/authMiddleware.js";


// routers
import jobRouter from './routers/jobRouter.js'
import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";

// middleware
app.use(express.json())
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cookieParser());


// routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get('/api/v1/test', (req, res) => {
  res.json({ msg: 'testa route' });
})



app.use("/api/v1/jobs",authenticateUser, jobRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users",authenticateUser, userRouter);

// error middleware
app.use('*', (req,res)=>{
  res.status(404).json({msg: 'Route not found'})
})

app.use(errorHandlerMiddleware)

// 
const port = process.env.PORT || 5400;
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
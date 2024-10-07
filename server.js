import 'express-async-errors'
import * as dotenv from "dotenv";
dotenv.config();

import mongoose from 'mongoose';


// application
import express from 'express'
const app = express()

import morgan from 'morgan';

// middlewares
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';

// routers
import jobRouter from './routers/jobrouter.js'
import authRouter from "./routers/authRouter.js";

// middleware
app.use(express.json())
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}


// routes
app.get("/", (req, res) => {
  res.send("Hello World");
});


app.use("/api/v1/jobs", jobRouter);
app.use("/api/v1/auth", authRouter);

// error middleware
app.use('*', (req,res)=>{
  res.status(404).json({msg: 'Route not found'})
})

app.use(errorHandlerMiddleware)

// 
const port = process.env.PORT || 5100;
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
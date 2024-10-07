import * as dotenv from "dotenv";
dotenv.config();

// application
import express from 'express'
const app = express()

import morgan from 'morgan';

// middlewares
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";

// routers
import jobRouter from './routers/jobrouter.js'

// middleware
app.use(express.json())
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use('*', (req,res)=>{
  res.status(404).json({msg: 'Route not found'})
})

app.use(errorHandlerMiddleware);

// routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1/jobs", jobRouter);

// 
const port = process.env.PORT || 5100;
app.listen(port, () => {
  console.log(`server running on PORT ${port}....`);
});
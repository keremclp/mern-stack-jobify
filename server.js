import * as dotenv from "dotenv";
dotenv.config();

// application
import express from 'express'
const app = express()

import morgan from 'morgan';


// middleware
app.use(express.json())
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.post("/", (req, res) => {
  console.log(req);

  res.json({ message: "Data received", data: req.body });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

// 
const port = process.env.PORT || 5100;
app.listen(port, () => {
  console.log(`server running on PORT ${port}....`);
});
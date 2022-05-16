import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import config from "./config";
import indexRouter from "./routes/index";

const app = express();
const port = config.port;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("common"));

// Routes
app.use("/", indexRouter);

// Connect to DB and start listening
mongoose.connect(config.dbConnectionString).then(() => {
  app.listen(port, () => {
    console.log(`Jabberwocky started and listening on http://localhost:${port}`);
  });
});

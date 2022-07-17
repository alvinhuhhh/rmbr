import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";

import config from "./config";
import routes from "./routes/index";

const app = express();
const port: number = config.port;
const db: string = config.dbConnectionString;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("common"));

// Routes
app.use("/", routes);

// Connect to DB
mongoose.connect(db);
const database = mongoose.connection;
database.on("error", (error) => {
  console.log(error);
});
database.once("connected", () => {
  console.log("Database connected");
});

// Start listening
app.listen(port, () => {
  console.log(`Todo API started and listening on http://localhost:${port}`);
});

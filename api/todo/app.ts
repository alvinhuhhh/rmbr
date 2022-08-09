import "dotenv/config";
import fs from "fs";
import https from "https";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import verify from "./middleware/verify";

import routes from "./routes/index";

const app = express();
const options = {
  key: fs.readFileSync("server.key", "utf-8"),
  cert: fs.readFileSync("server.crt", "utf-8"),
};

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("common"));
app.use(helmet());
app.use(verify);

// Routes
app.use("/", routes);

try {
  // Connect to DB and start listening
  if (typeof process.env.DB_CONNECTION_STRING === "string") {
    const db = process.env.DB_CONNECTION_STRING;

    mongoose.connect(db);
    const database = mongoose.connection;

    database.on("error", (error) => {
      throw new Error(error);
    });

    database.once("connected", () => {
      console.log("Database connected");
      app.listen(3000);
      https.createServer(options, app).listen(443, () => {
        console.log(`API server started and listening on PORT: 443`);
      });
    });
  } else {
    throw new Error("DB_CONNECTION_STRING is invalid.");
  }
} catch (err) {
  console.log(err);
}

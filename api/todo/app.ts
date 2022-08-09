import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import verify from "./middleware/verify";

import routes from "./routes/index";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("common"));
app.use(verify);

// Routes
app.use("/", routes);

try {
  // Connect to DB
  if (typeof process.env.DB_CONNECTION_STRING === "string") {
    const db = process.env.DB_CONNECTION_STRING;

    mongoose.connect(db);
    const database = mongoose.connection;
    database.on("error", (error) => {
      throw new Error(error);
    });
    database.once("connected", () => {
      console.log("Database connected");
    });
  } else {
    throw new Error("DB_CONNECTION_STRING is invalid.");
  }

  // Start listening
  if (typeof process.env.PORT === "string") {
    const port = parseInt(process.env.PORT);

    app.listen(port, () => {
      console.log(`Todo API started and listening on http://localhost:${port}`);
    });
  } else {
    throw new Error("PORT is invalid.");
  }
} catch (err) {
  console.log(err);
}

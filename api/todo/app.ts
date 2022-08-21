import "dotenv/config";
import fs from "fs";
import url from "url";
import http from "http";
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
  key: fs.readFileSync("ssl/private.key", "utf-8"),
  cert: fs.readFileSync("ssl/certificate.crt", "utf-8"),
  ca: fs.readFileSync("ssl/ca_bundle.crt", "utf-8"),
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

// For ZeroSSL domain validation
http
  .createServer((req, res) => {
    const reqUrl = url.parse(req.url as string).pathname;
    const file = fs.createReadStream("ssl/6C8CC160AA79C5242666D6778CB576C6.txt");
    if (reqUrl === "/.well-known/pki-validation/6C8CC160AA79C5242666D6778CB576C6.txt") {
      file.pipe(res);
    } else {
      res.writeHead(404);
      res.end();
    }
  })
  .listen(80, () => {
    console.log("HTTP server started on PORT: 80");
  });

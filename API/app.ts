const config = require("./config");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const port = config.port;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("common"));

// Routes
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

// Connect to DB and start listening
mongoose.connect(config.dbConnectionString, { useNewUrlParser: true }).then(() => {
  app.listen(port, () => {
    console.log(`Jabberwocky started and listening on http://localhost:${port}`);
  });
});
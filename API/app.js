const config = require("./config");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = config.port;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

// Connect to DB and start listening
mongoose.connect(config.dbConnectionString, { useNewUrlParser: true }).then(() => {
  app.listen(port, () => {
    console.log(`API started and listening on http://localhost:${port}`);
  });
});

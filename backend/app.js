const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const app = express();
app.use(cors());

const todoRouter = require('./routes/todoRoute')
app.use('/todo', todoRouter)
app.get("/", (req, res) => {
  res.send("Try /todo");
});
app.route('/route', )
const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

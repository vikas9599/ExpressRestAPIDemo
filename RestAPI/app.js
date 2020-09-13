const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userRoute = require("./Routers/userRoute");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(bodyParser.json());

app.use("/user", userRoute);

mongoose.connect(
  "mongodb://localhost:27017/restapidemo",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => {
    console.log("Connected to database");
  }
);

app.get("/", (req, res) => {
  res.send("Welcome to Express Rest API ");
});

app.listen(3000, () => {
  console.log("Working fine");
});

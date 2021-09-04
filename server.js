const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
const path = require("path");

const PORT = 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public")); //public folder is an entry point

mongoose.connect("mongodb://localhost/budget", { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, 
  useFindAndModify: false,
});

// routes
app.use(require("./routes/api.js"));
app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"))
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://Atlas-Admin:<koalalove97>@cluster0.y4jgr.mongodb.net/Budget-Tracker?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

const uri = process.env.MONGODB_URI;
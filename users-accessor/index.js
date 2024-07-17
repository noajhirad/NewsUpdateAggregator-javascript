"use strict";

const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
const port = 4000;

const usersSchema = new mongoose.Schema({
  email: String,
  preferences: [String],
});

const Users = mongoose.model("Users", usersSchema);
mongoose.connect("mongodb://mongodb:27017/users", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (err) => console.error("Error with connection to DB:", err));
db.once("open", () => console.log("Connected to DB!"));

app.listen(port, () => {
  console.log(`users accessor listening on port ${port}`);
});

app.post("/", async (req, res) => {
  const user = await Users.create({
    email: req.body.email,
    preferences: req.body.preferences,
  });

  res.send("ok!");
});

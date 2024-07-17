"use strict";

const express = require("express");
const mongoose = require("mongoose");
const Users = require("./dbInfo");

const app = express();
app.use(express.json());
const port = 4000;

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

app.post("/newuser", async (req, res) => {
  if (db.readyState === 1) {
    // if db is connected
    const exists = await Users.findOne({ email: req.body.email });
    if (!exists) {
      try {
        const user = await Users.create({
          email: req.body.email,
          preferences: req.body.preferences,
        });

        res.status(200).send("Added new user successfully.");
      } catch (error) {
        res
          .status(400)
          .send("Can't add new user to db. Error: " + error.message);
      }
    } else {
      res.status(400).send("Email already exist.");
    }
  } else {
    res.status(500).send("Internal error, db is not connected.");
  }
});

app.post("/updateuser", async (req, res) => {
  if (db.readyState === 1) {
    // if db is connected
    const exists = await Users.findOne({ email: req.body.email });
    if (exists) {
      try {
        await Users.updateOne(
          { email: req.body.email },
          { preferences: req.body.preferences }
        );

        res.status(200).send("Updated user preferences successfully.");
      } catch (error) {
        res.status(400).send("Can't update user. Error: " + error.message);
      }
    } else {
      res.status(400).send("Can't find email in db.");
    }
  } else {
    res.status(500).send("Internal error, db is not connected.");
  }
});

app.delete("/unsubscribe", async (req, res) => {
  if (db.readyState === 1) {
    // if db is connected
    try {
      const user = await Users.deleteMany({ email: req.body.email });

      res.status(200).send("Deleted user successfully.");
    } catch (error) {
      res.status(400).send("Can't delete user. Error: " + error.message);
    }
  } else {
    res.status(500).send("Internal error, db is not connected.");
  }
});

app.get("/allusers", async (req, res) => {
  const result = await Users.find();
  res.send(result);
});

// returns preferences
app.get("/", async (req, res) => {
  if (db.readyState === 1) {
    // if db is connected
    try {
      const user = await Users.findOne({ email: req.body.email });
      if (user) {
        res.status(200).send(user.preferences);
      } else {
        res.status(400).send("Can't find email in db.");
      }
    } catch (error) {
      res
        .status(400)
        .send(
          "Can't return prefernces for this email. Error: " + error.message
        );
    }
  } else {
    res.status(500).send("Internal error, db is not connected.");
  }
});

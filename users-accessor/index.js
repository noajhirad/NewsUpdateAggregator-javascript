"use strict";

const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());
const port = 4000;

app.listen(port, () => {
  console.log(`users accessor listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("some response");
});

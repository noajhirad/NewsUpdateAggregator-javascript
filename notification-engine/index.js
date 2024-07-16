"use strict";

const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());
const port = 3000;

app.post("/messagequeue", (req, res) => {
  // console.log(req.body.email, req.body.text);
  sendMail(req.body.email, req.body.text);
  res.send({
    email: req.body.email,
    text: req.body.text,
  });
});

app.listen(port, () => {
  console.log(`notification engine listening on port ${port}`);
});

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "noajhirad1997@gmail.com",
    pass: "iupa wgvv skii epip",
  },
});

function sendMail(email, text) {
  const mainOptions = {
    from: "noaj1997@gmail.com",
    to: email,
    subject: "from madre padre project",
    text: text,
  };

  transporter.sendMail(mainOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("email sent:" + info.response);
    }
  });
}

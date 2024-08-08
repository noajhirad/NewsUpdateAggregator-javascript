"use strict";

const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  preferences: {
    type: [String],
    required: true,
  },
});

// const Users = mongoose.model("Users", usersSchema);
module.exports = mongoose.model("Users", usersSchema);

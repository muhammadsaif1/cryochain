const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const noteSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    organisation: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      trim: true,
    },
    areaOfInterest: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Note", noteSchema);

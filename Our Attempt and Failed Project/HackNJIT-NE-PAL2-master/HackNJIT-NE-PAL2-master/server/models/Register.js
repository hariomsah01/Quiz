const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true, // Make the username field unique
    },
    fullName: String,
    password: String,
    profile: Buffer,
  },
  { collection: "Register" }
);

const Register = mongoose.model("Register", registerSchema);

module.exports = Register;

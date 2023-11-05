const express = require("express");
const Register = require("./models/Register"); // Import your Mongoose model

const router = express.Router();

// Define an API route for retrieving a user based on their username
router.post("/LogIn", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Use Mongoose to find the user by their username
    const user = await Register.findOne({ username });

    if (user) {
      // User found, send the user object in the response

      if (user.password === password) {
        console.log(JSON.stringify(user._id));
        console.log("the password is correct");
        return res.status(200).json(user.username);
      } else {
        console.log("the password is wrong");
        return res.status(455).json(null);
      }
    } else {
      return res.status(444).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

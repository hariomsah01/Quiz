const express = require("express");
const multer = require("multer");

const Register = require("./models/Register");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define the '/register' route
router.post("/register", upload.single("profile"), async (req, res) => {
  const { username, fullName, password } = req.body;
  if (!username || !fullName || !password || !req.file) {
    return res
      .status(400)
      .json({ error: "Please fill in all the required fields." });
  }

  const profile = req.file.buffer; // The image data as a Buffer

  try {
    const newUser = new Register({
      username,
      fullName,
      password,
      profile,
    });

    await newUser.save();

    return res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    console.error("Registration error:", error);
    return res
      .status(500)
      .json({ error: "Registration failed. Please try again." });
  }
});

module.exports = router;

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const Image = require("./models/Image");
const registerRoutes = require("./registerRoutes");
const LoginCheck = require("./LoginCheck");
const app = express();
const port = process.env.PORT || 3001;

const uri =
  "mongodb+srv://sherpatsewang01:ECHryDFP638LfSmU@cluster0.ysdlj2q.mongodb.net/oceanBank"; // Replace with your MongoDB connection URI
mongoose.connect(uri);
app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const Register = require("./models/Register");
const router = express.Router();

app.use("/uploads", express.static("uploads"));
app.use("/", registerRoutes); // Use the route
app.use("/", LoginCheck);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/image/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const image = await Image.findById(id);

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    res.setHeader("Content-Type", image.contentType);
    res.send(image.data);
  } catch (error) {
    console.error("Error fetching image:", error);
    return res.status(500).json({ error: "Error fetching image" });
  }
});

app.post("/SendPic", upload.single("file"), async (req, res) => {
  const userLatitude = req.body.latitude; // Add this line to get the latitude from the client
  const userLongitude = req.body.longitude; // Add this line to get the longitude from the client

  console.log("User Latitude: " + userLatitude);
  console.log("User Longitude: " + userLongitude);

  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const image = new Image({
      name: file.originalname,
      data: file.buffer, // The image data as a Buffer
      contentType: file.mimetype,
      userLatitude: userLatitude, // Store the user's latitude
      userLongitude: userLongitude, // Store the user's longitude
    });

    await image.save();

    console.log("Image inserted with _id:", image._id);

    return res.json({ message: "File uploaded and saved successfully" });
  } catch (error) {
    console.error("Error saving image:", error);
    return res.status(500).json({ error: "Error saving image" });
  }
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require("multer");
const path = require("path");
const travelRoutes = require('./routes/travel.routes');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 6000;
const { MONGODB_URI } = process.env;
mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

app.use(cors());
app.use(express.json());
app.use('/api/travel', travelRoutes);

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder where uploaded files will be stored
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Set the file name for the uploaded image
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});

// Initialize Multer with the storage configuration
const upload = multer({ storage: storage });

// Handle POST requests to the /upload endpoint
app.post("/upload", upload.single("image"), (req, res) => {
  // Multer adds the file object to the request object (req.file)
  // You can now use req.file to access the uploaded image details
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  // File uploaded successfully
  res.send("File uploaded!");
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

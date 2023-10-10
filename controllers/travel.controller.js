const multer = require("multer");
const path = require("path");
const travelService = require('../services/travel.service');

// Create a new travel
exports.createTravel = async (req, res) => {
  try {
    const travel = await travelService.createTravel(req.body);
    res.status(201).json(travel);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create TravelInspiration' });
  }
};

// Retrieve all travel
exports.getAllTravel = async (req, res) => {
  try {
    const travel = await travelService.getAllTravel();
    res.status(200).json(travel);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch TravelInspiration' });
  }
};

// Update a travel by ID
exports.updateTravel = async (req, res) => {
  const travelId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedTravel = await travelService.updateTravel(travelId, updatedData);
    res.status(200).json(updatedTravel);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update Travel' });
  }
};

// Delete a travel by ID
exports.deleteTravel = async (req, res) => {
  const travelId = req.params.id;

  try {
    await travelService.deleteTravel(travelId);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete Travel' });
  }
};

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
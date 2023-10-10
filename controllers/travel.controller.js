
const travelService = require('../services/travel.service');
const path = require("path");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const crypto = require("crypto");

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
let gfs;

conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
  console.log("Connection Successful");
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: "uploads"
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

app.post("/", upload.single("img"), (req, res, err) => {
  res.send(req.files);
});

app.get("/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists"
      });
    }

    // Check if image
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: "Not an image"
      });
    }
  });
});
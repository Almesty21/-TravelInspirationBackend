
const Travel = require('../models/Travel');

// Create a new travel
exports.createTravel = async (travelData) => {
  const travel = new Song(travelData);
  return await song.save();
};

// Retrieve all travel
exports.getAllTravel = async () => {
  return await Song.find();
};

// Update a travel by ID
exports.updateTravel = async (travelId, updatedData) => {
  return await Song.findByIdAndUpdate(travelId, updatedData, { new: true });
};

// Delete a travel by ID
exports.deleteTravel = async (travelId) => {
  return await Song.findByIdAndDelete(travelId);
};






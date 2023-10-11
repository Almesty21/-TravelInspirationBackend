
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

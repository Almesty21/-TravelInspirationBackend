const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
     _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  attractions: [{
    name: {
      type: String,
      required: true
    }
  }]
});

module.exports = mongoose.model('travel', destinationSchema);


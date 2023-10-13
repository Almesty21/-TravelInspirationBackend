const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
    id:{
        type: String,
        unique: true,
        required: true
    },
    image:{
        type: String,
        required: true
    },
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


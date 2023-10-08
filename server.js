const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const travelRoutes = require('./routes/travel.routes');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
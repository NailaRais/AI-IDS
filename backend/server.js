const express = require('express');
const mongoose = require('mongoose');
const intrusionRoutes = require('./routes/intrusionRoutes');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/ai-ids', { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.use('/api/intrusions', intrusionRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

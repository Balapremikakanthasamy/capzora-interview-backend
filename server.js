const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Load .env file

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware first
app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Routes (after middleware)
const scheduleRoutes = require('./routes/schedule'); // ✅ correct
app.use('/api/schedule', scheduleRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Capzora Interview Scheduler API is running on http://localhost:${PORT}`);
});
app.get('/', (req, res) => {
  res.send('🚀 Capzora API is running');
});

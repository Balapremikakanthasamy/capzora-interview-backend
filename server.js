const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS - allow only Vercel frontend
app.use(cors({
  origin: ['https://capzora-interview-frontend-riqzumq1o.vercel.app'],
  methods: ['GET', 'POST'],
  credentials: true,
}));

// ✅ Body parser middleware
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Routes
const scheduleRoutes = require('./routes/schedule');
app.use('/api/schedule', scheduleRoutes);

// ✅ Health check route
app.get('/', (req, res) => {
  res.send('✅ Capzora.AI Interview Scheduler API is live.');
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT} or on deployed environment`);
});

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allowed origins
const allowedOrigins = [
  'http://localhost:3000', // for local dev
  'https://capzora-interview-frontend.vercel.app',
  'https://capzora-interview-frontend-riqzumq1o.vercel.app',
];

// ✅ CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('❌ Not allowed by CORS'));
    }
  },
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

// ✅ Health check
app.get('/', (req, res) => {
  res.send('✅ Capzora.AI Interview Scheduler API is live.');
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT} or deployed environment`);
});

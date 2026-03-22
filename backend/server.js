const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const path = require('path');

// Middleware
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Routes
app.get('/', (req, res) => {
  res.send('Passport Redesign API is running...');
});

// Import Routes
const authRoutes = require('./routes/auth');
const applicationRoutes = require('./routes/application');
// const appointmentRoutes = require('./routes/appointment');

app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);
// app.use('/api/appointments', appointmentRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/passport-redesign')
  .then(() => console.log('Connected to MongoDB Successfully'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

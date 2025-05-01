require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { auth } = require('./middleware/auth');
// // server.js
// const adminRoutes = require('./routes/auth/admin');

// // Other routes
// app.use('/api/auth/admin', adminRoutes);

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public routes
app.use('/api/users', require('./routes/users'));

// Pets routes - GET requests are public
app.get('/api/pets', (req, res, next) => {
  req.isPublic = true;
  next();
}, require('./routes/pets'));

app.get('/api/pets/:id', (req, res, next) => {
  req.isPublic = true;
  next();
}, require('./routes/pets'));

// Protected pets routes
app.use('/api/pets', auth, require('./routes/pets'));

// Protected routes
app.use('/api/adoptions', auth, require('./routes/adoptions'));
app.use('/api/reviews', auth, require('./routes/reviews'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
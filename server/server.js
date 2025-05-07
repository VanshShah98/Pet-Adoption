require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Stripe key
const connectDB = require('./config/db');
const { auth } = require('./middleware/auth');
const { Donation } = require('./models/Donation'); // Assuming you have a Donation model

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

// Stripe donation route
app.post('/api/donations/create-payment-intent', async (req, res) => {
  const { amount, donorName, donorEmail } = req.body;

  try {
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // amount in smallest currency unit (e.g., cents)
      currency: 'usd', // Change based on your currency
      description: 'Donation for Pet Adoption',
      metadata: { donorName, donorEmail },
    });

    // Send client secret to frontend to handle payment
    res.json({
      clientSecret: paymentIntent.client_secret,
    });

    // Store donation details in the database
    await Donation.create({
      donorName,
      donorEmail,
      amount,
      paymentId: paymentIntent.id,
      status: paymentIntent.status,
      currency: paymentIntent.currency,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to create payment intent' });
  }
});

// Donations route
app.use('/api/donations', require('./routes/donations'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

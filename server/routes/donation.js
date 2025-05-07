// server/routes/donations.js
const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const Donation = require('../models/Donation');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// POST /api/donations/create-payment-intent
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { donorName, donorEmail, amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to paise
      currency: 'inr',
      receipt_email: donorEmail,
      metadata: { donorName, donorEmail },
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Stripe error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

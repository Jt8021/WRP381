const express = require('express');
const router = express.Router();

const events = require('../data/events');
const team = require('../data/team');

// In-memory message storage
const messages = [];

// Middleware to log requests
router.use((req, res, next) => {
  console.log(`${req.method} request to ${req.path} at ${new Date().toISOString()}`);
  next();
});

// Home route with upcoming events
router.get('/', (req, res) => {
  const upcomingEvents = events.slice(0, 3); // Display up to 3 upcoming events
  res.render('pages/home', { upcomingEvents });
});

// About route
router.get('/about', (req, res) => {
  res.render('pages/about', { team });
});

// Events route
router.get('/events', (req, res) => {
  res.render('pages/events', { events });
});

// Team route
router.get('/team', (req, res) => {
  res.render('team', { team });
});

// Contact GET route
router.get('/contact', (req, res) => {
  res.render('pages/contact');
});

// Contact POST route with validation
router.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).render('pages/400', { error: 'All fields are required' });
  }
  if (!email.includes('@') || !email.includes('.')) {
    return res.status(400).render('pages/400', { error: 'Invalid email address' });
  }
  try {
    messages.push({ name, email, message, timestamp: new Date().toISOString() });
    console.log('New message stored:', { name, email, message });
    res.redirect('/thankyou');
  } catch (err) {
    console.error('Error storing message:', err);
    res.status(500).render('pages/500', { error: 'Failed to process your request' });
  }
});

// Thank You route
router.get('/thankyou', (req, res) => {
  res.render('pages/thankyou');
});

// 404 handler for undefined routes
router.use((req, res) => {
  res.status(404).render('pages/404', { message: 'Page not found' });
});

// Global error handler for 500 errors
router.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).render('pages/500', { error: 'Unexpected server error occurred' });
});

module.exports = router;

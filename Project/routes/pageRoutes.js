const express = require('express');
const router = express.Router();

// In-memory data storage
const messages = [];
const team = [
  { name: 'Johannes Theunissen', role: 'Team Lead', bio: 'Coordinates tasks and ensures smooth workflow.' },
  { name: 'Matthew Smith', role: 'Frontend Developer', bio: 'Builds clean, responsive UI with EJS and CSS.' },
  { name: 'Johannes Theunissen', role: 'Backend Developer', bio: 'Handles Express routing and server logic.' },
  { name: 'Kamogelo Sefadi', role: 'Data Manager', bio: 'Manages arrays and handles dynamic rendering.' },
  { name: 'Sandhyaa Budhu', role: 'Documentation Manager', bio: 'Prepares project documentation and README.' }
];
const events = [
  { title: 'Neighborhood Clean-Up', date: '2025-05-20', location: 'Community Park', image: '/images/cleanup.jpg' },
  { title: 'Food Drive', date: '2025-06-05', location: 'Town Hall', image: '/images/fooddrive.jpg' },
  { title: 'Tech Workshop', date: '2025-06-15', location: 'Library Conference Room', image: '/images/workshop.jpg' }
];

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
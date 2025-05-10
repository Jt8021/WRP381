// app.js


const express = require("express");
const path = require("path");
const pageRoutes = require("./routes/pageRoutes");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

app.get('/',(req, res)=>{
  res.render('pages/home');
});

app.get('/about', (req, res) => {
  const team = [
    { name: 'Johannes Theunissen', role: 'Team Lead', bio: 'Coordinates tasks and ensures smooth workflow.' },
    { name: 'Matthew Smith', role: 'Frontend Developer', bio: 'Builds clean, responsive UI with EJS and CSS.' },
    { name: 'Johannes Theunissen', role: 'Backend Developer', bio: 'Handles Express routing and server logic.' },
    { name: 'Kamogelo Sefadi', role: 'Data Manager', bio: 'Manages arrays and handles dynamic rendering.' },
    { name: 'Sandhyaa Budhu', role: 'Documentation Manager', bio: 'Prepares project documentation and README.' }
  ];

  res.render('pages/about', { team });
});

app.get('/events', (req, res) => {
  const events = [
    {
      title: 'Neighborhood Clean-Up',
      date: '2025-05-20',
      location: 'Community Park',
      image: '/images/cleanup.jpg'
    },
    {
      title: 'Food Drive',
      date: '2025-06-05',
      location: 'Town Hall',
      image: '/images/fooddrive.jpg'
    },
    {
      title: 'Tech Workshop',
      date: '2025-06-15',
      location: 'Library Conference Room',
      image: '/images/workshop.jpg'
    }
  ];

  res.render('pages/events', { events });
});

app.get('/contact', (req, res) => {
  res.render('pages/contact');
});

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  messages.push({ name, email, message });
  console.log('New message:', { name, email, message }); 
  res.redirect('/thankyou');
});

app.get('/thankyou', (req, res) => {
  res.render('pages/thankyou');
});


app.use("/", pageRoutes);

const messages = []; 



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

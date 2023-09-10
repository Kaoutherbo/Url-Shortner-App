
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const Url = require('./models/Url');
const shortid = require('shortid');
const passportLocalMongoose = require('passport-local-mongoose');

const app = express();

const dbURI =
  'mongodb+srv://kaouther02dz:kaouther@cluster0.5cvqcd3.mongodb.net/url-shortener?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((err) => {
    console.log(`OH NO! MONGO CONNECTION ERROR!`);
    console.log(err);
  });

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({ secret: 'your-secret-key', resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(
  session({ secret: 'your-secret-key', resave: true, saveUninitialized: true })
);


// User registration
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const newUser = new User({ username, email });
    await User.register(newUser, password);
    res.status(200).json({ message: 'Registration successful' });
    // Set isAuthenticated to true after successful registration
    req.session.isAuthenticated = true;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User login
app.post('/login', passport.authenticate('local'), (req, res) => {
   // Set isAuthenticated to true after successful login
   req.session.isAuthenticated = true;
  res.status(200).json({ message: 'Login successful' });
});

function checkAuthentication(req, res, next) {
  if (req.session.isAuthenticated) {
    // User is authenticated, proceed to the next middleware or route
    next();
  } else {
    // User is not authenticated, you can redirect them to the login or registration page
    res.redirect('/login'); // Redirect to the login page, or you can customize this behavior
  }
}

// URL shortening
app.post('/shorten', checkAuthentication, async (req, res) => {
  const { originalUrl } = req.body;
  const shortUrl = generateShortUrl();
  const user = req.user; // Assuming user is authenticated

  const url = new Url({ originalUrl, shortUrl, user });

  try {
    const savedUrl = await url.save();
    res.status(200).json({ shortUrl: savedUrl.shortUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Fetch user's shortened URLs
app.get('/urls', checkAuthentication, (req, res) => {
  const user = req.user; // Assuming user is authenticated
  Url.find({ user }, (err, urls) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json(urls);
  });
});

// Function to generate a short URL
function generateShortUrl() {
  return shortid.generate();
}

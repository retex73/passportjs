const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const app = express();

// set up view engine
app.set('view engine', 'ejs');

// cookie session
app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys: [keys.session.cookieKey]
}));

// Initialise passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb (throws deprecation errors)
// mongoose.connect(keys.mongodb.dbURI, () => {
//   console.log('connected to mongodb');
// });

mongoose.connection.openUri(keys.mongodb.dbURI, () => {
  console.log('connected to mongodb');
});

// set up routes
app.use('/auth', authRoutes);
// Middleware for css
app.use('/assets', express.static('assets'));
// Create home route
app.get('/', (req, res) => {
  res.render('home');
});

app.listen(3000, ()=> {
  console.log('App now listening for requests on port 3000');
});

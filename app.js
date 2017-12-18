const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');

const app = express();

// set up view engine
app.set('view engine', 'ejs');

// set up routes
app.use('/auth', authRoutes);
// Middleware
app.use('/assets', express.static('assets'));
// Create home route
app.get('/', (req, res) => {
  res.render('home');
});

app.listen(3000, ()=> {
  console.log('App now listening for requests on port 3000');
});

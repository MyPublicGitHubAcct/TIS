// modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');

// define routes
const test = require('./routes/api/test');
const auth = require('./routes/api/auth');
const user = require('./routes/api/user');

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

// passport configuration
require('./config/passport')(passport);

// use routes
app.use('/routes/api/test', test);
app.use('/routes/api/auth', auth);
app.use('/routes/api/user', user);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

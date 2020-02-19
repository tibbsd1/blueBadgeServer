require('dotenv').config()
var express = require("express");
var app = express();
var sequelize = require('./db')
var bodyParser = require('body-parser')

var signUp = require('./controllers/new-user-controller')
var login = require('./controllers/login-controller')
var profile = require('./controllers/profile-controller')

sequelize.sync();
app.use(bodyParser.json());
app.use(require('./middleware/headers'));

app.use('/login', login)
app.use('/signup', signUp)
app.use(require('./middleware/validate-session'));
app.use('/profile', profile)

//TESTS
app.get("/test", function(req, res) {
  res.send('This is the test route. I wonder where this will show up.');
});

app.listen(process.env.PORT, function() {
  console.log(`Currently running on ${process.env.PORT}`);
});

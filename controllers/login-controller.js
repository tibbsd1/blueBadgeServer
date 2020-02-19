//For existing users
var express = require('express')
var sequelize = require("../db");
var router = express.Router()
var bcrypt = require('bcryptjs')
var jwt = require("jsonwebtoken");
var User = sequelize.import('../models/userids');


router.post('/', function(req,res){
    let loginRequest = req.body.user.username;
    let password = req.body.user.passwordhash
    /*passes username into variable*/
    User.findOne({ /*finds single row where username column matches loginRequest variable*/
        where: {username: loginRequest}
    })
    .then(user => {
        user ? comparePasswords(user) : res.send("user not found");
    
        function comparePasswords(user) {
          bcrypt.compare(password, user.passwordhash, function(err, matches) {
            matches ? generateToken(user) : res.send("Incorrect Password");
          });
        }
    
        function generateToken(user) {
          var token = jwt.sign({ id: user.id, name: user.username }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24
          });
          res.json({
            user: user,
            message: "login verified, token created",
            sessionToken: token
          });
        }
      })
    // .then(user=> { /*takes what is found above and stores it in user*/
    //     user !== null ? 
    //     res.json(user) 
    //     : res.send('User is not found in postgres')
    // })
})


module.exports = router
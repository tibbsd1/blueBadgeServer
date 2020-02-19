var express = require('express')
var router = express.Router()
var sequelize = require("../db");
var jwt = require("jsonwebtoken");
var bcrypt = require('bcryptjs')
var User = sequelize.import('../models/userids');


router.post('/', function(req, res) {
    var userName = req.body.user.username
    var passwordHash = req.body.user.passwordhash

    User.create({
       /*Left side of colon is what table requires. Right side is what we want to shove in for the value in table */ 
        username: userName,
        passwordhash: bcrypt.hashSync(passwordHash, 10)
    }).then(
        function createSuccess(user) { /*jwt takes 3 arguments*/
            var token = jwt.sign({ id: user.id },process.env.JWT_SECRET, {
              expiresIn: 60 * 60 * 24
            });
            res.json({
              user: user,
              message: "token created for id, password hashed",
              sessionToken: token
            });
          },
          function createError(err) {
            res.send(500, err);    
          })
})

module.exports = router

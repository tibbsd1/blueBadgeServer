var express = require('express')
var router = express.Router()
var sequelize = require("../db");
var jwt = require("jsonwebtoken");
var bcrypt = require('bcryptjs')
var ProfilePage = sequelize.import('../models/profile');



//Upload track info and files
router.post('/myprofile', function(req,res){
    var trackTitle = req.body.profile.tracktitle;
    var year = req.body.profile.releaseyear
    var upload = req.body.profile.trackurl
    var owner = req.user.id/*req.user object is what is returned from middleware that allows us to access id*/
    var artistName = req.user.username
    
    ProfilePage.create({
        tracktitle: trackTitle,
        releaseyear: year,
        trackurl: upload,
        owner:owner,
        username: artistName

    }).then(function profileCreate(user){
        res.send(user)
    })
})


router.get("/myuploads", function(req, res) {
    var owner = req.user.id; //user object created from validate session
    ProfilePage
      .findAll({
          where: {owner: owner}
  
      })
      .then(
        function findAllSuccess(uploads) {
          res.json(uploads);
        },
        function findAllError(err) {
          res.status(500).send(err);
        }
      );
  });


//main page for browsing uploads from others
router.get('/feed', function(req,res) {
    ProfilePage.findAll({}
    ).then(uploads => {

        res.send(uploads)
    })
})


router.put('/update/:id', function(req,res){
    var updateData = req.body.profile
    var id = req.params.id //pull id from url
    var matchOwner = req.user.id


    ProfilePage.update({
        tracktitle : updateData.tracktitle,
        releaseyear : updateData.releaseyear,
    }, {where: {id: id, owner: matchOwner}}).then(userdata => {
        res.json(userdata);
    }), err => res.send('It/s Eff/d up bruv')
})


router.delete("/delete/:id", function(req, res) {
    var id = req.params.id;
    var matchOwner = req.user.id;
  
    ProfilePage.destroy({
        where: { id: id, owner: matchOwner }
      })
      .then(data => {
        return data > 0 ? res.json(data) : res.send("Nothing deleted");
      }),
      err => res.send(500, err.message);
  });


module.exports = router
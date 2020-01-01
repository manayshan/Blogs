const express = require('express');
const router = express.Router();

const User = require('../models/userModel');
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');

//POST: Creating use
router.post('/new', function(req, res){
    console.log(req);
    var tempUser = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password,
        bio: req.body.bio,
        gender: req.body.gender,
        age: req.body.age,
        created_at: Date.now(),
        updated_at: Date.now()
    });

    tempUser.save(function(err, user){
        if(err){
            res.json({Status: 'Error', Error: err});
        }else{
            res.json({Status: 'Success', Data: user});
        }
    });
});

// GET: get user
router.get("/:id", function(req, res) {
    console.log(req.params.id);
    User.findById(req.params.id, function(err, user) {
        if(err) {
            res.json({ Status:"error", Error:err});
        }
        else{
            res.json({ Status:"success", Data: user});
        }
    });
});

//PUT: update a user
router.put("/:id", function(req, res) {
    console.log(req.body);
    User.findByIdAndUpdate(req.params.id,
        {
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            bio: req.body.bio,
            gender: req.body.gender,
            age: req.body.age,
            updated_at: Date.now()
        },
        function(err, user) {
            if(err){
                res.json({ Status: "Error", Error: err});
            }
            else{
                res.json({ Status: "successfully Updated"});
            }
        }
    );
});

router.get('/:id/userprofile', function(req, res){
    var userObj = {};
    User.findById(req.params.id, function(err, user){
        if(err){
            res.json({Status: 'Error', Error: err});
        }else{
            userObj.name = user.fname + ' ' + user.lname;
            userObj.email =  user.email;
            userObj.gender = user.gender;
            userObj.age = user.age;
            userObj.postCount = user.posts.length;
            Comment.aggregate([
                {$match: {'commented_by': req.params.id}},
                {$count: 'comments'}
            ],
            function(err, comments){
                if(err){
                    res.json({Status: 'Error', Error: err});
                }else{
                    userObj.commentsCount= comments;
                    res.json({Status:'Success', Data: userObj});
                }
            });
        }
    });
});

module.exports = router;
const express = require('express');
const router = express.Router();

const User = require('../models/userModel');
const Post = require('../models/postModel');

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

//GET: get user
// router.get("/:id", function(req, res) {
//     console.log(req.params.id);
//     User.findById(req.params.id, function(err, user) {
//         if(err) {
//             res.json({ Status:"error", Error:err});
//         }
//         else{
//             res.json({ Status:"success", Data: user});
//         }
//     });
// });

//PUT: update a user
router.put("/:id", function(req, res) {
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
                res.json({ Status: "successfully Updated", Data: user})
            }
        }
    );
});
module.exports = router;
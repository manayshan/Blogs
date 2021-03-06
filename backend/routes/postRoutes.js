const express = require('express');
const router = express.Router();
const multer = require("multer");
const User = require('../models/userModel');
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, ".uploads/");
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(
        file.mimetype == "image/jpeg" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/png"
    ) {
        cb(null, true);
    }else {
        cb(null, false);
    }
};
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});


//Create a Post
router.post('/:id/new', function(req, res) {
    User.findById(req.params.id, function(err, user){
        if(err){
            res.json({Status: 'Error', Error: err});
        }else{
            Post.create(
                {
                    title: req.body.title,
                    description: req.body.description,
                    likes: 0,
                    // image_url: req.file.filename,
                    author: req.body.uId,
                    created_at: Date.now()
                },
                function(err, newPost) {
                    if(err){
                        res.json({Status: 'Error', Error: err});
                    }else{
                        user.posts.push(newPost);
                        user.save();
                        res.json({Status: 'Success', Data: newPost});
                    }
                }
            );
        }
    });
});

//Find all posts
router.get('/allposts', function(req, res){
    Post.find({}, function(err, posts){
        if(err){
            res.json({Status:'Error', Error: err});
        }else{
            res.json({Status: 'Success', Data: posts});
        }
    });
});

//Find top 10 posts sorted according to likes
router.get('/indexPosts', function(req, res){
    Post.aggregate([
        {$sort: {likes: -1}},
        {$limit: 10}
    ],
    function(err, posts){
        if(err){
            res.json({Status: 'Error', Error: err});
        }else{
            res.json({Status: 'Success', Data: posts});
        }
    });
});

//View post by Id
router.get('/:id', function(req, res) {
    Post.findById(req.params.id, function(err, post){
        if(err){
            res.json({Status: 'Error', Error: err});
        }else {
            res.json({Status: 'Success', Data: post});
        }
    });
});

//Update post
router.put('/:id', function(req, res){
    Post.findByIdAndUpdate(req.params.id,
        {
            title: req.body.title,
            description: req.body.description,
            likes: req.body.likes,
            author: req.body.uId,
            updated_at: Date.now()
        },
        function(err, post){
            if(err){
                res.json({Status: 'Error', Error: err});
            }else{
                res.json({Status: 'Success updated Post'});
            }
        }
        );
});


//Submitting likes
router.put('/:id/likes', function(req, res) {
    Post.findById(req.params.id, function(err, post){
        if(err){
            res.json({Status: 'Error', Error: err});
        }else{
            var tempLikes = post.likes;
            tempLikes = tempLikes+1;
            Post.findByIdAndUpdate(req.params.id,
                {
                    likes: tempLikes
                },
                function(err, posts){
                    if(err){
                        res.json({Status: 'Error', Error: err});
                    }else{
                        res.json({Status: 'Success- Likes Updated'});
                    }
                });
            }
        });
});


module.exports = router;
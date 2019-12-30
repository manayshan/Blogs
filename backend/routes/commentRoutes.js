const express = require('express');
const router = express.Router();

const Comment = require('../models/commentModel');
const Post = require('../models/postModel');

//Create a comment
router.post('/:id/addComment', function(req, res){
    console.log(req.params.id);
    Post.findById(req.params.id, function(err, post){
        if(err){
            res.json({Status: 'Error', Error: err});
        }else{
            console.log(req.body);
            Comment.create(
                {
                    commented_by: req.body.userId,
                    post_id: req.params.id,
                    comment: req.body.comment,
                    created_at: Date.now(),
                    updated_at: Date.now()
                },
                function(err, newComment){
                    if(err){
                        res.json({Status: 'Error', Error: err});
                    }else{
                        post.comments.push(newComment);
                        post.save();
                        res.json({Status: 'Success', Data: newComment});
                    }
                }
            );
        }
    });
});

module.exports = router;
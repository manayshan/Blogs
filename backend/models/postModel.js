const mongoose = require('mongoose');
const Comment = require('../models/commentModel');

var postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: false
    },
    image_url: {
        type: String,
        required: false
    },
    author: {
        type: String,
        required: true 
    },
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    created_at: {
        type: Date,
        required: false
    },
    updated_at: {
        type: Date,
        required: false
    }
});

module.exports = mongoose.model('Post', postSchema);
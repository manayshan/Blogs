const mongoose = require('mongoose');
const Post = require('../models/postModel')

var userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required:true
    },
    bio: {
        type: String,
        required: true
    },
    gender: {
        type: String
    },
    age: {
        type: Number
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
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

module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    commented_by: {
        type: String,
        required: true
    },
    post_id: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: false
    },
    updated_at: {
        type: Date,
        required: false
    }
});

module.exports = mongoose.model('Comment', commentSchema);
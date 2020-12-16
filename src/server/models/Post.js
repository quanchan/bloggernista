const mongoose = require('mongoose')
const Schema = mongoose.Schema
const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        min: 6
    },
    author: {
        type: String,
        required: true,
        default: "Admin Quan"
    }, 
    body: {
        type: String,
        required: true
    },
    private: {
        type: Boolean,
        require: true,
        default: false
    },
    permitedViewer: {
        type: [String],
        default: []
    },

})

module.exports = mongoose.model('Post', postSchema)
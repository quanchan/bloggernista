const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    title: String,
    author: String, // Link to user
    body: String,
    permitedViewer: [String] // Link to user
})

const Post = mongoose.model('Post', postSchema)
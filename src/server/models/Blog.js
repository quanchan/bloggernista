const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title: String,
    author: String, // Link to user
    body: String,
    permitedViewer: [String] // Link to user
})

const Blog = mongoose.model('Blog', blogSchema)
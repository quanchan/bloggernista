const mongoose = require('mongoose')
const Schema = mongoose.Schema
const adminSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 40,
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 256,
    }
    
})

module.exports = mongoose.model('Admin', adminSchema)
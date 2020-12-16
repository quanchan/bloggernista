const router = require('express').Router()
const verify = require('./verifyToken')
const Post = require('../models/Post')

router.get('/', verify, async (req, res) => {
    if (req.user.status === 'admin') {
        // This will be replaced by admin page
        try {
            posts = await Post.find({})
            res.json(posts)
        } catch (err) {
            console.error(err)
        }
    } else if (req.user.status === 'user') {
        //This will be replaced by specific user page
        try {
            posts = await Post.find({ $or: [
                {private: false},
                {permitedViewer: req.user._id}
            ]})
            res.json(posts)
        } catch (err) {
            console.error(err)
        }
    }
})

module.exports = router
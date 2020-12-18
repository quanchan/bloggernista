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
                {isPrivate: false},
                {permitedViewer: req.user._id}
            ]})
            res.json(posts)
        } catch (err) {
            console.error(err)
        }
    }
})

router.post('/', verify, async (req, res) => {
    if (req.user.status === 'admin') {
        const {title, body, isPrivate, permitedViewer} = req.body
        try {
            const newPost = new Post({
                title,
                body,
                isPrivate,
                permitedViewer,
            })
            const savePost = await newPost.save()
            console.log("Post saved successfully")
            res.status(201)
        } catch(err) {
            console.log("Cannot save post")
            console.log(err)
            res.status(400).send(err)
        }
    }
})

router.delete('/:id', verify, async (req, res) => {
    if (req.user.status === 'admin') {
        const postId = req.params.id
        await Post.deleteOne({ _id: postId })
        console.log("Deleted")
        res.status(200).send("Deleted")
    }
})

router.put('/:id', verify, async (req, res) => {
    if (req.user.status === 'admin') {
        try {
            const postId = req.params.id
            const {title, body, isPrivate, permitedViewer} = req.body
            await Post.updateOne({ _id: postId }, {title, body, isPrivate, permitedViewer})
            console.log("Updated")
            res.status(200).send("Updated")
        } catch (err) {
            console.log(err)
        }
    }
})
module.exports = router
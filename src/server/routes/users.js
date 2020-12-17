const router = require('express').Router()
const verify = require('./verifyToken')
const User = require('../models/User')

router.get('/', verify, async (req, res) => {
    if (req.user.status === 'admin') {
        // This will be replaced by admin page
        try {
            users = await User.find({}, '_id username')
            res.json(users)
        } catch (err) {
            console.error(err)
        }
    }
})

module.exports = router
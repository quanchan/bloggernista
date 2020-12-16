const router = require('express').Router()
const verify = require('./verifyToken')
router.get('/', verify, (req, res) => {
    if (req.user.status === 'admin') {
        // This will be replaced by admin page
        res.json({
            posts: 
                [
                {
                    title: 'My first private post',
                    description: 'Hello World'
                },
                {
                    title: 'My second private post',
                    description: 'Goodbye World'
                }
            ]
        })
    } else if (req.user.status === 'user') {
        //This will be replaced by specific user page
        res.send("Access Denied")
    }
})

module.exports = router
const router = require('express').Router()
const verify = require('./verifyToken')
router.get('/', verify, (req, res) => {
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
})

module.exports = router
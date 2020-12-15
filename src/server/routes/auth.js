const router = require('express').Router()
const User = require('../models/User')
const { userValidation } = require('../validation')

router.post('/register', async (req, res) => {
    // Validate input data before checking and saving
    const { error } = userValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    //Check if the user exist
    const userNameExist = await User.findOne({username: req.body.username})
    if (userNameExist) return res.status(400).send("Username already exists")

    //Create new user
    const user = new User({
        username: req.body.username,
        password: req.body.password,
    })
    try {
        const saveUser = await user.save() 
        console.log("Successful saved user")
        res.send(saveUser)
    } catch(err) {
        res.status(400).send(err)
    }
})

module.exports = router
const router = require('express').Router()
const User = require('../models/User')
const Admin = require('../models/Admin')
const { userValidation } = require('../validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
router.post('/register', async (req, res) => {
    // Validate input data before checking and saving
    const { error } = userValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    //Check if the user exist
    const userNameExist = await User.findOne({username: req.body.username})
    if (userNameExist) return res.status(400).send("Username already exists")

    //Hash passwords
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //Create new user
    const user = new User({
        username: req.body.username,
        password: hashedPassword,
    })
    try {
        const saveUser = await user.save() 
        console.log("Successful saved user")
        res.send({ user: user._id })
    } catch(err) {
        res.status(400).send(err)
    }
})

router.post('/login', async (req, res) => {
    //Check if an admin account
    const admin = await Admin.findOne({username: req.body.username})
    if (admin) {
        const validPass = await bcrypt.compare(req.body.password, admin.password)
        if (!validPass) return res.status(400).send("Invalid password")
        const token = jwt.sign({
            _id: admin._id,
            status: "admin"
        }, process.env.TOKEN_SECRET)
        res.header('Auth-Token', token).send({ _id: admin._id, status: "admin", token: token }) 
    }
    else if (!admin) {
    //Check if user exist
        const user = await User.findOne({username: req.body.username})
        if (!user) return res.status(400).send("User does not exist")

        //Check if password is valid
        const validPass = await bcrypt.compare(req.body.password, user.password)
        if (!validPass) return res.status(400).send("Invalid password")

        // Create and assign a token
        const token = jwt.sign({
            _id: user._id,
            status: "user"
            }, 
            process.env.TOKEN_SECRET
        )
        res.header('Auth-Token', token).send({ _id: user._id, status: "user", token: token })
    } 

})

module.exports = router
const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

// Register

router.post("/register", async(req, res)=> {
    // hash password
    const salt =  bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        img: req.body.img,
        password: hashedPassword
    })

    try {
        const user = await newUser.save()
        const { password, ...others} = user._doc
        res.status(200).send(others)
    } catch (err) {
        res.status(400).send(err)
    }
})

// login

router.post('/login', async(req, res)=> {
    try {
        const user = await User.findOne({username: req.body.username}) 
        if(!user) return res.status(400).send("Wrong Credentials")
        const checkPassword = await bcrypt.compare(req.body.password, user.password)
        if(!checkPassword) return res.status(400).send("Wrong Credentials")
        const token = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SECRET)
        const {password, ...others} = user._doc
        res.status(200).send({...others, token})
    } catch (err) {
        res.status(400).send(err)
    }

})


module.exports = router
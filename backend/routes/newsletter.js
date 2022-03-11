const Newsletter = require("../models/Newsletter")

const router = require("express").Router()

router.post('/', async(req, res)=>{
    const checkEmail = await Newsletter.findOne({email: req.body.email})
    if(checkEmail) return res.status(400).send("Email already provided.")
    try {
       const newEmail = new Newsletter({email: req.body.email}) 
       const savedEmail = await newEmail.save()
       res.status(200).send(savedEmail)
    } catch (error) {
        res.status(400).send(error)
    }
})


router.get("/", async(req, res)=>{
    try {
        const emails = await Newsletter.find()
        res.send(emails).status(200)
    } catch (error) {
        res.status(400).send(error) 
    }
})



module.exports = router
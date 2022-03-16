
const Review = require('../models/Review')
const router = require("express").Router()
const {verifyToken} = require("./verifyToken")

router.post('/',verifyToken,async(req, res)=>{
    const newReview = new Review(req.body)
    try{
        const savedReview = await newReview.save()
        res.status(200).send(savedReview)
    }catch(err){
        res.status(400).send(err)
    }
})

router.get('/',async(req, res)=>{
   
    try{
        const reviews = await Review.find()
        res.status(200).send(reviews)
    }catch(err){
        res.status(400).send(err)
    }
})

router.get('/find/:id',async(req, res)=>{
   
    try{
        const review = await Review.findById(req.params.id)
        res.status(200).send(review)
    }catch(err){
        res.status(400).send(err)
    }
})
router.get('/:id',async(req, res)=>{
   
    try{
        const review = await Review.find({productId:req.params.id}).populate("postedBy")
        res.status(200).send(review)
    }catch(err){
        res.status(400).send(err)
    }
})


router.put('/:id',verifyToken,async(req,res)=>{
    if (req.user.id === req.body.userId || req.user.isAdmin === true ) {
        try{
           const updatedReview = await Review.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
           res.status(200).send(updatedReview)
        }catch(err){
            res.status(400).send(err)
        }
    }else{
        res.status(400).send("Yo have no permission to perform the action")
    }
})

router.delete('/:id',verifyToken,async(req,res)=>{
    if (req.user.id === req.body.userId || req.user.isAdmin === true   ) {
        try{
            await Review.findByIdAndDelete(req.params.id)
           res.status(200).send("Review Deleted!!")
        }catch(err){
            res.status(400).send(err)
        }
    }else{
        res.status(400).send("Yo have no permission to perform the action")
    }
})







module.exports = router
const router = require("express").Router()
const Cart = require("../models/Cart");
const {verifyToken} = require("./verifyToken")

router.post("/", verifyToken, async (req, res) => {
   
        const newCart = new Cart(req.body)
     try{
        const savedCart = await newCart.save()
        res.status(200).send(savedCart)
     }catch(err){
         res.status(400).send(err)
     }
    
  });

  router.put('/:id',verifyToken,async(req,res)=>{
    if (req.user.id === req.body.userId ) {
        try{
           const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
           res.status(200).send(updatedCart)
        }catch(err){
            res.status(400).send(err)
        }
    }else{
        res.status(400).send("Yo have no permission to perform the action")
    }
})

router.delete('/:id',verifyToken,async(req,res)=>{
    if (req.user.id === req.body.userId ) {
        try{
            await Cart.findByIdAndDelete(req.params.id)
           res.status(200).send("Cart Removed!!")
        }catch(err){
            res.status(400).send(err)
        }
    }else{
        res.status(400).send("Yo have no permission to perform the action")
    }
})


router.get('/find/:userId',verifyToken, async(req, res)=> {
    if (req.user.id === req.params.userId ) {
        try{
            const cart = await Cart.findOne({_id: req.params.id})
            
            res.status(200).send(cart)
          }catch(err){
            res.send(err).status(400)
          } 
        }else{
            res.status(400).send("Yo have no permission to perform the action")
        }
  })

  router.get('/', async(req, res)=> {
    if (req.user.isAdmin === true ) {
        try{
            const carts = await Cart.find()
            
            res.status(200).send(carts)
          }catch(err){
            res.send(err).status(400)
          } 
        }else{
            res.status(400).send("Yo have no permission to perform the action")
        }
  })

  
  




module.exports = router
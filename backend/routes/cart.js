const router = require("express").Router()
const Cart = require("../models/Cart");
const {verifyToken} = require("./verifyToken")

router.post("/", verifyToken, async (req, res) => {

    const cart = await Cart.findOne({userId: req.body.userId})

    try {
        if(cart){
            cart.products.push(req.body.products[0])
            await cart.save()
            res.status(200).send(cart)
        }else{
            const newCart = new Cart(req.body)
            const savedCart = await newCart.save()
            res.status(200).send(savedCart)
        }
    } catch (error) {
        res.status(400).send(error)
    }

    
  });

//   router.put('/:id',verifyToken,async(req,res)=>{
//     if (req.user.id === req.body.userId ) {
//         try{
//            const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
//            res.status(200).send(updatedCart)
//         }catch(err){
//             res.status(400).send(err)
//         }
//     }else{
//         res.status(400).send("Yo have no permission to perform the action")
//     }
// })

router.put('/:productId/:userId',verifyToken,async(req,res)=>{
    const cart = await Cart.findOne({userId: req.params.userId})
    try {
        

        const product = cart.products.filter((m)=>{
            return m.productId !== req.params.productId
        })

        product.map((m)=>{
            cart.products = m.products
        
        })

        await cart.save()

        res.send(cart).status(200)







    } catch (error) {
        res.status(400).send(error)
    }
})


router.get('/find/:userId',verifyToken, async(req, res)=> {
    if (req.user.id.toString() === req.params.userId.toString() ) {
        try{
            const cart = await Cart.findOne({userId: req.params.userId})
            
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
const router = require("express").Router()
const Product = require("../models/Product");
const {verifyToken} = require("./verifyToken")

router.post("/", verifyToken, async (req, res) => {
    if (req.user.isAdmin) {
        const newProduct = new Product(req.body)
     try{
        const savedProduct = await newProduct.save()
        res.status(200).send(savedProduct)
     }catch(err){
         res.status(400).send(err)
     }
    }else{
        res.status(400).send("You have no permission to perform the action.")
    }
  });

  router.put('/:id',verifyToken,async(req,res)=>{
    if (req.user.isAdmin ) {
        try{
           const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
           res.status(200).send(updatedProduct)
        }catch(err){
            res.status(400).send(err)
        }
    }else{
        res.status(400).send("Yo have no permission to perform the action")
    }
})

router.delete('/:id',verifyToken,async(req,res)=>{
    if (req.user.isAdmin ) {
        try{
           await Product.findByIdAndDelete(req.params.id)
           res.status(200).send("Product Removed!")
        }catch(err){
            res.status(400).send(err)
        }
    }else{
        res.status(400).send("Yo have no permission to perform the action")
    }
})
router.get('/find/:id', async(req, res)=> {
    
        try{
            const product = await Product.findById(req.params.id)
            
            res.status(200).send(product)
          }catch(err){
            res.send(err).status(400)
          } 
    
  })

  router.get('/', async(req, res)=> {
      const qnew = req.query.new
      const qcategory = req.query.category
    
        try{
            let products;
            if(qnew){
                products =  await Product.find().sort({createdAt: -1}).limit(15)
            }else if(qcategory){
                products = await Product.find({categories: {$in: [qcategory]}})
            }else{
                products = await Product.find()
            }
            res.send(products).status(200)
          }catch(err){
            res.send(err).status(400)
          } 
    
  })
  




module.exports = router
const router = require("express").Router()
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const {verifyToken} = require("./verifyToken")

router.put("/:id", verifyToken, async (req, res) => {
    if (req.user.isAdmin || req.user.id === req.params.id) {
      if (req.body.password) {
          const salt = await bcrypt.genSalt(10);
          const hashedpassword = await bcrypt.hash(req.body.password, salt);
          req.body.password = hashedpassword;
        }
      try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
  
        res.status(200).send(updatedUser)
      } catch (err) {
        console.log(err);
      }
    }else{
        res.status(400).send("You have no permission to perform the action.")
    }
  });

  router.delete('/:id',verifyToken,async(req,res)=>{
    if (req.user.isAdmin || req.user.id === req.params.id) {
        try{
            await User.findByIdAndDelete(req.params.id)
            res.status(200).send("User deleted!")
        }catch(err){
            res.status(400).send(err)
        }
    }else{
        res.status(400).send("Yo have no permission to perform the action")
    }
})
router.get('/find/:id',verifyToken, async(req, res)=> {
    if(req.user.isAdmin === true){
        try{
            const user = await User.findById(req.params.id)
            const {password, ...others} = user._doc
            res.status(200).send(others)
          }catch(err){
            res.send(err).status(400)
          } 
    }else{
        res.status(400).send("You have no permision")
    }
  })

  router.get('/',verifyToken, async(req, res)=> {
      const query = req.query.new
    if(req.user.isAdmin === true){
        try{
            const users = query? await User.find().sort({_id: -1}).limit(5):await User.find()
            res.status(200).send(users)
          }catch(err){
            res.send(err).status(400)
          } 
    }else{
        res.status(400).send("You have no permision")
    }
  })
  router.get('/stats',verifyToken, async(req, res)=> {
  if(req.user.isAdmin === true){
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1))
      try{

        const data = await User.aggregate([
            {$match: {createdAt: {$gte: lastYear}}},
            {
                $project: {
                    month: {$month: "$createdAt"}
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum : 1}
                }
            }
        ])
        res.status(200).send(data)

        }catch(err){
          res.send(err).status(400)
        } 
        }else{
      res.status(400).send("You have no permision")
  }
})





module.exports = router
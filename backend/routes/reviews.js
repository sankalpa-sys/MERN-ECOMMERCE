const Review = require("../models/Review");
const router = require("express").Router();
const { verifyToken } = require("./verifyToken");

router.post("/", verifyToken, async (req, res) => {
  
  const newReview = new Review(req.body);
  try {
    const review = await Review.find({ productId: req.body.productId });
    const reviewArr = review.filter((m) => {
     return m.postedBy.toString() === req.body.postedBy.toString();
    });
    if(reviewArr.length !== 0){
        res.status(400).send("already reviewed")
    }else{
    const savedReview = await newReview.save();
    res.status(200).send(savedReview);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).send(reviews);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate(
      "postedBy",
      "_id"
    );
    res.status(200).send(review);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const review = await Review.find({ productId: req.params.id }).populate(
      "postedBy"
    );
    res.status(200).send(review);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  const review = await Review.findById(req.params.id).populate(
    "postedBy",
    "_id"
  );

  if (
    req.user.id.toString() === review.postedBy._id.toString() ||
    req.user.isAdmin === true
  ) {
    try {
      const updatedReview = await Review.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).send(updatedReview);
    } catch (err) {
      res.status(400).send(err);
    }
  } else {
    res.status(400).send("You have no permission to perform the action");
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  const review = await Review.findById(req.params.id).populate(
    "postedBy",
    "_id"
  );

  if (
    req.user.id.toString() === review.postedBy._id.toString() ||
    req.user.isAdmin === true
  ) {
    try {
      await Review.findByIdAndDelete(req.params.id);
      res.status(200).send(review);
    } catch (err) {
      res.status(400).send(err);
    }
  } else {
    res.status(400).send("You are not authorized to perform the action.");
  }
});

// Get user's review

router.get('/userreview/:product_id/:user_id', verifyToken, async(req, res)=>{
 try {
  const review = await Review.find({productId: req.params.product_id}).populate("postedBy")
  const usersReview = review.filter((m)=>{
    return m.postedBy._id.toString() === req.params.user_id
  })
  res.status(200).send(usersReview)
  
 } catch (error) {
   res.status(400).send(error)
 }
})

module.exports = router;

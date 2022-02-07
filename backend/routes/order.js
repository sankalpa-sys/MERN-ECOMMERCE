const router = require("express").Router();
const Order = require("../models/Order");
const { verifyToken } = require("./verifyToken");

router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedorder = await newOrder.save();
    res.status(200).send(savedorder);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  if (req.user.isAdmin === true) {
    try {
      const updatedorder = await Order.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).send(updatedorder);
    } catch (err) {
      res.status(400).send(err);
    }
  } else {
    res.status(400).send("Yo have no permission to perform the action");
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  if (req.user.isAdmin === true) {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).send("order Removed!!");
    } catch (err) {
      res.status(400).send(err);
    }
  } else {
    res.status(400).send("Yo have no permission to perform the action");
  }
});

router.get("/find/:userId", verifyToken, async (req, res) => {
  if (req.user.id === req.params.userId) {
    try {
      const order = await Order.find({ userId: req.params.userId });

      res.status(200).send(order);
    } catch (err) {
      res.send(err).status(400);
    }
  } else {
    res.status(400).send("You have no permission to perform the action");
  }
});

router.get("/",verifyToken, async (req, res) => {
  if (req.user.isAdmin === true) {
    try {
      const orders = await Order.find();

      res.status(200).send(orders);
    } catch (err) {
      res.send(err).status(400);
    }
  } else {
    res.status(400).send("Yo have no permission to perform the action");
  }
});
// GET MONTHLY INCOME

router.get("/income",verifyToken, async (req, res) => {
  if (req.user.isAdmin === true) {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(
      new Date().setMonth(lastMonth.getMonth() - 1)
    );

    try {
      const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).send(income);
    } catch (err) {
      res.status(500).send(err);
    }
  }
});

module.exports = router;

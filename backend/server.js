const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const cors = require('cors');
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")
const stripeRoute = require("./routes/stripe")
const newsletterRoute = require('./routes/newsletter')
const app = express();
app.use(express.json())
const port = process.env.PORT || 8001

mongoose.connect(process.env.MONGO_URL).then(console.log("Database Connected")).catch(err=>console.log(err))

app.use(cors());

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/cart",cartRoute)
app.use("/api/orders",orderRoute)
app.use('/api/checkout', stripeRoute)
app.use('/api/newsletter', newsletterRoute)


app.listen(port, ()=> {
    console.log(`Server running on port ${port}`)
})
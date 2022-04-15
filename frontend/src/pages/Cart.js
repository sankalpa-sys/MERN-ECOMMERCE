import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { emptyCart, removefromCart} from "../redux/cartRedux";
import { useSpeechSynthesis } from 'react-speech-kit';



import Alert from "../components/Alert";
import { userRequest } from "../requestMethods";
import KhaltiCheckout from "khalti-checkout-web";
import { config } from "../khalti";

const KEY =
  "pk_test_51KQ0ASC3LWJt31ivbFCE967KPZy7XaRXmXIDFrjevK0QiscEwYexNV1FakZAC25DbPuxTl2tV0Q7esfUPDDUKaTD00LsfGnSSN";

function Cart({ alert, showAlert }) {

  const { speak } = useSpeechSynthesis();
  const mode  = useSelector(state => state.theme.theme)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [stripeToken, setStripeToken] = useState(null);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  const onToken = (token) => {
    setStripeToken(token);
  };
  useEffect(() => { 
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8001/api/checkout/payment",
          {
            tokenId: stripeToken.id,
            amount: totalPrice * 100,
          }
        );
        console.log(res.data);
        try {
          await userRequest.post("/orders", {
            userId: user.currentUser._id,
            products: userCartProducts,
            amount: res.data.amount / 100,
            address: res.data.billing_details.address,
          });
        } catch (error) {
          console.log(error);
        }
        navigate("/success");
        speak({text:"Thank you for choosing Dokan. Your order has been placed successfully. Please wait for the delivery of your order."})
       
      } catch (err) {
        console.log(err);
      }
    };

    stripeToken && makeRequest();
  }, [stripeToken]);

  const handleEmptyClick = () => {
    dispatch(emptyCart());
    showAlert("Cart emptied", "success", "Success");
  };

  const checkout = new KhaltiCheckout(config);

  const handleKhaltiButtonClick = () => {
    checkout.show({ amount: totalPrice * 100 });
  };


  const userCartProducts = cart.products?cart.products.filter((f)=>{
    return f.userId === user.currentUser._id
  }):""



  const totalPriceArr = userCartProducts?userCartProducts.map((m)=>{
    return (m.price * m.quantity)
  }):""

  const totalPrice = userCartProducts.length !== 0?totalPriceArr.reduce((a,b)=>{
    return (a + b)
  }):""
  console.log(totalPrice)





  const handleRemoveItem = (i) => {
    dispatch(removefromCart({id: i, userId: user.currentUser._id}));
    showAlert("Item removed from cart", "success", "Success");
  }


  
 





  return (
    <div>
      <Navbar />
      <Announcement />
      <Alert alert={alert} />

      <div className={mode === "light"?"w-full select-none bg-gray-200 pb-3 pt-3 ":"w-full select-none bg-gray-800  text-white pt-3 pb-3"}>
        <h1   className="text-center text-4xl font-light  text-red-600  font-mono">
          YOUR CART
        </h1>
        <div className="flex flex-col   md:flex-row mt-10 items-center space-y-8 md:justify-between mx-4">
          <div className=" w-full flex-grow   md:w-1/2 pr-2">
            <div className="my-10 flex w-full  justify-between space-x-4 text-sm md:text-base items-start">
              <Link to="/">
                <button className={mode ==="light"?"ml-4 mr-3 h-12 md:h-10 border-1 px-1  hover:text-red-800 hover:border-red-800 border-black bg-white":"ml-4 mr-3 h-12 md:h-10 border-1 px-1 text-white  hover:text-red-800 hover:border-white border-black bg-black"}>
                  {userCartProducts.length === 0
                    ? "SHOP NOW"
                    : "CONTINUE SHOPPING"}
                </button>
              </Link>
              <div className="flex justify-between items-center space-x-4 px-6">
                <p className="border-b-2 border-gray-500 cursor-pointer">
                  Shopping Cart({userCartProducts.length})
                </p>
                <p className="border-b-2 border-gray-500 cursor-pointer">
                  Your Wishlist(0)
                </p>
                {userCartProducts.length === 0 ? (
                  ""
                ) : (
                  <p
                    onClick={handleEmptyClick}
                    className="border-b-2 border-gray-500 cursor-pointer"
                  >
                    Empty Cart
                  </p>
                )}
              </div>
            </div>
            <hr />

            {userCartProducts.length === 0 ? (
              <p className="text-center mt-4 font-bold text-2xl text-red-600 uppercase">
                No Items in your cart
              </p>
            ) : (
              userCartProducts.map((c) => (
                <div
                  key={c._id}
                  className="mt-6 w-full px-4  flex justify-around items-center space-x-4 ml-4"
                >
                  <img
                    className="h-60 object-cover object-top select-none w-48 md:w-60"
                    src={c.img}
                    alt=""
                  />
                  <div className="flex   justify-between items-center flex-grow">
                    <div className="flex flex-col justify-center space-y-3">
                      <h5 className="text-sm">
                        <b>Product:</b> {c.title}
                      </h5>
                      <h5 className="text-sm flex items-center space-x-2">
                        <b className="">COLOR:</b>{" "}
                        <p
                          className={`w-4 h-4 rounded-full`}
                          style={{ backgroundColor: c.color }}
                        ></p>
                      </h5>
                      <h5 className="flex items-center space-x-2 text-sm">
                        <b>SIZE:</b> <p className="uppercase">{c.size}</p>
                      </h5>
                    </div>
                    <div className="flex flex-col space-y-6 mr-2">
                      <div className="flex flex-col md:flex-row justify-between items-center space-y-3 space-x-3">
                        <input
                          type="number"
                          defaultValue={c.quantity}
                          className="outline-none border-1 border-gray-400 w-20 h-8 p-2 rounded-lg text-black"
                        />
                        <button
                          onClick={() => handleRemoveItem(c._id)}
                          className="h-8 w-20 bg-red-600  text-gray-200 p-1 rounded-lg mb-3 hover:scale-105 hover:bg-red-700 hover:text-gray-100 active:scale-90 transform transition duration-300 ease-out shadow-xl shadow-red-600/40"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="text-2xl text-yellow-600">
                        ${c.price * c.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div
            hidden={userCartProducts.length === 0}
            className=" flex select-none space-y-4 flex-col h-96 w-96 border rounded-lg bg-gray-900 text-white border-gray-400 p-4"
          >
            <h1 className="mt-2 mb-4 text-center text-2xl font-light  pb-1">
              ORDER SUMMARY
            </h1>
    
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p className="text-left">${totalPrice}</p>
            </div>
            <div className="flex justify-between">
              <p>Estimated Shipping</p>
              <p className="text-left">$ 5.90</p>
            </div>

            <div className="flex justify-between">
              <p>Shipping Discount</p>
              <p className="text-left">$ -5.90</p>
            </div>
            <div className="flex justify-between">
              <p className="text-2xl font-semibold">Total</p>
              <p className="text-2xl text-left font-semibold text-yellow-500">
                ${totalPrice}
              </p>
            </div>

            <div className="flex space-x-2 justify-center">
              <StripeCheckout
                name="Dokan"
                image="https://cdn.pixabay.com/photo/2016/12/20/05/24/store-1919712__480.png"
                billingAddress
                shippingAddress
                description={`Your total is $${totalPrice}`}
                amount={totalPrice * 100}
                token={onToken}
                stripeKey={KEY}
              >
                <button className="bg-red-600   shadow-xl  hover:shadow-red-600/50 text-white  p-2 mt-4 hover:scale-105 transform transition duration-300 ease-out">
                  Pay with Stripe
                </button>
              </StripeCheckout>
              <button
                className="bg-purple-600   shadow-xl border-purple-600  hover:shadow-purple-600/50 border-1  text-white  p-2 mt-4 hover:scale-105 transform transition duration-300 ease-out"
                onClick={handleKhaltiButtonClick}
              >
                Pay with Khalti
              </button>
              
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Cart;

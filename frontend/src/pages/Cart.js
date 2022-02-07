import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import StripeCheckout from "react-stripe-checkout";
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const KEY = "pk_test_51KQ0ASC3LWJt31ivbFCE967KPZy7XaRXmXIDFrjevK0QiscEwYexNV1FakZAC25DbPuxTl2tV0Q7esfUPDDUKaTD00LsfGnSSN"


function Cart() {
  const navigate = useNavigate()
  const [stripeToken, setStripeToken] = useState(null);
  const cart = useSelector((state) => state.cart);
  const onToken = (token) => {
    setStripeToken(token)
  }
  useEffect(() => {
    const makeRequest = async () => {
       try {
          const res =  await axios.post('http://localhost:8001/api/checkout/payment',
          {
              tokenId: stripeToken.id,
              amount: cart.total * 100,
          })
          console.log(res.data)
         navigate('/success')
       } catch (err) {
           console.log(err)
       }
    }

    stripeToken && makeRequest()

   }, [stripeToken]);

  return (
    <div>
      <Navbar />
      <Announcement />

      <div className="w-full my-10">
        <h1 className="text-center text-4xl font-light  text-red-600 border-b font-mono">
          YOUR CART
        </h1>
        <div className="flex flex-col md:flex-row mt-10 items-center space-y-4 md:justify-between mx-4">
          <div className=" w-full md:w-1/2 pr-2">
            <div className="my-10 flex w-full  justify-between space-x-4 text-sm md:text-base items-start">
              <Link to="/">
                <button className="ml-4 mr-3 h-12 md:h-10 border-1 px-1  hover:text-red-800 hover:border-red-800 border-black bg-white">
                  {cart.products.length === 0
                    ? "SHOP NOW"
                    : "CONTINUE SHOPPING"}
                </button>
              </Link>
              <div className="flex justify-between items-center space-x-4">
                <p className="underline">Shopping Cart({cart.quantity})</p>
                <p className="underline">Your Wishlist(0)</p>
              </div>
            </div>
            <hr />

            {cart.products.length === 0 ? (
              <p className="text-center mt-4 font-bold text-2xl text-red-600 uppercase">
                No Items in your cart
              </p>
            ) : (
              cart.products.map((c) => (
                <div
                  key={c._id}
                  className="mt-6 w-full flex justify-around items-center space-x-4 ml-4"
                >
                  <img
                    className="h-60 object-cover select-none w-60"
                    src={c.img}
                    alt=""
                  />
                  <div className="flex   justify-between items-center flex-grow">
                    <div className="flex flex-col justify-center space-y-3">
                      <h5 className="text-sm">
                        <b>Product:</b> {c.title}
                      </h5>
                      <h5 className="text-sm">
                        <b>ID:</b> {c._id}
                      </h5>
                      {c.color === "" ? (
                        ""
                      ) : (
                        <h5 className="text-sm flex items-center space-x-2">
                          <b className="">COLOR:</b>{" "}
                          <p className="first-letter:uppercase">{c.color}</p>
                        </h5>
                      )}
                      <h5 className="flex items-center space-x-2 text-sm">
                        <b>SIZE:</b> <p className="uppercase">{c.size}</p>
                      </h5>
                    </div>
                    <div className="flex flex-col space-y-6 mr-2">
                      <input
                        type="number"
                        defaultValue={c.quantity}
                        className="outline-none border-1 border-gray-400 w-20 h-10 p-2 rounded-lg"
                      />
                      <p className="text-2xl text-yellow-700">
                        ${c.price * c.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className=" flex space-y-4 flex-col h-96 w-96 border rounded-lg bg-gray-200 border-gray-400 p-4">
            <h1 className="mt-2 mb-4 text-center text-2xl font-light underline decoration-teal-700 pb-1">
              ORDER SUMMARY
            </h1>
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p className="text-left">${cart.total}</p>
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
              <p className="text-2xl text-left font-semibold text-yellow-600">
                ${cart.total}
              </p>
            </div>

            <StripeCheckout
              name="Dokan"
              image="https://cdn.pixabay.com/photo/2016/12/20/05/24/store-1919712__480.png"
              billingAddress
              shippingAddress
              description={`Your total is ${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <button className="bg-black text-white w-1/2 p-2 mt-4 hover:scale-105 transform transition duration-300 ease-out">
                CHECKOUT NOW
              </button>
            </StripeCheckout>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;

import React,{useState, useEffect} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'
import { useNavigate } from "react-router-dom"


const KEY = "pk_test_51KQ0ASC3LWJt31ivbFCE967KPZy7XaRXmXIDFrjevK0QiscEwYexNV1FakZAC25DbPuxTl2tV0Q7esfUPDDUKaTD00LsfGnSSN"

function Pay() {
  const navigate = useNavigate()
    const [stripeToken, setStripeToken] = useState(null);
    const onToken = (token) => {
      setStripeToken(token)
    }

    useEffect(() => {
     const makeRequest = async () => {
        try {
           const res =  await axios.post('http://localhost:8001/api/checkout/payment',
           {
               tokenId: stripeToken.id,
               amount: 2000,
           })
           console.log(res.data)
          navigate('/success')
        } catch (err) {
            console.log(err)
        }
     }

     stripeToken && makeRequest()

    }, [stripeToken]);
    
  return <div className='bg-gray-200 w-full h-screen flex justify-center items-center'>
    {stripeToken?<p className='font-mono text-gray-700 text-center'>Processing. please Wait....</p>:(
      <StripeCheckout name="dokan"
      image="https://cdn.pixabay.com/photo/2016/12/20/05/24/store-1919712__480.png"
       billingAddress
       shippingAddress
       description='Your total is $20'
       amount={2000}
       token={onToken}
       stripeKey={KEY}
       >
       <button className='h-14 shadow-lg border bg-gray-800 font-bold text-gray-100 w-32 hover:bg-gray-900 rounded-lg active:scale-90 trnsform transition duration-300 ease-out'>Pay Now</button>
     </StripeCheckout>
    )}
      
  </div>;
}

export default Pay;

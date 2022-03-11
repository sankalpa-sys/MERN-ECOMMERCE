
import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { addProduct } from "../redux/cartRedux";
import { publicRequest } from "../requestMethods";
import { useDispatch, useSelector } from "react-redux";
import {CheckIcon} from '@heroicons/react/outline'
import colors from "../colors";
import {shuffle} from 'lodash'
import Alert from "../components/Alert";
import { XIcon } from "@heroicons/react/solid";



// Single Product Page

function Product({alert,showAlert}) {
  const [shuffledColors, setshuffledColors] = useState([])
  const user = useSelector(state=>state.user.currentUser)
  
  const location = useLocation()
  const id = location.pathname.split('/')[2]

  const [product, setproduct] = useState([])
  const [quantity, setquantity] = useState(1)
  const [color, setcolor] = useState("");
  const [size, setsize] = useState("m")
  const [inStock, setinStock] = useState(false)

  const dispatch = useDispatch()


  useEffect(() => {
    setshuffledColors(shuffle(colors))
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior : "smooth"
      })
    }
    const getProduct = async() => {
      try {
        const res = await publicRequest.get('products/find/' + id)
        setproduct(res.data)
        setinStock(res.data.inStock)
        setcolor(res.data.color)
        
        

      } catch (err) {
        console.log(err)
      }
    }
    scrollToTop()
    getProduct()
    
  }, [id])


  const handleChange = (e) => {
    setquantity(e.target.value)
  }

  const handleClick = ()=> {
   
    try {
      if(user === null){
        window.scrollTo({
          top: 0,
          behavior : "smooth"
        })
        showAlert("You have to Login first", "danger", "Failed")
        return;
      }else{
        dispatch(
          addProduct({...product, quantity, color, size})
          
        )
        setquantity(1)
        window.scrollTo({
          top: 0,
          behavior : "smooth"
        })
        showAlert("Item Added to Cart", "success", "success")
      }
    } catch (error) {
      console.log(error)
    }
  
}




  return (
    <div className="overflow-hidden">
      <Navbar />
      <Announcement/>
      <Alert alert={alert}/>
      <div className="my-4 mx-4 w-full flex flex-col md:flex-row  justify-between mr-10 items-center bg-gray-100">
        <div className="md:h-[90vh] h-[50vh] md:w-1/3 w-2/3">
          <img
            src={product.img}
            className="w-full  h-full object-contain md:object-cover "
            alt=""
          />
        </div>

        <div className="flex flex-col ml-10 justify-center items-start h-screen w-1/2 mr-20">
          <h1 className="text-4xl font-mono my-4 font-bold">{product.title}</h1>

          <p className="text-left text-sm my-4">
            {product.desc}
          </p>

          <h2 className="text-2xl text-yellow-500 my-4">$ {product.price}</h2>

          <div className="flex flex-row justify-center items-center space-x-4 my-4">
            <label className=" font-semibold" htmlFor="color">
              Color: {" "}
            </label>

            
            <div className="flex items-center space-x-2">
                    {shuffledColors.slice(0,5).map((c)=>(
                     <p key={c.id} onClick={()=>setcolor(c.title)} className={`h-6 w-6 ${c.bg} cursor-pointer rounded-full`}>{color!=="white"?<CheckIcon className={c.title === color? "inline-flex text-white":"hidden"}/>:<CheckIcon className={c.title === color? "inline-flex text-black":"hidden"}/>} </p>
                     

                    ))}
                    </div>
           
           
            

            <label className=" font-semibold" htmlFor="size">
              Size: {" "}
            </label>
            <select onChange={(e)=>setsize(e.target.value)}
              name="size"
              id="size"
              className="h-10 w-16 outline-none border uppercase border-gray-900"
            >
              <option value={"m"}>M</option>
              <option value={"s"}>S</option>
              <option value={"xs"}>XS</option>
              <option value={"l"}>L</option>
              <option value={"xl"}>XL</option>
             
            </select>
          </div>

          <div className="flex  items-center space-x-24 w-full ml-2 my-6">
            <div className="flex items-center space-x-3">
              <label className="font-semibold" htmlFor="number">Quantity: </label>
              <div className="flex justify-between items-center space-x-3">
              <p className="text-xl select-none bg-gray-700 cursor-pointer text-white font-bold ring-1 ring-gray-700 py-1 px-3 rounded-full" onClick={()=>quantity===0?setquantity(0):setquantity(quantity-1)}>-</p>
                <input
                type="text"
                name="quantity"
                id="quantity"
                onChange={handleChange}
                value={parseInt(quantity)}
                className="border select-none border-gray-400  py-1 text-center w-20 outline-none rounded-full"
              />
              <p className="text-xl select-none bg-gray-700 cursor-pointer text-white font-bold ring-1 ring-gray-700 py-1 px-3 rounded-full" onClick={()=>setquantity(quantity+1)}>+</p>
              </div>
            </div>
           
          </div>
          {inStock===true?(<div className="flex my-6 flex-col space-y-2 justify-center items-start">
          <div className="flex text-green-600 justify-start items-center">
              <CheckIcon className="h-8 w-8"/>
              <h1 className="font-bold ">In Stock.</h1>
            </div>
            <p className="text-gray-600 text-sm  font-Lora">We don't know how much longer will this be on the stock. </p>
          </div>):(<div className="flex my-6 flex-col space-y-2 justify-center items-start">
            <div className="flex text-red-600 justify-start items-center">
              <XIcon className="h-8 w-8"/>
              <h1 className="font-bold ">Temporarily out of stock.</h1>
            </div>
            <p className="text-gray-600 text-sm  font-Lora">We don't know when or if this item will be back in stock. </p>
          </div>)}
         {inStock && (
            <button onClick={handleClick} className="bg-green-600 p-2 text-gray-200 rounded-lg shadow-xl shadow-green-600/50 hover:bg-blue-600 cursor-pointer hover:shadow-blue-600/50 active:scale-90 duration-150 transform transition ease-in">
            ADD TO CART
          </button>
         )}
        </div>
      </div>
      <Newsletter alert={alert} showAlert={showAlert} />
      <Footer />
    </div>
  );
}

export default Product;

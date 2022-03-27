import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { addProduct } from "../redux/cartRedux";
import { publicRequest, userRequest } from "../requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { CheckIcon } from "@heroicons/react/outline";
import Alert from "../components/Alert";
import { XIcon } from "@heroicons/react/solid";
import Reviews from "../components/Reviews";

// Single Product Page

function Product({ alert, showAlert }) {


  const user = useSelector((state) => state.user.currentUser);
  

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [product, setproduct] = useState([]);
  const [quantity, setquantity] = useState(1);
  const [color, setcolor] = useState("");
  const [size, setsize] = useState("m");
  const [inStock, setinStock] = useState(false);
  const [reviews, setreviews] = useState([]);
  const [reviewInputValue, setreviewInputValue] = useState("");
  const [runUseEffect, setrunUseEffect] = useState(1);
  const [categories, setcategories] = useState([])

  const [img, setimg] = useState("")
  const [colorArr, setcolorArr] = useState([])
  const [imgArr, setimgArr] = useState([])


  const dispatch = useDispatch();


  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      if(user!==null){
        await userRequest.post("/reviews", {
          postedBy: user._id,
          productId: id,
          review: reviewInputValue,
        });
        setrunUseEffect(runUseEffect + 1);
        setreviewInputValue("");
      }else{
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        showAlert("You have to Login first", "danger", "Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getReviews = async () => {
      const reviews = await publicRequest.get(`/reviews/${id}`);
      setreviews(reviews.data);
    };

    getReviews();
  }, [runUseEffect]);

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("products/find/" + id);
        setproduct(res.data);
        setinStock(res.data.inStock);
        setcolor(res.data.color);
        setimg(res.data.img)
        setcolorArr(res.data.colorArr)
        setimgArr(res.data.imgArr)
        setcategories(res.data.categories)
      } catch (err) {
        console.log(err);
      }
    };
    scrollToTop();
    getProduct();
  }, [id]);
  const imgColorArr = colorArr.map((color, index)=>{
    return{
        color: color,
        image: imgArr[index]
    }
})



useEffect(() => {

  imgColorArr.map((d)=>{
      if(d.color === color){
          setimg(d.image)
      }
  })
}, [color])


useEffect(() => {
imgColorArr.map((m)=>{
   if(product.img === m.image){
       setcolor(m.color)
   }
})
}, [])

  const handleChange = (e) => {
    setquantity(e.target.value);
  };

  const handleClick = () => {
    try {
      if (user === null) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        showAlert("You have to Login first", "danger", "Failed");
        return;
      } else {
        dispatch(addProduct({ ...product, quantity, color, size,img }));
        setquantity(1);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        showAlert("Item Added to Cart", "success", "success");
      }
    } catch (error) {
      console.log(error);
    }
  };


  

  return (
    <div className="overflow-hidden">
      <Navbar />
      <Announcement />
      <Alert alert={alert} />
      <div className="my-4 mx-4 w-full flex flex-col md:flex-row  justify-between mr-10 items-center bg-gray-200">
        <div className=" w-[500px] h-[800px]">
          <img
            src={img}
            className={categories.includes("shoes")? "w-full h-full object-contain":"w-full h-full object-cover object-top"}
            alt=""
          />
        </div>
        {/* w-full h-full object-cover object-top */}

        <div className="flex flex-col ml-10 justify-center items-start h-screen w-1/2 mr-20">
          <h1 className="text-4xl font-mono my-4 font-bold">{product.title}</h1>

          <p className="text-left text-sm my-4">{product.desc}</p>

          <h2 className="text-2xl text-yellow-500 my-4">$ {product.price}</h2>

          <div className="flex flex-col space-y-4  w-full md:max-w-fit md:flex-row justify-center items-center space-x-4 my-4">
            <label className=" font-semibold mt-3" htmlFor="color">
              Color:{" "}
            </label>

            <div className=" flex-grow md:flex-grow-0 flex items-center space-x-1">
            {colorArr.length!==0?colorArr.map((m)=>(
                        <p onMouseOver={()=>setcolor(m)}  key={m} style={{backgroundColor:m}} className={`h-6 rounded-full cursor-pointer  mx-4 w-6 `}> </p>
                    )):(<p style={{backgroundColor:color}} className="h-6 rounded-full cursor-default w-6 mx-4"></p>)}
            </div>

            <label className=" font-semibold" htmlFor="size">
              Size:{" "}
            </label>
            <select
              onChange={(e) => setsize(e.target.value)}
              name="size"
              id="size"
              className="h-10 w-full outline-none border uppercase border-gray-900"
            >
              <option value={"m"}>M</option>
              <option value={"s"}>S</option>
              <option value={"xs"}>XS</option>
              <option value={"l"}>L</option>
              <option value={"xl"}>XL</option>
            </select>
          </div>
          

          <div className="flex  items-center space-x-24 w-full ml-2 my-6">
            <div className="flex md:flex-row flex-col space-y-3 items-center space-x-3">
              <label className="font-semibold" htmlFor="number">
                Quantity:{" "}
              </label>
              <div className="flex justify-between items-center space-x-3">
                <p
                  className="text-xl select-none bg-gray-700 cursor-pointer text-white font-bold ring-1 ring-gray-700 py-1 px-3 rounded-full"
                  onClick={() =>
                    quantity === 0 ? setquantity(0) : setquantity(quantity - 1)
                  }
                >
                  -
                </p>
                <input
                  type="text"
                  name="quantity"
                  id="quantity"
                  onChange={handleChange}
                  value={parseInt(quantity)}
                  className="border select-none border-gray-400  py-1 text-center w-20 outline-none rounded-full"
                />
                <p
                  className="text-xl select-none bg-gray-700 cursor-pointer text-white font-bold ring-1 ring-gray-700 py-1 px-3 rounded-full"
                  onClick={() => setquantity(quantity + 1)}
                >
                  +
                </p>
              </div>
            </div>
          </div>
          {inStock === true ? (
            <div className="flex my-6 flex-col space-y-2 justify-center items-start">
              <div className="flex text-green-600 justify-start items-center">
                <CheckIcon className="h-8 w-8" />
                <h1 className="font-bold ">In Stock.</h1>
              </div>
              <p className="text-gray-600 text-sm  font-Lora">
                We don't know how much longer will this be on the stock.{" "}
              </p>
            </div>
          ) : (
            <div className="flex my-4 flex-col space-y-2 justify-center items-start">
              <div className="flex text-red-600 justify-start items-center">
                <XIcon className="h-8 w-8" />
                <h1 className="font-bold ">Temporarily out of stock.</h1>
              </div>
              <p className="text-gray-600 text-sm  font-Lora">
                We don't know when or if this item will be back in stock.{" "}
              </p>
            </div>
          )}
          {inStock && (
            <button
              onClick={handleClick}
              className="bg-green-600 p-2 text-gray-200 rounded-lg shadow-xl shadow-green-600/50 hover:bg-blue-600 cursor-pointer hover:shadow-blue-600/50 active:scale-90 duration-150 transform transition ease-in"
            >
              ADD TO CART
            </button>
          )}
        </div>
      </div>
      <form className="w-[60%] ml-8 mb-4" onSubmit={handleReviewSubmit}>
        <div className="flex flex-col space-y-2">
          <label className="font-bold " htmlFor="comment">
            Want to review the product?
          </label>
          <textarea
            value={reviewInputValue}
            onChange={(e) => setreviewInputValue(e.target.value)}
            className="border-2 rounded-lg pl-2 outline-none"
            rows={4}
            type="text"
            placeholder="Your review here.."
            name="comment"
            id="comment"
          />
        </div>
        <button
          className="border bg-gradient-to-r from-cyan-500 hover:from-teal-500 to-blue-500 hover:to-green-500 text-white font-mono rounded-full p-2 mt-2"
          type="submit"
        >
          Submit
        </button>
      </form>
      <Reviews reviews={reviews} runUseEffect={runUseEffect} setrunUseEffect= {setrunUseEffect} />
      <Newsletter alert={alert} showAlert={showAlert} />
      <Footer />
    </div>
  );
}

export default Product;

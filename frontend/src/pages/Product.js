import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { addProduct } from "../redux/cartRedux";
import { publicRequest, userRequest } from "../requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { CheckIcon } from "@heroicons/react/outline";
import Alert from "../components/Alert";
import { XIcon, StarIcon } from "@heroicons/react/solid";
import Reviews from "../components/Reviews";
import StarRatings from "react-star-ratings";

// Single Product Page

function Product({ alert, showAlert }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  const mode = useSelector((state) => state.theme.theme);

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
  const [categories, setcategories] = useState([]);

  const [img, setimg] = useState("");
  const [colorArr, setcolorArr] = useState([]);
  const [imgArr, setimgArr] = useState([]);
  const [rating, setRating] = useState(0);
  const [userReview, setuserReview] = useState([]);

  const dispatch = useDispatch();

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user !== null) {
        await userRequest.post("/reviews", {
          postedBy: user._id,
          productId: id,
          review: reviewInputValue,
          starRating: rating,
        });
        setrunUseEffect(runUseEffect + 1);
        showAlert("Review added.", "success", "Success");
        setreviewInputValue("");
        setRating(0);
      } else {
        showAlert("You have to login first.", "danger", "Error");
        setreviewInputValue("");
      }
    } catch (error) {
      console.log(error);
      showAlert("You have already reviewed the product", "danger", "Error");
      setreviewInputValue("");
    }
  };

  useEffect(() => {
    const getReviews = async () => {
      const reviews = await publicRequest.get(`/reviews/${id}`);
      setreviews(reviews.data);
    };

    getReviews();
  }, [runUseEffect, id]);

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
        setimg(res.data.img);
        setcolorArr(res.data.colorArr);
        setimgArr(res.data.imgArr);
        setcategories(res.data.categories);
      } catch (err) {
        console.log(err);
      }
    };
    scrollToTop();
    getProduct();
  }, [id]);
  const imgColorArr = colorArr.map((color, index) => {
    return {
      color: color,
      image: imgArr[index],
    };
  });

  useEffect(() => {
    imgColorArr.map((d) => {
      if (d.color === color) {
        setimg(d.image);
      }
    });
  }, [color]);

  useEffect(() => {
    imgColorArr.map((m) => {
      if (product.img === m.image) {
        setcolor(m.color);
      }
    });
  }, [id]);

  const handleChange = (e) => {
    setquantity(e.target.value);
  };

  const handleClick = () => {
    try {
      if (user === null) {
        showAlert("You have to login first.", "danger", "Error");
        navigate('/login')
        return;
      } else {
        dispatch(
          addProduct({
            ...product,
            quantity,
            color,
            size,
            img,
            userId: user._id,
          })
        );
        setquantity(1);
        showAlert("Item Added to cart.", "success", "Success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeRating = (rate) => {
    setRating(rate);
  };

  const total = reviews.reduce((tot, item) => tot + item.starRating, 0);
  const averageRating = (total / reviews.length).toFixed(1);

  // get single review

  useEffect(() => {
    const getReview = async () => {
      const res = await userRequest.get(
        `/reviews/userreview/${id}/${user._id}`
      );
      setuserReview(res.data);
    };
    getReview();
  }, [runUseEffect]);

  return (
    <div
      className={
        mode === "light"
          ? "bg-gray-200 overflow-hidden"
          : "bg-gray-800 overflow-hidden"
      }
    >
      <Navbar />
      <Announcement />

      <div
        className={
          mode === "light"
            ? "my-4  h-auto mx-4 w-full flex space-y-20 flex-col md:flex-row  justify-between mr-10 items-center bg-gray-200"
            : "my-4 mx-4 w-full space-y-20  flex flex-col md:flex-row text-white  justify-between mr-10  items-center bg-gray-800"
        }
      >
        <div className=" w-[500px] h-[450px] md:h-[800px]">
          <img
            src={img}
            className={
              categories.includes("shoes")
                ? "w-full select-none h-full object-contain"
                : "w-full select-none h-full object-cover object-top"
            }
            alt=""
          />
        </div>
        {/* w-full h-full object-cover object-top */}

        <div className="flex flex-col   ml-10 justify-center md:items-start  items-center h-screen w-full px-2 md:px-0 md:w-1/2 mr-20">
          <h1 className="md:text-4xl text-2xl font-mono my-4 h-32 font-bold ">
            {product.title}
          </h1>
          <div className="flex  w-full  md:w-48 justify-evenly items-center select-none">
            <div
              className={
                total !== 0
                  ? "flex   w-12 items-center justify-start   text-xs font-bold"
                  : "flex  w-20 items-center justify-start   text-xs font-bold"
              }
            >
              {total !== 0 ? averageRating : "No ratings"}
              <StarIcon className="h-4  text-yellow-600 w-4" />
            </div>
            <span className="">|</span>
            <p className="text-xs  font-bold">
              {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
            </p>
          </div>

          <p className="text-left text-sm my-4">{product.desc}</p>

          <h2 className="text-2xl text-yellow-500 my-4">$ {product.price}</h2>

          <div className="flex flex-col md:space-y-4 space-y-8  w-full md:max-w-fit md:flex-row justify-center items-center space-x-4 my-4">
            <label className=" font-semibold mt-3" htmlFor="color">
              Color:{" "}
            </label>

            <div className=" flex-grow md:flex-grow-0 flex items-center space-x-1">
              {colorArr.length !== 0 ? (
                colorArr.map((m) => (
                  <p
                    onMouseOver={() => setcolor(m)}
                    key={m}
                    style={{ backgroundColor: m }}
                    className={`h-6 rounded-full cursor-pointer  mx-4 w-6 `}
                  >
                    {" "}
                  </p>
                ))
              ) : (
                <p
                  style={{ backgroundColor: color }}
                  className="h-6 rounded-full cursor-default w-6 mx-4"
                ></p>
              )}
            </div>

            <label className=" font-semibold" htmlFor="size">
              Size:{" "}
            </label>
            <select
              onChange={(e) => setsize(e.target.value)}
              name="size"
              id="size"
              className={
                mode === "light"
                  ? "h-10 md:w-full w-1/2 outline-none border uppercase border-gray-900"
                  : "h-10 md:w-full w-1/2 outline-none border uppercase text-white bg-gray-800 border-gray-100"
              }
            >
              <option value={"m"}>M</option>
              <option value={"s"}>S</option>
              <option value={"xs"}>XS</option>
              <option value={"l"}>L</option>
              <option value={"xl"}>XL</option>
            </select>
          </div>

          <div className="flex-grow md:flex-grow-0 flex items-center space-x-1 my-3">
            <div className="flex md:flex-row flex-col space-y-3 items-center justify-center space-x-3">
              <label className="font-semibold" htmlFor="number">
                Quantity:{" "}
              </label>
              <div className="flex  justify-between items-center space-x-3">
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
                  className={
                    mode === "light"
                      ? "border select-none border-gray-700  py-1 text-center w-20 outline-none rounded-full"
                      : "border select-none border-gray-400  py-1 text-center w-20 text-black outline-none rounded-full"
                  }
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
            <div className="flex md:my-6 my-3 w-[90%] text-center md:text-left flex-col space-y-2 justify-center items-start">
              <div className="flex text-green-600 justify-start items-center">
                <CheckIcon className="h-8 w-8" />
                <h1 className="font-bold ">In Stock.</h1>
              </div>
              <p className=" text-sm  font-Lora">
                We don't know how much longer will this be on the stock.{" "}
              </p>
            </div>
          ) : (
            <div className="flex my-4 flex-col w-[90%] text-center space-y-2 justify-center items-start">
              <div className="flex text-red-600 justify-start items-center">
                <XIcon className="h-8 w-8" />
                <h1 className="font-bold ">Temporarily out of stock.</h1>
              </div>
              <p className=" text-sm  font-Lora">
                We don't know when or if this item will be back in stock.{" "}
              </p>
            </div>
          )}
          {inStock && (
            <button
              onClick={handleClick}
              className="bg-green-600 p-2 mb-10 text-gray-200 rounded-lg shadow-xl shadow-green-600/50 hover:bg-blue-600 cursor-pointer hover:shadow-blue-600/50 active:scale-90 duration-150 transform transition ease-in"
            >
              ADD TO CART
            </button>
          )}
        </div>
      </div>

      {userReview.length === 0 ? (
        <form
          className={"w-[60%] ml-8 md:mt-20 mt-32 mb-4"}
          onSubmit={handleReviewSubmit}
        >
          <div className="flex flex-col space-y-2">
            <label
              className={
                mode === "light"
                  ? "font-bold text-black "
                  : "font-bold text-white "
              }
              htmlFor="comment"
            >
              Want to review the product?
            </label>
            <div className="my-3">
              <StarRatings
                rating={rating}
                starRatedColor="goldenrod"
                starHoverColor="goldenrod"
                changeRating={changeRating}
                numberOfStars={5}
                starDimension="30px"
                name="rating"
              />
            </div>
            <textarea
              value={reviewInputValue}
              onChange={(e) => setreviewInputValue(e.target.value)}
              className={
                rating !== 0
                  ? mode === "light"
                    ? "border-2 bg-slate-100 border-gray-300 mb-3 text-black text-sm rounded-lg p-2 outline-none"
                    : "border w-[400px] md:w-[700px] text-sm bg-gray-800 text-white mb-3  rounded-lg p-2 outline-none"
                  : "hidden"
              }
              rows={4}
              type="text"
              placeholder="Your review here.."
              name="comment"
              id="comment"
            />
          </div>
          <button
            disabled={reviewInputValue === ""}
            className={
              reviewInputValue === ""
                ? mode === "light"
                  ? "cursor-not-allowed border-2 h-10 hover:text-white hover:bg-black text-center border-black  select-none text-sm   text-gray-800 font-mono rounded-lg p-2 mt-2  transition-all"
                  : "cursor-not-allowed border-2 h-10 hover:text-gray-800 hover:bg-white text-center border-black  select-none text-sm   text-gray-200 font-mono rounded-lg p-2 mt-2  transition-all"
                : mode === "light"
                ? "border-2 border-black h-10  select-none text-sm hover:text-white hover:bg-black   text-gray-800 font-mono rounded-lg p-2 mt-2  transition-all"
                : "border-2 border-gray-200 h-10  select-none text-sm hover:text-black hover:bg-white   text-gray-200 font-mono rounded-lg p-2 mt-2  transition-all"
            }
            type="submit"
          >
            Submit
          </button>
        </form>
      ) : (
        reviews.length > 10 && (
          <Reviews
            heading={`Your Review`}
            reviews={userReview}
            runUseEffect={runUseEffect}
            setrunUseEffect={setrunUseEffect}
            showAlert={showAlert}
          />
        )
      )}

      <Reviews
        heading={`Customer Reviews (${reviews.length})`}
        reviews={reviews}
        runUseEffect={runUseEffect}
        setrunUseEffect={setrunUseEffect}
        showAlert={showAlert}
      />
      <Alert alert={alert} />
      <Newsletter alert={alert} showAlert={showAlert} />
      <Footer />
    </div>
  );
}

export default Product;

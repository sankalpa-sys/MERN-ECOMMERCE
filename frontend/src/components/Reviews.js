import React, { useState } from "react";
import moment from "moment";
import { userRequest } from "../requestMethods";
import { useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import { Offcanvas } from "react-bootstrap";

function Reviews({
  reviews,
  setrunUseEffect,
  runUseEffect,
  showAlert,
  heading,
}) {
  const user = useSelector((state) => state.user.currentUser);
  const mode = useSelector((state) => state.theme.theme);
  const handleDeleteReview = async (id) => {
    try {
      await userRequest.delete(`/reviews/${id}`);
      setrunUseEffect(runUseEffect + 1);
      showAlert("Review removed.", "success", "Success");
    } catch (error) {
      showAlert("You cannot perform this action", "danger", "Error");
      console.log(error);
    }
  };

  const [sliceNumber, setsliceNumber] = useState(5);
  const [show, setShow] = useState(false);

  const [editId, seteditId] = useState("");
  const [starRating, setstarRating] = useState(0);
  const [review, setreview] = useState("");

  const handleMoreReviews = () => {
    setsliceNumber(sliceNumber + 5);
  };
  const handleClose = () => setShow(false);

  const handleLessReviews = () => {
    setsliceNumber(5);
  };
  const handleEditReview = (id, rate, review) => {
    setShow(true);
    setstarRating(rate);
    setreview(review);
    seteditId(id);
  };

  const changeRating = (rate) => {
    setstarRating(rate);
  };

  const handleEditReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await userRequest.put(`/reviews/${editId}`, {
        review: review,
        starRating: starRating,
      });
      setrunUseEffect(runUseEffect + 1);
      showAlert("Review updated.", "success", "Success");
      handleClose();
    } catch (error) {
      showAlert("You cannot perform this action", "danger", "Error");
      console.log(error);
    }
  };

  return (
    <>
      <div
        id="#componentToScrollTo"
        className={
          mode === "light"
            ? "flex flex-col  justify-center  md:my-6 items-center font-Lora"
            : "flex flex-col text-white bg-gray-800  justify-center items-center font-Lora"
        }
      >
        <h1 className="m-4  font-bold text-2xl text-yellow-600 border-b-2 mt-10  md:my-6 border-yellow-600 ">
          {heading}
        </h1>
        {reviews.slice(0, sliceNumber).map((r) => (
          <div
            key={r._id}
            className="flex md:flex-row pr-3 flex-col space-x-3  pb-2  justify-between items-start mt-8 mb-4   h-auto w-screen   px-4"
          >
            <div className="flex items-center w-48 ml-4 md:mt-0 mt-2 md:mb-0 mb-2  h-full  space-x-2">
              <img
                className="h-10 select-none  w-10 rounded-full object-cover object-top"
                src={
                  r.postedBy.img
                    ? r.postedBy.img
                    : "https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg"
                }
                alt=""
              />

              <h1 className="font-bold text-sm   select-none">
                {r.postedBy.username}
              </h1>
            </div>
            <p className=" w-[90%]   md:w-[60%]  h-auto mx-4 mt-2 text-xs   md:text-sm text-justify">
              {r.review}
            </p>

            <div className="flex flex-col w-72 pr-2 mt-2   items-center justify-between  ">
              <div className="flex items-center w-[80%]   md:w-full space-x-3 justify-around  md:justify-evenly">
                <span className="mb-3 ">
                  <StarRatings
                    rating={r.starRating}
                    starRatedColor="goldenrod"
                    readonly={true}
                    starDimension="20px"
                    starSpacing="2px"
                  />
                </span>
                <p className=" select-none mb-3 font-bold text-xs">
                  {moment(r.createdAt).format("LL")}
                </p>
              </div>

              <div className="flex items-center justify-evenly w-1/2">
                {user && (
                  <p
                    onClick={() => handleDeleteReview(r._id)}
                    className={
                      user.isAdmin === true || user._id === r.postedBy._id
                        ? "text-red-600  mb-3 font-bold text-xs underline cursor-pointer hover:text-red-700 active:scale-90 duration-300 transform transition ease-out "
                        : "hidden"
                    }
                  >
                    Delete
                  </p>
                )}

                {user && (
                  <p
                    onClick={() =>
                      handleEditReview(r._id, r.starRating, r.review)
                    }
                    className={
                      user.isAdmin === true || user._id === r.postedBy._id
                        ? "text-green-600  mb-3 font-bold text-xs underline cursor-pointer hover:text-green-700 active:scale-90 duration-300 transform transition ease-out "
                        : "hidden"
                    }
                  >
                    Edit
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Offcanvas
        className="bg-gradient-to-r from-black to-gray-800 font-Lora w-[750px] "
        show={show}
        onHide={handleClose}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="text-yellow-600 font-bold border-yellow-600 border-b-2">
            Edit Your Review
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <form onSubmit={handleEditReviewSubmit}>
            <h1 className="my-2 ml-2 font-bold text-white">Rate:</h1>
            <StarRatings
              rating={starRating}
              starRatedColor="goldenrod"
              starHoverColor="goldenrod"
              starEmptyColor="gray"
              changeRating={changeRating}
              numberOfStars={5}
              starDimension="30px"
              name="rating"
            />

            <textarea
              value={review}
              onChange={(e) => setreview(e.target.value)}
              name=""
              id=""
              cols="30"
              rows="10"
              className="border-2 w-full my-4 bg-gray-200 text-sm p-2 rounded-lg pl-2 outline-none"
              placeholder="Your updated review here.."
            ></textarea>

            <button
              type="submit"
              disabled={review === ""}
              className="bg-black border text-white hover:scale-105 transition duration-300 p-2 rounded-lg text-sm "
            >
              Edit
            </button>
          </form>
        </Offcanvas.Body>
      </Offcanvas>
      {sliceNumber > 5 && sliceNumber >= reviews.length ? (
        <p
          onClick={handleLessReviews}
          className={`text-blue-500 underline cursor-pointer text-sm font-Lora my-3 mx-3 select-none hover:text-blue-600`}
        >
          see less reviews
        </p>
      ) : (
        <p
          onClick={handleMoreReviews}
          className={
            reviews.length > 5
              ? `text-blue-500 hover:text-blue-600 underline cursor-pointer text-sm font-Lora my-3 mx-3 select-none`
              : "hidden"
          }
        >
          see more reviews
        </p>
      )}
    </>
  );
}

export default Reviews;

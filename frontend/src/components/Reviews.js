import React from "react";
import moment from "moment";
import { userRequest } from "../requestMethods";
import { useSelector } from "react-redux";

function Reviews({ reviews, setrunUseEffect, runUseEffect }) {
  const user = useSelector((state)=>state.user.currentUser)
const handleDeleteReview = async(id) => {
  try {
    await userRequest.delete(`/reviews/${id}`)
    setrunUseEffect(runUseEffect + 1)
  } catch (error) {
    alert("You cannot perform this action")
    console.log(error);
  }
}


  
  return (
    <>
    <div className="flex flex-col border-b justify-center items-center font-Lora">
      <h1 className="m-4  font-bold text-2xl text-yellow-600 border-b-2 border-yellow-600 ">
        REVIEWS&nbsp;({reviews.length})
      </h1>
      {reviews.map((r) => (
        <div
          key={r._id}
          className="flex space-x-3 border-b  justify-between items-center mt-8 mb-4   h-auto w-3/4   px-4"
        >
          <div className="flex items-center  h-full space-x-2">
            
            <img
              className="h-12 select-none  w-12 rounded-full object-cover object-top"
              src={r.postedBy.img?r.postedBy.img:"https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg"}
              alt=""
            />

            <h1 className="font-bold text-sm text-gray-900 select-none">{r.postedBy.username}</h1>
          </div>
          <p className="text-gray-600  w-[60%] h-auto mx-4  text-sm text-center">{r.review}</p>

          <div className="flex flex-grow items-center justify-between">
          <p className=" text-gray-500 select-none mb-3 font-bold text-sm">
            {moment(r.createdAt).format("LL")}
          </p>
        
            {user.isAdmin === true || user._id === r.postedBy._id? (<p onClick={()=>handleDeleteReview(r._id)} className="text-red-600 rounded-full font-bold text-xs underline cursor-pointer hover:text-red-700 active:scale-90 duration-300 transform transition ease-out h-8">Delete</p>):""}
         
          </div>
  
        </div>
      ))}
      
    </div>
    
    </>
  );
}

export default Reviews;

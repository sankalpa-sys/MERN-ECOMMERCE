import React from "react";
import moment from "moment";

function Reviews({ reviews }) {
  
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
              className="h-12  w-12 rounded-full object-cover object-top"
              src={r.postedBy.img?r.postedBy.img:""}
              alt=""
            />

            <h1 className="font-bold text-sm text-gray-900">{r.postedBy.username}</h1>
          </div>
          <p className="text-gray-600  w-[60%] h-auto mx-4  text-sm text-center">{r.review}</p>

          <p className="w-[10%] text-gray-500 mb-3 font-bold text-sm">
            {moment(r.createdAt).format("LL")}
          </p>
  
        </div>
      ))}
      
    </div>
    
    </>
  );
}

export default Reviews;

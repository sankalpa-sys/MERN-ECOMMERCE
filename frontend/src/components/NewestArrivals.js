import React, { useState, useEffect } from "react";
import { publicRequest } from "../requestMethods";
import NewProductItem from "./NewProductItem";
import { Spinner } from "react-bootstrap";

function NewestArrivals() {
  const [newProducts, setNewProducts] = useState([]);
  useEffect(() => {
    const getnewProducts = async () => {
      const res = await publicRequest.get("/products?new=true");
      setNewProducts(res.data);
    };
    getnewProducts();
  }, []);

  return (
    <div className=" mt-4">
      {newProducts.length !== 0 ? (
        <>
          <h1 className="font-bold text-2xl font-Lora ml-2 mb-2 text-yellow-600">
            NEWEST ARRIVALS:
          </h1>
          <div className="flex space-x-6 overflow-scroll scrollbar-hide items-center">
            {newProducts.map((product) => (
              <NewProductItem key={product._id} img={product.img} id={product._id} />
            ))}
          </div>
        </>
      ) : (
       <div className="flex justify-center items-center">
           <h1 className="font-bold text-2xl font-Lora text-red-600 animate-bounce">No Products</h1>
        </div>
      )}
    </div>
  );
}

export default NewestArrivals;

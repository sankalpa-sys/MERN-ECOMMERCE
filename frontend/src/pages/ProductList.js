import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Product from "../components/Product";

// Filtering Page

function ProductList() {
  const location = useLocation()
  const cat = location.pathname.split('/')[2]
  const [filters, setfilters] = useState({})
  const [sort, setsort] = useState("newest")

  const handleFilters = (e) => {
    const value = e.target.value
    setfilters({
      ...filters,
     [ e.target.name ]: value
    })
  }

  return (
    <div>
      <Navbar />
      <Announcement />

      <h1 className="text-4xl font-bold  mt-3 mb-6 ml-4 first-letter:uppercase font-mono text-yellow-500">{cat}</h1>

      <div className="flex justify-between items-center mx-3 ">
        <div className="flex items-center  flex-grow space-x-3">
          <label className="text-xl font-semibold" htmlFor="">Filter Products: </label>
          <select name="color" id="" className="w-1/3 h-10 outline-none border border-gray-900" name="color" onChange={handleFilters}>
            <option value="white">White</option>
            <option value="black">Black</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
          </select>

          <select name="size" id="" className="w-1/3 h-10 outline-none border border-gray-900" name="size" onChange={handleFilters}>
            <option value="xs">XS</option>
            <option value="s">S</option>
            <option value="m">M</option>
            <option value="l">L</option>
            <option value="xl">XL</option>
          </select>
        </div>
        <div className="flex items-center flex-grow justify-end space-x-3">
          <label className="text-xl font-semibold" htmlFor="">Sort Products: </label>
          <select name="sort" id="sort" className="w-1/3 h-10 outline-none border border-gray-900" onChange={(e)=> setsort(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="asc">Price (asc)</option>
            <option value="desc">Price (desc)</option>
          </select>
        </div>
      </div>
      <Product cat={cat} filters={filters} sort={sort}/>
      <br />
      <Newsletter/>
      <Footer/>
    </div>
  );
}

export default ProductList;

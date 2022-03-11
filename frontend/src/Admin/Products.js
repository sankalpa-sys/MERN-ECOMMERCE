import React, { useEffect, useState } from "react";
import { publicRequest, userRequest } from "../requestMethods";
import {Link} from 'react-router-dom'

function Products() {
  const [products, setproducts] = useState([]);
  const [query, setQuery] = useState("")
  const [categories, setCategories] = useState("")
  const [priceSort, setpriceSort] = useState("")
  useEffect(() => {
    const fetchProducts = async () => {
      try {
          let res;
          if(categories === "" && query===""){
              res = await publicRequest.get('/products')
          }else if(categories === "" && query !==""){
                res = await publicRequest.get('/products?new=true')
          }else if(categories !=="" && query === ""){
              res = await publicRequest.get(`/products?category=${categories}`)
          }else if (categories !=="" && query !== ""){
              res = await publicRequest.get(`/products?new=true&category=${categories}`)
          }


        setproducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [query, categories]);


useEffect(() => {
  let filteredProducts;
  if(priceSort==="desc"){
    filteredProducts = products.sort((a,b)=>{
      return a.price - b.price
    })
  }else if(priceSort==="asc"){
    filteredProducts = products.sort((a,b)=>{
      return b.price - a.price
    })
  }

  if(priceSort!==""){
    setproducts(filteredProducts)
  }
  
}, [priceSort,query, categories])


  
  const handleTimeChange = (e) => {
     setQuery(e.target.value)
  }

  const handlecategoriesChange = (e) => {
    setCategories(e.target.value)
  }

  const handlePriceSortChange = (e) => {
      setpriceSort(e.target.value)
  }

  const handleDelete = async(id) => {
  try {
    await userRequest.delete(`/products/${id}`)
    window.location.replace("/admin")
  } catch (error) {
    console.log(error);
  }
   
  }

  const handleEditClick = (id) => {
    window.location.replace(`/edit/${id}`)
  }

  return (
    <div className="p-2 font-Lora font-semibold">
      <h1 className="font-bold flex justify-between pr-8 pl-2 items-center  text-cyan-500  text-2xl mb-8">
        All Products({products.length})
        <Link to='/add'><button className="h-12  hover:bg-yellow-400 rounded-lg font-bold bg-yellow-300 text-black text-base p-2 w-32">Add Product</button></Link>
      </h1>

      <div className="my-6 flex justify-start items-center space-x-4">
        <label htmlFor="product">Sort:</label>

        <select className="h-8 border-2 ml-3 w-32 rounded-lg outline-none text-center border-gray-300 bg-gray-300 text-black" name="product" id="product" onChange={handleTimeChange}>
          <option value="">All</option>
          <option value="latest">Latest</option>
        </select>

        <label htmlFor="categories">Categories:</label>

        <select onChange={handlecategoriesChange} name="categories" className="h-8 border-2 w-32 outline-none rounded-lg ml-3 text-center border-gray-300 bg-gray-300 text-black" id="categories">
            <option value="">All</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="shoes">Shoes</option>
            <option value="ocassion">Ocassional</option>
        </select>


        <label  htmlFor="price">Sort with Price: </label>
        <select onChange={handlePriceSortChange}  className="h-8 border-2 w-32 outline-none ml-3 text-center rounded-lg border-gray-300 bg-gray-300 text-black" name="price" id="price">
            <option value="">All</option>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
        </select>
        
      </div>

      <table className=" w-full">
        <tr className="text-yellow-600 mb-4">
          <th>Img</th>
          <th>Title</th>
          <th>Categories</th>
          <th>Availability</th>
          <th>Color</th>
          <th>Price</th>
        </tr>

        {products.map((product) => (
          <>
            <tr key={product._id} className="my-4">
              <td>
                <img src={product.img} alt="" className="h-24 w-24" />
              </td>
              <td className="first-letter:uppercase text-left  w-96">{product.title}</td>
              <td>{product.categories.toString()}</td>
              <td>{product.inStock?<h1 className="text-green-600 font-bold">Available</h1>:<h1 className="text-red-600 font-bold">Not Available</h1>}</td>
              <td className="first-letter:uppercase">{product.color}</td>
              <td>${product.price}</td>
              <td>
                <button onClick={()=>handleEditClick(product._id)} className="bg-green-600 w-16 select-none hover:bg-green-700 rounded-lg h-8 text-gray-100">
                  Edit
                </button>
              </td>
              <td>
                <button  onClick={()=>handleDelete(product._id)} className="bg-red-600 w-16 select-none hover:bg-red-700 rounded-lg h-8 text-gray-100">
                  Delete
                </button>
              </td>
            </tr>
          </>
        ))}
      </table>
    </div>
  );
}

export default Products;

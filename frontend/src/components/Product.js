import React,{useState, useEffect} from 'react'
import {shuffle} from 'lodash'

import ProductItem from './ProductItem'
import axios from 'axios'

function Product({cat, filters, sort}) {
    
const [products, setproducts] = useState([])
const [filteredProducts, setfilterproducts] = useState([])

useEffect(() => {
    const getProducts = async() => {
        try{
            const res = await axios.get(cat? `http://localhost:8001/api/products?category=${cat}`:`http://localhost:8001/api/products`)
            setproducts(res.data)
            console.log(res.data.color)
        }catch(err){
            console.log(err)
        }
    }
    getProducts()

}, [])



useEffect(() => {
   cat && setfilterproducts(
       products.filter(item=> Object.entries(filters).every(([key, value])=>
       item[key].includes(value))
       )
   )

}, [products, cat, filters])

useEffect(() => {
    if(sort==="newest"){
        setfilterproducts(prev=>
            [...prev].sort((a,b)=>a.createdAt-b.createdAt))
    }else if(sort==="asc"){
        setfilterproducts(prev=>
            [...prev].sort((a,b)=>a.price-b.price))
    }else{
        setfilterproducts(prev=>
            [...prev].sort((a,b)=>b.price-a.price))
    }
}, [sort])
    return (
        <div className='flex flex-wrap items-center justify-center mt-6 space-x-4 space-y-4'>
            { cat
            ?
            (filteredProducts.length ===0? (<h1 className='font-bold text-2xl font-mono my-20 text-red-600 animate-bounce drop-shadow-lg shadow-red-600'>NO PRODUCTS AVAILABLE</h1>):filteredProducts.map((product)=> (
                <ProductItem key={product.id} img={product.img} id={product._id}/>
            ))):
            (shuffle(products).slice(0,9).map((product)=> (
                <ProductItem key={product.id} img={product.img} id={product._id}/>
            )))
            }
        </div>
    )
}

export default Product

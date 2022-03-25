import { HeartIcon, SearchIcon, ShoppingCartIcon } from '@heroicons/react/outline'
import React,{useState} from 'react'
import {Link} from 'react-router-dom'

function ProductItem({img, id,price}) {

    const [bg, setbg] = useState("none")
    const [display, setdisplay] = useState("hidden")
    const handleHover = () => {
        setbg("black")
        setdisplay("flex")
    }
    const handleLeave = () => {
        setbg("none")
        setdisplay("hidden")
    }
    
    return (
        <div className='relative border-2 rounded-lg border-gray-300  top-0 left-0 flex justify-center items-center hover:bg-gray-300 transfor transition ease-out cursor-pointer' onMouseEnter={handleHover} onMouseLeave={handleLeave}>
            <img src={img} alt=""  className='h-[400px] m-1 w-[300px] hover:opacity-30 select-none'/>

            <div className={`absolute ${display} items-center justify-between space-x-4 text-gray-100`}>
                <ShoppingCartIcon className={`h-12 w-12 rounded-full bg-${bg} p-2 cursor-pointer hover:scale-105 duration-150 transform transition ease-out active:scale-90 duration-105 active:ease-out ` } />
              <Link to={`/product/${id}`}>
                <SearchIcon className={`h-12 hover:text-white w-12 rounded-full bg-${bg} p-2 cursor-pointer hover:scale-105 duration-150 transform transition ease-out active:scale-90 duration-105 active:ease-out ` }/>
              </Link>
                <HeartIcon className={`h-12 w-12 rounded-full bg-${bg} p-2 cursor-pointer hover:scale-105 duration-150 transform transition ease-out active:scale-90 duration-105 active:ease-out ` } />
            </div>
            <div className='absolute cursor-default select-none top-0 flex justify-center items-center right-0 m-2 rounded-full bg-red-600 h-8 w-16'>
                <p className='text-white tex-sm font-Lora'>${price}</p>
            </div>
        </div>
    )
}

export default ProductItem

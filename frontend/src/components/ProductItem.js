import { HeartIcon, SearchIcon, ShoppingCartIcon } from '@heroicons/react/outline'
import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import {  useSelector } from "react-redux";

function ProductItem({img, id,price, title, desc}) {
    const mode  = useSelector(state => state.theme.theme)

    const [bg, setbg] = useState("none")
    const [display, setdisplay] = useState("hidden")
    const [position, setposition] = useState("hidden")
    const handleHover = () => {
        setbg("gray-800")
        setdisplay("flex")
        setposition("absolute")
    }
    const handleLeave = () => {
        setbg("none")
        setdisplay("hidden")
        setposition("hidden")
    }
    
    return (
        <div className={mode==="light"?'relative border-2 rounded-lg   group  top-0 left-0 flex justify-center items-center group transform transition-all ease-out cursor-pointer':'relative border-2 rounded-lg border-gray-800 group  top-0 left-0 flex justify-center items-center group transfor transition-all ease-out cursor-pointer'} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
            <img src={img} alt=""  className='h-[400px] object-cover rounded-lg object-top bg-gray-200 transition-opacity delay-100 group-hover:opacity-30 m-1 w-[300px] select-none'/>

            <div className={`absolute ${display} transition  items-center justify-between space-x-4 text-gray-100`}>
                <ShoppingCartIcon className={`h-12 w-12 rounded-full bg-${bg} p-2 cursor-pointer hover:scale-105 duration-150 transform transition ease-out active:scale-90 duration-105 active:ease-out ` } />
              <Link to={`/product/${id}`}>
                <SearchIcon className={`h-12 hover:text-white w-12 rounded-full bg-${bg} p-2 cursor-pointer hover:scale-105 duration-150 transform transition ease-out active:scale-90 duration-105 active:ease-out ` }/>
              </Link>
                <HeartIcon className={`h-12 w-12 rounded-full bg-${bg} p-2 cursor-pointer hover:scale-105 duration-150 transform transition ease-out active:scale-90 duration-105 active:ease-out ` } />
            </div>
            <div className='absolute cursor-default select-none top-0 flex justify-center items-center right-0 m-2 rounded-full bg-red-600 h-8 w-16'>
                <p className='text-white tex-sm font-Lora'>${price}</p>
            </div>
            <div className={mode==="light"?`${position} bottom-0 h-36  transition-all  delay-500 ease-out px-3 py-2 overflow-scroll scrollbar-hide bg-gray-200 rounded-b-lg  min-w-full mx-4`:`${position} bottom-0 h-36  transition-all duration-500 ease-out px-3 py-2 overflow-scroll scrollbar-hide bg-gray-800 rounded-b-lg  min-w-full mx-4`}>
                <h1 className='text-yellow-600 font-bold text-sm mb-2'>{title}</h1>
                <p className={mode ==="light"?'text-xs  text-gray-700':'text-xs text-gray-100'}>{desc}</p>
            </div>
        </div>
    )
}

export default ProductItem

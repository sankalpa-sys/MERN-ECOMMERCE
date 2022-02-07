import React from 'react'
import { Link } from 'react-router-dom'

function CategoryItem({img,title, cat}) {
    return (
        <Link to={`/products/${cat}`}>
        <div className='relative w-full h-[90vh]'>
            <img src={img} alt="" className='h-full w-full object-cover'/>
            <div className='absolute top-0 w-full h-full left-0 flex flex-col items-center justify-center space-y-4'>
                <h1 className='text-white text-4xl font-bold font-mono'>{title}</h1>
                <button className='text-white p-2 rounded-lg   bg-gray-800 shadow-lg'>SHOP NOW</button>
            </div>
        </div>
        </Link>
    )
}

export default CategoryItem

import React from 'react'
import { Link } from 'react-router-dom'

function NewProductItem({img,id}) {
  return (
    <Link to={`/product/${id}`}>
        <div className='h-[400px] shrink-0 cursor-pointer group w-[300px]'>
            <img className='h-full group-hover:scale-105 transform transition duration-300 ease-out w-full' src={img} alt="" />
        </div>
    </Link>
  )
}

export default NewProductItem
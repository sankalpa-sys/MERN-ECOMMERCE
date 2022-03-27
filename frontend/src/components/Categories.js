import React from 'react'
import categories from '../data'
import CategoryItem from './CategoryItem'

function Categories() {
    
    return (
        <div className='flex flex-col md:flex-row space-y-4 mt-4 justify-between items-center'>
          {categories.map((c)=>(
              <CategoryItem key={c.id} img={c.img} title={c.title} cat= {c.cat}/>
          ))}
        </div>
    )
}

export default Categories

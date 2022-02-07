import React from 'react'
import Announcement from '../components/Announcement'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import Product from '../components/Product'
import Slider from '../components/Slider'

function Home() {
    return (
        <div>
            
           <Navbar/>
           <Announcement/>
           <Slider/>
           <Categories/>
           <Product/>
           <Newsletter/>
           <Footer/>
        </div>
    )
}

export default Home

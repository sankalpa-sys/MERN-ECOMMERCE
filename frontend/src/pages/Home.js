import React from 'react'
import { useSelector } from 'react-redux'
import Alert from '../components/Alert'

import Announcement from '../components/Announcement'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import NewestArrivals from '../components/NewestArrivals'
import Newsletter from '../components/Newsletter'
import Product from '../components/Product'
import Slider from '../components/Slider'

function Home({alert, showAlert}) {
    const mode = useSelector(state=>state.theme.theme)
    return (
        <div className={mode==="light"?"bg-gray-200":"bg-gray-800"}>
            
           <Navbar/>
           
           <Announcement/>
           <Alert alert={alert}/>
           <Slider/>
           <Categories/>
           <NewestArrivals/>
           <Product/>
           <Newsletter showAlert={showAlert}/>
           <Footer/>
        </div>
    )
}

export default Home

import React from 'react'
import Alert from '../components/Alert'

import Announcement from '../components/Announcement'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import Product from '../components/Product'
import Slider from '../components/Slider'

function Home({alert, showAlert}) {
    return (
        <div>
            
           <Navbar/>
           
           <Announcement/>
           <Alert alert={alert}/>
           <Slider/>
           <Categories/>
           <Product/>
           <Newsletter showAlert={showAlert}/>
           <Footer/>
        </div>
    )
}

export default Home

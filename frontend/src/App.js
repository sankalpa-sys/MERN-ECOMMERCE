
import './App.css';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import Product from './pages/Product';
import ProductList from './pages/ProductList';
import Register from './pages/Register';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Success from './pages/Success';
import { useSelector } from 'react-redux';
import Admin from '../src/Admin/Admin';
import EditProducts from './Admin/EditProducts';
import React, {useState} from 'react'
import AddProduct from './Admin/AddProduct';
import Alert from './components/Alert';


function App() {
  const user = useSelector(state => state.user.currentUser)

  const [alert, setalert] = useState(null)

  const showAlert = (msg, type, title) => {
    setalert({
      msg,
      type,
      title
    })
    setTimeout(() => {
      setalert(null)
    }, 5000);
  }

  
  return (
   <Router>
     <Routes>
       <Route exact path="/" element={<Home alert={alert} showAlert={showAlert}/>}/>
       <Route path="/products/:category" element={<ProductList alert={alert} showAlert={showAlert}/>}/>
       <Route path="/product/:id" element={<Product showAlert={showAlert} alert={alert}/>}/>
       <Route path="/cart" element={user===null? <Home/>: <Cart alert={alert} showAlert={showAlert}/>}/>
       <Route path="/login" element={user!==null? <Home/>: <Login/>}/>
       <Route path="/register" element={user!==null? <Home/>:<Register/>}/>
       <Route path='/success' element={<Success/>}/>
       <Route path='/edit/:id'element={user !== null && user.isAdmin===true ? <EditProducts/>: <Home/>}/>
       <Route path='/add'element={user !== null && user.isAdmin===true ? <AddProduct/>: <Home/>}/>
       
       <Route path='/admin'element={user !== null && user.isAdmin===true ? <Admin/>: <Home/>}/>
     </Routes>
     <Alert alert={alert} showAlert={showAlert}/>
   </Router>
  );
}

export default App;

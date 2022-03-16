import React from 'react';
import Navbar from '../components/Navbar';
import Orders from './Orders';
import Products from './Products';
import UserList from './UserList';

function Admin() {
  return <>
  <Navbar/>
  <div className='flex justify-start flex-col space-y-8 bg-gradient-to-r from-gray-900 to-gray-400 text-white '>
   
   <UserList/>
   <hr />
   <Products/>
   <hr />
   <Orders/>
 </div>
  </>;
}

export default Admin;

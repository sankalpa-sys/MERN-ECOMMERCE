import React from 'react';
import Products from './Products';
import UserList from './UserList';

function Admin() {
  return <div className='flex justify-start flex-col space-y-8 bg-gradient-to-r from-gray-900 to-gray-400 text-white '>
   
    <UserList/>
    <hr />
    <Products/>
  </div>;
}

export default Admin;

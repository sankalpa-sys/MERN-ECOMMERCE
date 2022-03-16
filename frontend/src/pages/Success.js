import { CheckCircleIcon } from '@heroicons/react/solid';
import React from 'react';
import Navbar from '../components/Navbar';

function Success() {
  return <>
  <Navbar/>
  <div className='flex flex-col bg-gray-200 justify-center items-center space-y-4 h-screen w-full'>
      <img src="https://cdn.pixabay.com/photo/2016/12/20/05/24/store-1919712__480.png" className='h-20 w-20' alt="" />
      <p className='h-16 w-[10rem] bg-green-600 flex justify-center items-center font-bold text-white text-lg font-mono rounded-lg'>Successfull  <CheckCircleIcon className='h-6 w-6'/></p>
      <p className='text-center text-lg font-serif text-gray-800 '>Your order is being prepared. Thanks for choosing Dokan.</p>
  </div></>;
}

export default Success;


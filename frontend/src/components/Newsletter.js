import { PaperAirplaneIcon } from '@heroicons/react/outline'
import React from 'react'

function Newsletter() {
    return (
        <div className='h-96 w-full bg-gray-100 shadow-sm flex justify-center items-center flex-col space-y-6'>
            <h1 className='text-7xl font-serif'>Newsletter</h1>

            <p className='text-lg font-mono text-center'>Get timely updates of your favorite products</p>

            <div className='flex w-1/2 rounded-l-lg h-10 items-center justify-center'>
                <input type="text" placeholder='Your email' className='flex-grow h-full rouned-l-lg pl-2 outline-none '/>
                <PaperAirplaneIcon className='h-10 w-10 p-1 rotate-90 bg-green-700 text-gray-200 rounded-t-lg cursor-pointer '/>
            </div>
        </div>
    )
}

export default Newsletter

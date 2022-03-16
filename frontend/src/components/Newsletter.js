import { PaperAirplaneIcon } from '@heroicons/react/outline'
import React,{useState} from 'react'

import { publicRequest } from '../requestMethods'

function Newsletter({showAlert}) {
    const [email, setemail] = useState("")
    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            await publicRequest.post('/newsletter', {email: email})
            showAlert( "You have subscribed to our Newsletter", "success", "Congrats!")
            window.scrollTo({
                top: 0,
                behavior : "smooth"
              })
              setemail("")
        } catch (error) {
            showAlert( "Email already provided", "danger", "Error")
            window.scrollTo({
                top: 0,
                behavior : "smooth"
              })
        }
    }
    return (
        <div className='h-96 w-full bg-gray-100 shadow-sm flex justify-center items-center flex-col space-y-6'>
            <h1 className='text-7xl font-serif'>Newsletter</h1>

            <p className='text-lg font-mono text-center'>Get timely updates of your favorite products</p>

            <form onSubmit={handleSubmit} className='flex w-1/2 rounded-l-lg h-10 items-center justify-center'>
                <input type="email" value={email} onChange={e=>setemail(e.target.value)} placeholder='Your email' className='flex-grow h-full rounded-l-xl pl-2 outline-none '/>
                <button type='submit'><PaperAirplaneIcon className='h-10 w-10 p-1 rotate-90 bg-green-700 text-gray-200 rounded-t-lg cursor-pointer '/></button>
            </form>
        </div>
    )
}

export default Newsletter

import { PaperAirplaneIcon } from '@heroicons/react/outline'
import React,{useState} from 'react'
import { useSelector } from "react-redux";

import { publicRequest } from '../requestMethods'

function Newsletter({showAlert}) {
    const mode  = useSelector(state => state.theme.theme)
    const [email, setemail] = useState("")
    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            await publicRequest.post('/newsletter', {email: email})
            showAlert( "You have subscribed to our Newsletter", "success", "Congrats")
            
              setemail("")
        } catch (error) {
            showAlert( "Email already provided", "danger", "Error")
            
        }
    }
    return (
        <div className={mode==="light"? 'h-96 w-full bg-gray-200 shadow-sm flex justify-center items-center flex-col space-y-6':'h-96 w-full border-t bg-gray-800 shadow-sm text-white flex justify-center items-center flex-col space-y-6'}>
            <h1 className='text-7xl font-serif'>Newsletter</h1>

            <p className='text-lg font-mono text-center'>Get timely updates of your favorite products</p>

            <form onSubmit={handleSubmit} className='flex w-1/2 rounded-l-lg h-10 items-center justify-center'>
                <input type="email" value={email} onChange={e=>setemail(e.target.value)} placeholder='Your email' className={mode==="light"?'flex-grow h-full rounded-l-xl pl-2 outline-none ':'flex-grow text-gray-900 h-full rounded-l-xl pl-2 outline-none '}/>
                <button type='submit'><PaperAirplaneIcon className='h-10 w-10 p-1 rotate-90 bg-green-700 text-gray-200 rounded-t-lg cursor-pointer '/></button>
            </form>
        </div>
    )
}

export default Newsletter

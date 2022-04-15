import React, {useState} from 'react'
import { login } from '../redux/apiCalls';
import {useDispatch, useSelector} from 'react-redux'

function Login() {
   
    const {isFetching, error} = useSelector(state=>state.user)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()
    const handleClick= (e) => {
        e.preventDefault()
        login(dispatch, {username:username, password:password})
    }
    return (
        <div className='w-full h-screen bg-no-repeat bg-cover bg-right  flex items-center pt-20 justify-center' style={{backgroundImage: 'url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")'}}>
            <div className=' md:w-[33.33%] w-full mx-4  py-10 flex-col space-y-4 bg-gray-200 rounded-lg shadow-2xl shadow-gray-600 flex items-center justify-center px-4 '>
                <h1 className='mt-4 self-start text-3xl font-extralight'>SIGN IN</h1>
                <div className='flex flex-col justify-center w-full space-y-2'>
                     <input type="text" value={username} onChange={e=>setUsername(e.target.value)}  placeholder='username' className='w-full font-light outline-none border-1 border-gray-400 h-10 pl-3' />
                     <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder='password' className='w-full font-light outline-none border-1 border-gray-400 h-10 pl-3' />
                
               

                    <button onClick={handleClick} disabled={isFetching===true} className={`self-start disabled:cursor-not-allowed  h-10 w-20 bg-teal-600 text-white hover:bg-teal-700 active:scale-90 transform transition duration-150 ease-in`}>LOGIN</button>
                    {error===true?<p className='font-bold text-red-600 text-sm'>Wrong Credentials!</p>:""}
                    {isFetching && (<h1 className=" text-sm text-yellow-600 ">Wait for some moment..</h1>)}
                </div>
                <p className='self-start cursor-pointer text-sm font-light'>FORGET PASSWORD?</p>
                <p className='self-start cursor-pointer text-sm font-light'>CREATE A NEW ACCOUNT</p>
               
            </div>
        </div>
    )
}

export default Login

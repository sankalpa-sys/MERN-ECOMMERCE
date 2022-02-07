import React,{useState} from 'react'
import { publicRequest } from '../requestMethods';
import {useNavigate} from 'react-router-dom'


function Register() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    });
    const handleChange = (e) => {
        setUser((prevData) => {
            return{
                ...prevData,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
             await publicRequest.post('/auth/register', user)
            navigate('/', {replace: true})
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='w-full h-screen bg-no-repeat bg-cover bg-right  flex  items-center pt-20 justify-center' style={{backgroundImage: 'url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")'}}>
            <div className=' md:w-1/2 mx-4 w-full py-10 flex-col space-y-6 bg-gray-100 rounded-lg shadow-2xl shadow-gray-600 flex items-center justify-center px-4 '>
                <h1 className='mt-4 self-start text-3xl font-extralight'>CREATE AN ACCOUNT</h1>
                <form action="" onSubmit={handleSubmit}  className='flex flex-col justify-center items-center space-y-3 '>
                
                <div className='flex space-x-4 justify-between items-center flex-grow w-full'>
                    <input type="text" name='username' placeholder='username' onChange={handleChange} className='flex-grow font-light outline-none border-1 border-gray-400 h-10 pl-3' />
                    <input type="email" name='email' placeholder='email' onChange={handleChange} className='flex-grow font-light outline-none border-1 border-gray-400 h-10 pl-3' />
                </div>
                <div className='flex space-x-4 justify-between items-center flex-grow w-full'>
                    <input type="password" name='password' placeholder='password' onChange={handleChange} className='flex-grow font-light outline-none border-1 border-gray-400 h-10 pl-3' />
                    <input type="password" pattern={user.password} placeholder='confirm password'  className='flex-grow font-light outline-none border-1 border-gray-400 h-10 pl-3' />
                </div>
                <p className='text-sm text-start'>By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b> </p>

                <button type='submit' className='self-start h-10 w-20 bg-teal-600 text-white hover:bg-teal-700 active:scale-90 transform transition duration-150 ease-in'>CREATE</button>
                </form>
               
            </div>
        </div>
    )
}

export default Register

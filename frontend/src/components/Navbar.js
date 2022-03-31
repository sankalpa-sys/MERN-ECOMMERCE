import React, {useState, useEffect} from "react";
import { SearchIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";
import { publicRequest } from "../requestMethods";


function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const quantity = useSelector(state=>state.cart.quantity)
  const user = useSelector(state=> state.user.currentUser)
  const handleLogOutClick = () => {
    dispatch(logout())
    navigate('/')
  }

  const [inputValue, setinputValue] = useState("")
  const [products, setproducts] = useState([])

  useEffect(() => {
    const getProducts = async() => {
      const res = await publicRequest.get('/products')
      setproducts(res.data)
    }
    getProducts()
  }, [])

  const filteredProducts = products.filter((m)=>{
    return m.title.toLowerCase().includes(inputValue.toLowerCase())
  })
  const hanleProductClick = () => {
    setinputValue("")
  }
  

  return (
    <div className="flex justify-between items-center w-full h-14 text-gray-700 shadow-xl bg-gradient-to-r from-gray-200 to-gray-300 sticky top-0 z-50  ">
      <div className="flex  justify-between items-center space-x-4 ml-4">
        <h5>EN</h5>
        <div className="flex h-8  w-96 items-center space-x-2 border shadow-sm ">
          <input type="text" onChange={e=>setinputValue(e.target.value)} value={inputValue} className=" relative rounded-lg outline-none pl-2 w-full h-full"  />
          <SearchIcon className=" w-7 mr-2 h-7 cursor-pointer  p-1 " />
        </div>
      </div>
      <div className={filteredProducts.length === 0 || inputValue === ""?"hidden":`absolute left-[50px] h-auto top-[50px] rounded-lg p-4 bg-gray-300 w-96 flex flex-col space-y-2 text-sm font-xs`}>
        {filteredProducts.slice(0,7).map((m)=>(
          <Link to={`/product/${m._id}`}><p key={m._id} onClick={hanleProductClick} className="cursor-pointer transition-all ease-out duration-200  hover:bg-yellow-600 hover:text-white py-2 px-2">{m.title}</p></Link>
        ))}
      </div>

      <div>
        <Link to='/'><h1 className="font-bold hover:text-gray-700 text-lg md:text-4xl font-mono">DOKAN.</h1></Link>
      </div>

      <div className=" relative flex justify-between items-center space-x-4 mr-6">
        {user &&(<img src={user.img?user.img:"https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} className="rounded-full h-8 w-8 cursor-pointer " alt="" />)}
        {user !== null? (<p onClick={handleLogOutClick} className=" text-xs md:text-sm hover:text-cyan-700 cursor-pointer">LOG OUT</p>):
        (
          <>
          <Link to='/register'><p className="text-xs md:text-sm  hover:text-cyan-700 cursor-pointer">REGISTER</p></Link>
          <Link to='/login'><p className="text-xs md:text-sm hover:text-cyan-700 cursor-pointer">SIGN IN</p></Link></>
        )
        }
        {user && user.isAdmin===true?<Link to='/admin'><p className="text-xs md:text-sm hover:text-cyan-700 cursor-pointer">DASHBOARD</p></Link>:""}
        
        
       <Link to='/cart'><div hidden={user===null} className="flex relative">
          <ShoppingCartIcon className=" h-6 w-6 hover:text-cyan-700 text-gray-700" />
        <p className="absolute bottom-4 animate-pulse left-4 bg-red-600 w-full text-center text-white overflow-hidden mr-2 rounded-full mt-1">{quantity}</p>
       </div></Link>
      </div>
    </div>
  );
}

export default Navbar;

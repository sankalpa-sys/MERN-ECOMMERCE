import React from "react";
import { SearchIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";

function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const quantity = useSelector(state=>state.cart.quantity)
  const user = useSelector(state=> state.user.currentUser)
  const handleLogOutClick = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <div className="flex justify-between items-center w-full h-14 text-gray-700 shadow-xl bg-gray-200 sticky top-0 z-50  ">
      <div className="flex justify-between items-center space-x-4 ml-4">
        <h5>EN</h5>
        <div className="flex h-7 items-center space-x-2 border shadow-sm w-full ">
          <input type="text" className=" outline-none pl-2 w-full h-full"  />
          <SearchIcon className=" w-7 mr-2 h-7 cursor-pointer  p-1 " />
         
        </div>
      </div>

      <div>
        <Link to='/'><h1 className="font-bold hover:text-gray-700 text-lg md:text-4xl font-mono">DOKAN.</h1></Link>
      </div>

      <div className=" relative flex justify-between items-center space-x-4 mr-6">
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
        <p className="absolute bottom-4 left-4 bg-red-500 w-full text-center text-white overflow-hidden mr-2 rounded-full mt-1">{quantity}</p>
       </div></Link>
      </div>
    </div>
  );
}

export default Navbar;

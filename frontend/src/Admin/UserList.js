import React, { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import noImage from "../components/noImage";


function UserList() {

  const [display, setdisplay] = useState("hidden");
  const [Id, setId] = useState("");
  const [users, setusers] = useState([]);
  const [query, setQuery] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleQueryClick = () => {
    if (query === "") {
      setQuery("?new=true");
    } else {
      setQuery("");
    }
  };

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await userRequest.get(`/users${query}`);
        setusers(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllUsers();
  }, [query]);

  const handleUserDelete = async (id) => {
    try {
      await userRequest.delete(`/users/${id}`);
      window.location.replace("/admin");
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditSubmit = async(e) => {
    e.preventDefault()
    try {
       await userRequest.put(`users/${Id}`,{username, email, password})
       window.location.replace("/admin");
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditClick = (i,u,e) => {
    setdisplay("inline-block")
    setId(i)
    setUsername(u)
    setEmail(e)
  }

  
  return (
    <div className="w-full px-4 md:relative pb-4 mb-20 font-Lora ">
      <div className="w-3/4">
        <div className="flex items-center justify-start py-4 space-x-4 ">
          {query === "" ? (
            <h1 className="text-2xl font-bold ">
              All Users({users.length})
            </h1>
          ) : (
            <h1 className="text-2xl font-bold  ">
              New Users({users.length})
            </h1>
          )}

          <button
            onClick={handleQueryClick}
            className="h-8 bg-gray-800 hover:bg-gray-900 text-white border p-1 border-black "
          >
            {query === "" ? "New Users" : "All Users"}
          </button>
        </div>
        <div className="flex items-center justify-between w-1/2">
          <h1 className="flex justify-start w-[33.33%] text-xl font-bold text-yellow-600 mb-4">
            Username
          </h1>
          <h1 className="flex justify-start w-[66.66%] ml-4 text-xl font-bold text-yellow-600 mb-4">
            Email
          </h1>
        </div>
        <div className="flex flex-col justify-center items-start space-y-8">
          {users.map((user) => (
            <div
              key={user._id}
              className="flex justify-between items-center w-1/2"
            >
              <div className="flex items-center space-x-2 ">
                <img
                  className="h-8 w-8 rounded-full object-contain"
                  src={user.img ? user.img : noImage}
                  alt=""
                />
                <h1 className="">{user.username}{user.isAdmin===true?<p className="font-bold text-red-600">(Admin)</p>:""}</h1>
              </div>

              <h1>{user.email}</h1>

              <div className="flex justify-between items-center space-x-2">
                <button onClick={()=>handleEditClick(user._id,user.username,user.email)} className="h-8 rounded-lg hover:bg-green-600 select-none bg-green-500 py-1 px-2 w-14 text-gray-200">
                  Edit
                </button>
                <button
                  onClick={() => handleUserDelete(user._id)}
                  className="bg-red-600 w-16 select-none hover:bg-red-700 rounded-lg h-8 text-gray-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`h-full mb-20 ${display}  border-2 border-gray-600 w-1/2 md:w-1/4 md:absolute right-52 top-20  flex flex-col justify-center rounded-lg items-center space-y-2 shadow-xl shadow-gray-600/30`}>
        <h1 className="text-xl font-mono font-bold text-white mt-6 border-b-2 border-white">EDIT USER</h1>

        <form action="" onSubmit={handleEditSubmit} className="flex flex-col justify-center space-y-6 items-center w-full h-full">
            <input name="username" value={username} onChange={(e)=>setUsername(e.target.value)}   className="h-10 text-gray-700 w-3/4 rounded-md px-2 outline-none border-2 border-gray-300" type="text" placeholder="username" />
            <input name="email" value={email} onChange={(e)=>setEmail(e.target.value)}  className="h-10 w-3/4 px-2 outline-none border-2 text-gray-700 rounded-md  border-gray-300" type="text" placeholder="email" />
            <input name="password" value={password} onChange={(e)=>setPassword(e.target.value)}  className="h-10 text-gray-700 rounded-md text-sm w-3/4 px-2 outline-none border-2 border-gray-300" type="password"  id="" placeholder="password (Leave Blank if not needed)" />
            <button type="submit" className="h-10 w-16 shadow-xl shadow-cyan-500/50 bg-cyan-500 hover:bg-cyan-600 rounded-xl text-gray-100">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UserList;

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { publicRequest, userRequest } from "../requestMethods";
import { CheckIcon } from "@heroicons/react/outline";
import colors from "../colors";
import app from "../firebase";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";

function EditProducts() {
  const [product, setproduct] = useState([]);
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [size, setsize] = useState("");
  const [color, setcolor] = useState("");
  const [price, setprice] = useState("");
  const [img, setimg] = useState("");
  const [categories, setcategories] = useState([]);
  const [inStock, setinStock] = useState(false);
  const [imageToBeUploaded, setImageToBeUploaded] = useState(null);


  const location = useLocation();
  const path = location.pathname.split("/")[2];
  console.log(imageToBeUploaded);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/products/find/${path}`);
        setproduct(res.data);
        settitle(res.data.title);
        setdesc(res.data.desc);
        setcolor(res.data.color);
        setsize(res.data.size);
        setprice(res.data.price);
        setimg(res.data.img);
        setinStock(res.data.inStock);
        setcategories(res.data.categories.toString());
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
   
        if(imageToBeUploaded===null){
            await userRequest.put(`/products/${path}`, {
                title,
                desc,
                size,
                color,
                inStock,
                price,
                categories,
                img:img
              });
              window.location.reload(false)
              alert("Product has been successfully updated.")
        }else{
            const fileName = new Date().getTime() + imageToBeUploaded.name;
            const storage = getStorage(app);
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, imageToBeUploaded);
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                  case "paused":
                    console.log("Upload is paused");
                    break;
                  case "running":
                    console.log("Upload is running");
                    break;
                  default:
                }
              },
              (error) => {
                // Handle unsuccessful uploads
              },
              () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  userRequest.put(`/products/${path}`, {
                      title,
                      desc,
                      size,
                      color,
                      inStock,
                      price,
                      categories,
                      img:downloadURL
                    });
                    window.location.reload(false)
                    alert("Product has been successfully updated.")
      
      
                    
                });
              }
            );
        }

       
      
  };
  
  return (
    <div className="bg-gray-900  text-black h-screen py-16 px-32  ">
      <div className="h-full  flex flex-col items-center ">
        <div className="flex items-center mt-2 mb-2 ">
          <h1 className=" font-bold font-mono text-2xl text-white">
            Edit Product &nbsp;
          </h1>
          <Link to="/admin">
            <p className="text-white font-bold text-2xl border-b ">
              {" "}
              &nbsp;Go Back
            </p>
          </Link>
        </div>

        <div className=" w-full flex  bg-zinc-700 h-full rounded-lg mt-2">
          <img src={img} className="h-full rounded-lg w-96" alt="" />
          <form
            className="flex font-serif flex-col w-full space-y-6 m-4"
            onSubmit={handleSubmit}
          >
            <input
              type="file"
              
              onChange={(e) => setImageToBeUploaded(e.target.files[0])}
              className="h-8 file:h-8 file:bg-cyan-700 file:hover:bg-cyan-800 file:border-none file:text-white  file:rounded-xl rounded-xl  bg-gray-200 outline-none"
            />
            <input
              value={title}
              className="h-8 rounded-xl px-2 bg-gray-200 outline-none"
              type="text"
              placeholder="title"
              onChange={(e) => settitle(e.target.value)}
            />
            <textarea
              value={desc}
              onChange={(e) => setdesc(e.target.value)}
              className="rounded-xl px-2 bg-gray-200 outline-none"
              name="desc"
              id="desc"
              cols="30"
              rows="5"
              placeholder="description"
            ></textarea>
            <select
              value={size}
              className="rounded-xl h-8 px-2 bg-gray-200 outline-none"
              name="size"
              id="size"
              onChange={(e) => setsize(e.target.value)}
            >
              <option value="xs">XS</option>
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">L</option>
              <option value="xl">Xl</option>
            </select>
            <div className="flex items-center space-x-2">
              {colors.map((c) => (
                <p
                  key={c.id}
                  onClick={() => setcolor(c.title)}
                  className={`h-6 w-6 ${c.bg} cursor-pointer hover:scale-125 rounded-full`}
                >
                  {" "}
                  {color !== "white" ? (
                    <CheckIcon
                      className={
                        c.title === color
                          ? "inline-flex  text-center text-white "
                          : "hidden"
                      }
                    />
                  ) : (
                    <CheckIcon
                      className={
                        c.title === color
                          ? "inline-flex  text-center text-black "
                          : "hidden"
                      }
                    />
                  )}{" "}
                </p>
              ))}
            </div>
            <select
              value={inStock}
              className="rounded-xl h-8 px-2 bg-gray-200 outline-none"
              onChange={(e) => setinStock(e.target.value)}
              name="inStock"
              id="inStock"
            >
              <option value="true">In Stock</option>
              <option value="false">Not in Stock</option>
            </select>
            <input
              type="number"
              placeholder="price"
              value={price}
              onChange={(e) => setprice(e.target.value)}
              className="rounded-xl h-8 px-2 bg-gray-200 outline-none"
            />
            <input
              type="text"
              placeholder="categories(men, women..)"
              value={categories}
              onChange={(e) => setcategories(e.target.value.split(","))}
              className="rounded-xl h-8 px-2 bg-gray-200 outline-none"
            />
            <button
              type="submit"
              className="bg-green-600 h-10 text-center rounded-xl hover:bg-green-700 active:scale-90 transform transition duration-300 ease-out w-20 text-white self-start"
            >
              EDIT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProducts;

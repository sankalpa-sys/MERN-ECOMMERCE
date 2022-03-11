import React, { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { userRequest } from "../requestMethods";
import colors from "../colors";
import {CheckIcon} from '@heroicons/react/outline'
import Alert from "../components/Alert";
function AddProduct() {
  const [color, setcolor] = useState("")
  const [product, setproduct] = useState({});
  const [inputs, setInputs] = useState({
    title: "",
    desc: "",
    size: "m",
    price: "",

    inStock: true,
  });

  const [img, setImg] = useState("");
  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    setInputs((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleCatChange = (e) => {
    setCategories(e.target.value.split(","));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + img.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, img);

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
          
          userRequest.post("/products", { ...inputs, img: downloadURL, categories: categories, color:color });
          alert("Product has been added.")
          
        });
      }
    );
  };

  return (
    <>
    <Alert/>
    <div className="flex items-center space-x-4 bg-gradient-to-r from-cyan-700 to-teal-600 text-white">
      <img
        className="h-screen"
        src="https://images.pexels.com/photos/6694705/pexels-photo-6694705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt=""
      />
      <form
        onSubmit={handleSubmit}
        className="flex  h-screen flex-grow flex-col justify-start items-start"
      >
        <label className="ml-3 mt-2" htmlFor="title">
          Title:
        </label>
        <input
          onChange={handleChange}
          type="text"
          name="title"
          id="title"
          className="h-8 addInputs"
        />

        <label className="ml-3 mt-2" htmlFor="title">
          Description:
        </label>
        <textarea
          onChange={handleChange}
          type="text"
          name="desc"
          rows={5}
          id="desc"
          className="addInputs"
        />

        <label className="ml-3 mt-2" htmlFor="img">
          Image:
        </label>
        <input
          type="file"
          onChange={(e) => setImg(e.target.files[0])}
          name="img"
          id="img"
          className="addInputs pl-0 file:bg-purple-600 file:rounded-lg file:border-none file:cursor-pointer file:text-white text-white "
        />
        <label className="ml-3 mt-2" htmlFor="categories">
          Categories:
        </label>
        <input
          onChange={handleCatChange}
          type="text"
          name="categories"
          id="categories"
          placeholder="men,women.."
          className="h-8 addInputs"
        />
        <label htmlFor="size" className="ml-3 mt-2">Size:</label>
        <select
          className="h-8 addInputs"
          name="size"
          id="size"
          onChange={handleChange}
        >
          <option value="xs">XS</option>
          <option value="s">S</option>
          <option value="m">M</option>
          <option value="l">L</option>
          <option value="xl">Xl</option>
        </select>
        <label htmlFor="color">Color:</label>
        <div name="color" id="color" className="flex items-center space-x-2">
                    {colors.map((c)=>(
                     <p key={c.id} onClick={()=>setcolor(c.title)} className={`h-6 w-6 ${c.bg} cursor-pointer rounded-full`}> {color!== "white"? <CheckIcon className={c.title === color? "inline-flex  text-center text-white ":"hidden"}/>:<CheckIcon className={c.title === color? "inline-flex  text-center text-black ":"hidden"}/>} </p>

                    ))}
                    </div>
        <label className="ml-3 mt-2" htmlFor="price">
          Price:
        </label>
        <input
          onChange={handleChange}
          type="number"
          name="price"
          id="price"
          placeholder=""
          className="h-8 addInputs"
        />
        <label htmlFor="inStock ml-3 mt-2">Availability:</label>
        <select
          name="inStock"
          className="h-8 addInputs"
          onChange={handleChange}
          id="inStock"
        >
          <option value={true}>True</option>
          <option value={false}>false</option>
        </select>

        <button
          type="submit"
          className="bg-gradient-to-r  from-purple-500 to-pink-500 h-10  rounded-full pr-1 w-20 ml-3 flex items-center justify-center mt-3 shadow-xl shadow-pink-500/50 active:scale-90 transdorm transition duration-300 ease-out"
        >
          Add
        </button>
      </form>
    </div>
    </>
  );
}

export default AddProduct;

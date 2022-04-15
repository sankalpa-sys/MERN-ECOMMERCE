import React, { useState, useEffect } from "react";
import { userRequest } from "../requestMethods";
import { Modal } from "react-bootstrap";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function Orders() {
  const [status, setstatus] = useState("")
  const [show, setShow] = useState(false);
  const [toBeUpdatedId, settoBeUpdatedId] = useState("")

  const handleClose = () => setShow(false);
  const handleEditButtonClick = async(id) => {
    setShow(true)
    settoBeUpdatedId(id)
  

  };

  const [orders, setOrders] = useState([]);
  const [runUseEffect, setrunUseEffect] = useState(1);
  useEffect(() => {
    const getOrders = async () => {
      const res = await userRequest.get("/orders");
      setOrders(res.data);
    };
    getOrders();
  }, [runUseEffect]);

  const handleOrderDelete = async (id) => {
    try {
      await userRequest.delete(`/orders/${id}`);
      setrunUseEffect(runUseEffect + 1);
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrderEdit = async() => {
    try {
      userRequest.put(`/orders/${toBeUpdatedId}`, {status:status
    })
    setrunUseEffect(runUseEffect + 1)
    setShow(false)
   
  }
   
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="relative overflow-x-auto  shadow-md sm:rounded-lg ">
      <h1 className="my-6 w-full text-center font-semibold  text-yellow-600 text-2xl">
        ORDERS({orders.length})
      </h1>
      <table className="w-full text-sm text-left text-gray-700 dark:text-gray-700">
        <thead className="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label for="checkbox-all" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Product
            </th>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Color
            </th>
            <th scope="col" className="px-6 py-3">
              size
            </th>
            <th scope="col" className="px-6 py-3">
              quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Address
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3"></th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr className="bg-gray-700 text-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 ">
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-1"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="checkbox-table-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>

              <td className="px-6 py-4 text-xs ">
                {order.products.map((product) => (
                  <img
                    className="h-10 w-10 my-3 object-cover"
                    src={product.img}
                    alt=""
                  />
                ))}
                <br />
              </td>
              <td className="px-6 py-4 text-xs ">
                {order.products.map((product) => (
                  <p className="my-3 first-letter:font-black first-letter:text-yellow-600">
                    {product.title}
                  </p>
                ))}
                <br />
              </td>
              <td className="px-6 py-4 text-xs ">
                {order.products.map((product) => (
                  <p className="my-3 ">{product._id}</p>
                ))}
                <br />
              </td>
              <td className="px-6 py-4 text-xs ">
                {order.products.map((product) => (
                  <p className="my-3 first-letter:uppercase">{product.color}</p>
                ))}
                <br />
              </td>
              <td className="px-6 py-4 text-xs ">
                {order.products.map((product) => (
                  <p className="my-3 uppercase">{product.size}</p>
                ))}
                <br />
              </td>
              <td className="px-6 py-4 text-xs ">
                {order.products.map((product) => (
                  <p className="my-3">{product.quantity}</p>
                ))}
                <br />
              </td>

              <td className="px-6 py-4">${order.amount}</td>
              <td className="px-6 py-4">
                {order.address.line1}
              </td>
              <td className="px-6 py-4">
                <p className={order.status==="pending"?"text-yellow-600 first-letter:uppercase":"text-green-600 first-letter:uppercase"}>
                  {order.status}
                </p>
              </td>
              <td className="px-6 py-4">
                <p
                  onClick={()=>handleEditButtonClick(order._id)}
                  className={
                    "text-green-600  font-bold text-xs underline cursor-pointer hover:text-green-700 active:scale-90 duration-300 transform transition ease-out "
                  }
                >
                  Edit
                </p>
              </td>
              <Modal show={show} onHide={handleClose} className="">
                <Modal.Header className="bg-gray-700 text-white" closeButton>
                  <Modal.Title className="font-Lora">
                    Edit Order Status{" "}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-gray-700 text-white">
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label" className="text-white font-Lora my-3">
                      Order Status
                    </FormLabel>
                    <RadioGroup
                    onChange={(event)=>setstatus(event.target.value)}
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      className=""
                    >
                      <FormControlLabel
                        value="pending"
                        control={<Radio />}
                        label="Pending"
                        
                      />
                      <FormControlLabel
                        value="delivered"
                        control={<Radio />}
                        label="Delivered"
                      />
                      
                     
                    </RadioGroup>
                  </FormControl>
                </Modal.Body>
                <Modal.Footer className="bg-gray-700">
                  <button
                    className="bg-red-500 text-sm text-white p-1 rounded-lg"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                  <button
                    className="bg-blue-700  text-sm text-white p-1 rounded-lg"
                    onClick={handleOrderEdit}
                  >
                    Save Changes
                  </button>
                </Modal.Footer>
              </Modal>
              <td className="px-6 py-4">
                <p
                  onClick={() => handleOrderDelete(order._id)}
                  className={
                    "text-red-600  font-bold text-xs underline cursor-pointer hover:text-green-700 active:scale-90 duration-300 transform transition ease-out "
                  }
                >
                  Delete
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;

import React, { useState, useEffect } from "react";
import { userRequest } from "../requestMethods";
import { Dropdown } from "react-bootstrap";

function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      const res = await userRequest.get("/orders");
      setOrders(res.data);
    };
    getOrders();
  }, []);
  var i=1;
  return (
    <div className="w-full mb-2 px-2  select-none">
      <h1 className="text-xl font-mono font-bold text-cyan-500 my-4">
        Orders({orders.length})
      </h1>

      <table className="w-full ">
        <tr className="text-bold flex justify-between items-center text-lg text-teal-500">
          <tr className="grid gap-x-6 grid-cols-5 w-1/2">
              <th>SN</th>
            <th>Product</th>
            <th>Color</th>
            <th>Size</th>
            <th>Quantity</th>
          </tr>
          
               
               
               <tr className="grid gap-x-6 grid-cols-3 w-1/2">
               <th>Shipping Address</th>
                <th>Amount</th>
                <th>Status</th>
               </tr>
               
        </tr>
        {orders.map((order) => (
          <>
          <tr className="" key={order._id}>
            {order.products.map((product)=>(
               <tr key={product._id} className="grid gap-x-6 grid-cols-5 w-1/2">
                   <td>{i++}</td>
                   <td className=" ">{product.title}</td>
                   <td className="">{product.color}</td>
                   <td>{product.size}</td>
                   <td>{product.quantity}</td>
               </tr>
            ))}
        
            
            <tr className="grid grid-cols-3 w-1/2">
            <td className=" flex-grow">
              <Dropdown className="w-3/4 my-3">
                {" "}
                <Dropdown.Toggle
                  className="w-full"
                  variant="success"
                  id="dropdown-basic"
                >
                  Address
                </Dropdown.Toggle>
                <Dropdown.Menu className="w-full bg-gray-200">
                  <Dropdown.Item className="w-full flex items-center text-sm">
                    <h1 className="font-bold ">City</h1>:&nbsp;{" "}
                    <p className="first-letter:uppercase">
                      {order.address.city}
                    </p>
                  </Dropdown.Item>
                  <Dropdown.Item className="w-full flex items-center text-sm">
                    <h1 className="font-bold ">Country</h1>: &nbsp;{" "}
                    <p>{order.address.country}</p>
                  </Dropdown.Item>
                  <Dropdown.Item className="w-full flex flex-wrap items-center text-sm">
                    <h1 className="font-bold ">Line 1</h1>: &nbsp;{" "}
                    <p>{order.address.line1}</p>
                  </Dropdown.Item>
                  <Dropdown.Item className="w-full flex items-center text-sm">
                    <h1 className="font-bold ">Line 2</h1>: &nbsp;{" "}
                    <p>{order.address.line2}</p>
                  </Dropdown.Item>
                  <Dropdown.Item className="w-full flex items-center text-sm">
                    <h1 className="font-bold ">Postal Code</h1>: &nbsp;{" "}
                    <p>{order.address.postal_code}</p>
                  </Dropdown.Item>
                  <Dropdown.Item className="w-full flex items-center text-sm">
                    <h1 className="font-bold ">State</h1>: &nbsp;{" "}
                    <p>{order.address.state}</p>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </td>
            <td>${order.amount}</td>
            <td>
              {order.status === "pending" ? (
                <h1 className="font-bold text-yellow-300">Pending</h1>
              ) : (
                <h1 className="font-bold text-green-400">Delivered</h1>
              )}
            </td>
            </tr>
            </tr>
          <hr />
          </>
        ))}
        
      </table>
    </div>
  );
}

export default Orders;

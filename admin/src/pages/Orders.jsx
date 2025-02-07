import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { TfiPackage } from "react-icons/tfi";
import { backend_url, currency } from "../App";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        backend_url + "/api/order/list",
        {},
        { headers: { token } }
      );
      console.log(response.data);
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const statusHandler=async(event,orderId)=>{
    try{
      const response =await axios.post(backend_url+'/api/order/status',{orderId,status:event.target.value},{headers:{token}})
      if(response.data.success){
        await fetchAllOrders()
      }
    }
    catch(error){
      console.log(error)
      toast.error(error.message)

    }
  }
  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (
    <div className="px-2 sm:px-8 mt-4 sm:mt-14">
    <div className="flex flex-col gap-4">
      {orders?.length > 0 ? (
        orders.map((order) => (
          <div
            key={order._id}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-start p-3 text-gray-700 bg-white rounded-lg shadow-md"
          >
            {/* ✅ Order Icon */}
            <div className="hidden lg:block ring-1 ring-slate-900/5 rounded p-7 bg-gray-100">
              <TfiPackage className="text-3xl text-secondary" />
            </div>
  
            {/* ✅ Order Details */}
            <div>
              <h5 className="font-medium">Items:</h5>
              <div className="flex flex-col">
                {order.items.length > 0 ? (
                  order.items.map((item, index) => (
                    <p key={index}>{item.name} x {item.quantity}</p>
                  ))
                ) : (
                  <p className="text-gray-500">No items in this order</p>
                )}
              </div>
              <p><span className="font-medium">Name:</span> {order.address.firstName} {order.address.lastName}</p>
              <p><span className="font-medium">Address:</span> {order.address.street}, {order.address.city}, {order.address.country}, {order.address.zipcode}</p>
              <p><span className="font-medium">Phone:</span> {order.address.phone}</p>
            </div>
  
            {/* ✅ Order Summary */}
            <div>
              <p><span className="font-medium">Total Items:</span> {order.items.length}</p>
              <p><span className="font-medium">Payment Method:</span> {order.paymentMethod}</p>
              <p>
                <span className="font-medium">Payment Status:</span>
                {order.payment ? <span className="text-green-600"> Done</span> : <span className="text-red-600"> Pending</span>}
              </p>
              <p><span className="font-medium">Date:</span> {new Date(order.date).toLocaleDateString()}</p>
            </div>
  
            {/* ✅ Price & Order Status */}
            <div>
              <p><span className="font-medium">Price:</span> {currency}{order.amount}</p>
              <select
                value={order.status}
                onChange={(event)=>statusHandler(event,order._id)}
                
                className="p-1 ring-1 ring-slate-900/5 rounded bg-gray-100 text-sm font-semibold"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No orders found.</p>
      )}
    </div>
  </div>
  
  );
};

export default Orders;

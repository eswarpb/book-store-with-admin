import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import Title from '../components/Title'
import Footer from '../components/Footer'

const Orders = () => {
  const {backendurl,token,currency}=useContext(ShopContext)
  const [orderData,setOrderData]=useState([])
  const loadOrderData = async() =>{
    try{
      if(!token){
        return null
      } 
      const response=await axios.post(backendurl+'/api/order/userorders',{},{headers:{token}})
       console.log(response.data)
      if(response.data.success){
        let allOrdersItem=[]
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status']=order.status
            item['payment']=order.payment
            item['paymentMethod']=order.paymentMethod
            item['date']=order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse())
      }
    }
    catch(error){
      console.log(error)

    }
  }
  useEffect(()=>{
    loadOrderData()
  },[token])
  return (
    <section className="max-padd-container">
      <div className='pt-28 pb-10'>
      <Title title1={"Order"} title2={'List'} title1Styles={'h3'} />
      
        {orderData.map((item, i) => (
          <div  key={i}
          className="bg-white p-2 mt-3 rounded-lg ">
              <div className='text-gray-700 flex felx-col gap-4'>
                <div className='flex gap-x-3 w-full'>
                  <div className='flex gap-6'>
                <img
                src={item.image}
                alt="orderItemimg"
                className="object-cover aspect-square rounded-md " width={55}
              />

                </div>
                <div className='block w-full'>
                  <h5 className='h5 capitalize line-clamp-1'>{item.name}</h5>
                  <div className='flexBetween'>
                    <div>
                      <div className='flex items-center gap-x-1 sm:gap-x-3'>
                      <div className="flexCenter gap-x-1">
                        <h5 className="medium-14">Price:</h5>
                        <p>{currency}{item.price}</p>
                        </div>
                        <div className="flexCenter gap-x-1">
                  <h5 className="medium-14">Quantity:</h5>
                  <p>{item.quantity}</p>
                </div>
                       
                <div className="sm:flexCenter gap-x-1 hidden">
                  <h5 className="medium-14">Payment:</h5>
                  <p className='text-gray-400'>{item.paymentMethod}</p>
                </div>
                      </div>
                      <div className="flex items-center gap-x-1">
                      <h5 className="medium-14">Date:</h5>
                      <p>{new Date(item.date).toDateString()}</p>
                </div>
               
                
                    </div>
                    <div className='flex flex-col xl:flex-row gap-3'>
                      <div className='flex items-center gap-2'>
                        <p className='min-w-2 h-2 rounded-full bg-secondary'></p>
                      <p
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  item.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : item.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {item.status}
              </p>
                      </div>
                      <button onClick={loadOrderData} className="mt-3 btn-secondaryOne text-white px-3 py-1.5 rounded-md text-sm hover:bg-violet-900 transition-all"> Track Order
              </button>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
        ))}

      </div>
   
    <Footer/>
  </section>
  

  )
}

export default Orders
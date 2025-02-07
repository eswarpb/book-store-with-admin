import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'

const Verify = () => {
  const {navigate,token,setCartItems,backendurl}=useContext(ShopContext)
  const [searchParams,SetSearchParams]=useSearchParams()
  const success=searchParams.get('success')
  const orderId=searchParams.get('orderId')


  const verifyPayment=async()=>{
    try{
      if(!token){
        return null
      }
      const response=await axios.post(backendurl+'/api/order/verifystripe',{success,orderId},{headers:{token}})
      if(response.data.success){
        setCartItems({})
        navigate('/orders')
      }
      else{
        navigate('/')
      }
    }
    catch(error){
      console.log(error)
        toast.error(error.message)
      
    }
  }
  useEffect(()=>{
    verifyPayment()
  },[token])
  return (

    <div>Verify</div>
  )
}

export default Verify
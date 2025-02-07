import React,{createContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import {toast }from "react-toastify"



export const ShopContext =createContext()
const ShopContextProvider = (props) => {
     const currency = '₹'
     const delivery_charges= 150
     const backendurl=import.meta.env.VITE_BACKEND_URL
     
     const navigate=useNavigate()
     const [books,setBooks]=useState([])
     const [token,setToken]=useState('')
     const [cartItems,setCartItems]=useState({})



     const addToCart = async (itemId)=>{
        const cartData={...cartItems}
        if(cartData[itemId]){
            cartData[itemId]+=1

        }
        else{
            cartData[itemId]=1
        }
        setCartItems(cartData)
        if(token){
            try{
                 await axios.post(backendurl+'/api/cart/add',{itemId},{headers:{token}})
            }
            catch(error){
                console.log(error)
                toast.error(error.message)

            }
        }
     }
    const getCartCount=()=>{
        let totalCount =0
        for(const item in cartItems){
            try {
        if(cartItems[item]>0){
            totalCount +=cartItems[item]
        }
       
        }
        catch(error){
            console.log(error)
        }
    }

        return totalCount;

    }
    const getCartAmount =()=>{
        let totalAmount=0
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo=books.find((book)=>book._id===item)
                if(itemInfo){
                    totalAmount +=itemInfo.price*cartItems[item]
                }
            }
        }
        return totalAmount
    }
    const updateQuantity=async (itemId,quantity)=>{
        const cartData={...cartItems}
        cartData[itemId]=quantity
        setCartItems(cartData)
        if(token){
            try{
                await axios.post(backendurl+'/api/cart/update',{itemId,quantity},{headers:{token}})
            }
            catch(error){
                console.log(error)
                toast.error(error.message)
            }
        }
    }
    const getUserCart=async(token)=>{
        try{
            const response=await axios.post(backendurl+'/api/cart/get',{},{headers:{token}})
            if(response.data.success){
                setCartItems(response.data.cartData)
            }

        }
        catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }
    const getProductsData=async()=>{
        try{
            const response =await axios.get(backendurl+'/api/product/list')
            // console.log(response.data)
            if(response.data.success){
                setBooks(response.data.product)

            }
            else{
                toast.error(response.data.message)
            }
        }
        catch(error){
            console.log(error)
            toast.error(error.message)

        }
    }
    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
        getProductsData()
    },[])

     
     
     const contextValue ={books,currency,navigate,token,setToken,cartItems,setCartItems,addToCart,getCartCount,getCartAmount,updateQuantity,delivery_charges,backendurl}

  return (
    <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider
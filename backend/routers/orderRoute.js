import express from "express"
import { allOrders, placeOrder, placeOrderStripe, UpdateStatus, userOrders, verifyStripe } from "../controllers/orderController.js"
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'



const orderRouter=express.Router()

orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,UpdateStatus)

orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)

orderRouter.post('/verifystripe',authUser,verifyStripe)
orderRouter.post('/userorders',authUser,userOrders)

export default orderRouter
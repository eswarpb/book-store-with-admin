import express from 'express'
import cors from 'cors'
import "dotenv/config"
import connectDB from './config/db.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routers/userRoute.js'
import productRouter from './routers/productRoute.js'
import cartRouter from './routers/cartRoute.js'
import orderRouter from './routers/orderRoute.js'



const app=express()
const port =process.env.PORT || 4000


app.use(express.json())
app.use(cors())
connectDB()
connectCloudinary()

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
    res.send('✅API success')
})

app.listen(port,()=>{
    console.log("✅server is run on: "+port)
})
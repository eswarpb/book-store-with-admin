import express from "express"
import { createProduct, deleteProduct, getAllProduct, getProductById } from "../controllers/productController.js"
import upload from "../middleware/multer.js"
import adminAuth from "../middleware/adminAuth.js"



const productRouter=express.Router()

productRouter.post('/create',adminAuth,upload.single("image"),createProduct)
productRouter.post('/delete',adminAuth,deleteProduct)
productRouter.post('/single',getProductById)
productRouter.get('/list',getAllProduct)


export default productRouter
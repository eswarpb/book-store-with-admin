import mongoose from "mongoose";


const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("✅database connected")
    }
    catch(error){
        console.log("❌databse failed to connect",error.message)

    }
}

export default connectDB
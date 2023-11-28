import mongoose from "mongoose";

export const connectToMongoDB = async() =>{
  try{
    await mongoose.connect('mongodb://127.0.0.1:27017/watchTrip', {
      useNewUrlParser: true
    });
  
    console.log('DB is connected...')
  }catch(error){
    console.log(error.message)
  }
}
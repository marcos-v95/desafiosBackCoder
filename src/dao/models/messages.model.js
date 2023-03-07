import mongoose from "mongoose";

const messagesModel= mongoose.Schema({
  id:{type:Number, required:true},
  user:{type:String, required:true},
  message:{type:String, required:true}
},{timestamps:true})

export default messagesModel
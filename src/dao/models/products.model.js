import mongoose from "mongoose";

const productsSchema= mongoose.Schema({
  id:{type:Number},
  title: {type:String, required:true, max:25},
  description: {type:String, required:true, max:150},
  code: {type:Number, required:true},
  price: {type:Number, required:true},
  stock: {type:Number, required:true, max:50},
  category: {type:String, required:true, max:50},
  thumbnail: {type:Array},
  status: {type:Boolean, default:true}
},{timestamps:true})

export default productsSchema
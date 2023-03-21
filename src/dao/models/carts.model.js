import mongoose from "mongoose";

const cartsModel=mongoose.Schema({
  // id:{type:Number},
  products:[{
    product:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'products'
    },
    quantity:{type:Number, required:true}
  }]
},{timestamps:true})

export default cartsModel
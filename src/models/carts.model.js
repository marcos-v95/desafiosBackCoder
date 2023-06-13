import mongoose from "mongoose";

const cartsCollection = 'carts';

const cartsSchema = mongoose.Schema({
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products'
    },
    quantity: { type: Number, required: true }
  }]
}, { timestamps: true })

export default mongoose.model(cartsCollection, cartsSchema)
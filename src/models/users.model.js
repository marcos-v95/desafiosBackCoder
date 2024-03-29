import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const usersCollection = 'users';

const usersSchema = mongoose.Schema({
  first_name: { type: String, required: true, maxLength: 30 },
  last_name: { type: String, required: true, maxLength: 30 },
  email: { type: String, required: true, max: 20 },
  age: { type: Number, min: 1, max: 150 },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'carts' },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  resetPassword: { type: String }
}, { timestamps: true })

// Mongoose Pagination
usersSchema.plugin(mongoosePaginate)

export default mongoose.model(usersCollection, usersSchema)
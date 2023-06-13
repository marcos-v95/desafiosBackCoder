import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const ticketsCollection = 'tickets';
const date = new Date().toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })

const ticketsSchema = mongoose.Schema({
  code: { type: String, required: true, default: uuidv4 },
  purchase_datetime: { type: String, default: date },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true }

})

export default mongoose.model(ticketsCollection, ticketsSchema)
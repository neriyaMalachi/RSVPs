import mongoose, { Document, Schema } from "mongoose";

export interface IGuest extends Document {
  name: string;
  email: string;
  phone: string;
  guests: number;
  attending: boolean;
  notes: string;
}

const GuestSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  guests: { type: Number, required: true },
  attending: { type: Boolean, required: true },
  notes: { type: String },
});
// , unique: true

export default mongoose.models.Guest ||
  mongoose.model<IGuest>("guest", GuestSchema);

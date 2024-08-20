import mongoose, { Document, Schema } from "mongoose";

// export interface IGuest extends Document {
//   name: string;
//   email: string;
//   phone: string;
//   guests: number;
//   attending: boolean;
//   notes: string;
// }

const GuestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  guests: { type: Number, required: true },
  attending: { type: Boolean },
  side: { type: String },
  notes: { type: String },
});

export default mongoose.models.Guest || mongoose.model("Guest", GuestSchema);

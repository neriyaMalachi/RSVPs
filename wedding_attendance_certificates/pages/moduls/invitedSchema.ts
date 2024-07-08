import mongoose, { Document, Model, Schema } from "mongoose";

const InvitedSchema = new mongoose.Schema({
  lastName: {
    type: String,
    required: false,
  },
  number: {
    type: Number,
    required: false,
  },
});
interface IInvited {
  lastName: string;
  number: number;
  required: false;
}

interface IPostDocument extends IInvited, Document {}
interface IPostModel extends Model<IPostDocument> {}

const InvitedModel: IPostModel = mongoose.model<IPostDocument>("invited", InvitedSchema);
export default InvitedModel;

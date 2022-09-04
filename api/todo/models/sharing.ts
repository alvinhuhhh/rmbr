import { Schema, model } from "mongoose";
import { ISharing } from "../types/sharing.types";

const sharingSchema = new Schema<ISharing>({
  createdDate: {
    type: Date,
    required: true,
  },
  updatedDate: {
    type: Date,
  },
  owner: {
    type: String,
    required: true,
  },
  users: [{ email: String }],
  listId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const Sharing = model<ISharing>("Sharing", sharingSchema);
export default Sharing;

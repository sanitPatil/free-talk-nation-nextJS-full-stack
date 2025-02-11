import mongoose, { Schema, Document, Types } from "mongoose";

export interface Reply extends Document {
  replyed_by: Types.ObjectId;
  replyed_to: Types.ObjectId;
}

const replySchema: Schema<Reply> = new Schema(
  {
    replyed_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    replyed_to: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  { timestamps: true }
);

const replyModel =
  (mongoose.models.Reply as mongoose.Model<Reply>) ||
  mongoose.model<Reply>("Reply", replySchema);

export default replyModel;

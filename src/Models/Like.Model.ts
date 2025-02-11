import mongoose, { Schema, Document, Types } from "mongoose";

export interface Like extends Document {
  likeed_by: Types.ObjectId;
  likeed_to: Types.ObjectId;
}

const likeSchema: Schema<Like> = new Schema(
  {
    likeed_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likeed_to: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const likeModel =
  (mongoose.models.Like as mongoose.Model<Like>) ||
  mongoose.model<Like>("Like", likeSchema);

export default likeModel;

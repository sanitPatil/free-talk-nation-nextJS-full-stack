import mongoose, { Schema, Document, Types } from "mongoose";

export interface Follow extends Document {
  followed_by: Types.ObjectId;
  followed_to: Types.ObjectId;
}

const followSchema: Schema<Follow> = new Schema(
  {
    followed_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    followed_to: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const followModel =
  (mongoose.models.Follow as mongoose.Model<Follow>) ||
  mongoose.model<Follow>("Follow", followSchema);

export default followModel;

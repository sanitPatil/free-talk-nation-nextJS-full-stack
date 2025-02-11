import mongoose, { Schema, Document } from "mongoose";

export interface Follow extends Document {
  followed_by: mongoose.Schema.Types.ObjectId;
  followed_to: mongoose.Schema.Types.ObjectId;
}

const followSchema: Schema<Follow> = new Schema(
  {
    followed_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    followed_to: {
      type: mongoose.Schema.Types.ObjectId,
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

import mongoose, { Schema, Document, Types } from "mongoose";

export interface Repost extends Document {
  reposted_by: Types.ObjectId;
  reposted_to: Types.ObjectId;
}

const repostSchema: Schema<Repost> = new Schema(
  {
    reposted_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reposted_to: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  { timestamps: true }
);

const repostModel =
  (mongoose.models.Repost as mongoose.Model<Repost>) ||
  mongoose.model<Repost>("Repost", repostSchema);

export default repostModel;

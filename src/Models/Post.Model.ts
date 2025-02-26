import mongoose, { Schema, Document, Types } from "mongoose";

export interface Post extends Document {
  owner: Types.ObjectId;
  title: string;
  description: string;
  file: string;
  file_public_id: string;
  // tags : id ->string
}

const PostSchema: Schema<Post> = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      requried: true,
    },
    description: {
      type: String,
      requried: true,
    },
    file: {
      type: String,
    },
    file_public_id: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const postModel =
  (mongoose.models.Post as mongoose.Model<Post>) ||
  mongoose.model<Post>("Post", PostSchema);

export default postModel;

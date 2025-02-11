import mongoose, { Schema, Document } from "mongoose";

export interface Post extends Document {
  onwer: mongoose.Types.ObjectId;
  title: string;
  description: string;
  // tags : id ->string
}

const PostSchema: Schema<Post> = new Schema(
  {
    onwer: {
      type: mongoose.Schema.Types.ObjectId,
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
  },
  {
    timestamps: true,
  }
);

const postModel =
  (mongoose.models.Post as mongoose.Model<Post>) ||
  mongoose.model("Post", PostSchema);

export default postModel;

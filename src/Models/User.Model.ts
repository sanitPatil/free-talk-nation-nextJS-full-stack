import mongoose, { Document, Schema, CallbackError } from "mongoose";
import bcrypt from "bcryptjs";

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: string;
  avatarPublicId?: string;

  coverImage?: string;
  coverImagePublicId?: string;
  validatePassword: (password: string) => boolean;
}

const UserSchema: Schema<User> = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: [true, "username must be unique!"],
      index: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "username must be unique!"],
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "please provide valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
    avatarPublicId: {
      type: String,
      default: "",
    },
    coverImage: {
      type: String,
      default: "",
    },
    coverImagePublicId: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre<User>(
  "save",
  async function (next: (error?: CallbackError) => void) {
    if (!this.isModified("password")) return next();
    try {
      this.password = await bcrypt.hash(this.password, 10);
      next();
    } catch (error: any) {
      console.log("error 61: ", error);
      next(error);
    }
  }
);

UserSchema.methods.validatePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};
const userModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default userModel;

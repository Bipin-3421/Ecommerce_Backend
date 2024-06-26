import mongoose, { Schema, Model, Document } from "mongoose";

interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export { User, IUser };

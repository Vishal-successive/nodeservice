import mongoose from "mongoose";
export interface IUserModel extends mongoose.Document {
  name: string;
  email: string;
}

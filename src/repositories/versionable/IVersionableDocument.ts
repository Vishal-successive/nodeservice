import mongoose from "mongoose";
export interface IVersionableDocument extends mongoose.Document {
  name: string;
  email: string;
  version: number;
}

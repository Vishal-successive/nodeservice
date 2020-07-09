import mongoose from "mongoose";
export const VersionableSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  version: Number,
});

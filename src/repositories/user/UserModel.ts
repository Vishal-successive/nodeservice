import mongoose from "mongoose";
import { UserSchema } from "./UserSchema";
import { IUserModel } from "./IUserModel";
export const User = mongoose.model<IUserModel>("User", UserSchema);

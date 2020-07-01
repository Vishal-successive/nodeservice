import { User } from "./UserModel";
export const create = async (obj) => {
  const user = new User(obj);
  const result = await user.save();
  console.log(result);
  return result;
};

export const readUser = async () => {
  const result = await User.find();
  console.log(result);
  return result;
};
export const userCount = async () => {
  const result = await User.countDocuments({});
  return result;
};

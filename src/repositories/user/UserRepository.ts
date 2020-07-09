import { User } from "./UserModel";

export const createUser = async (obj) => {
  const user = new User(obj);
  const result = await user.save();
  return result;
};
export const readUser = async (query, fields, options) => {
  const result = await User.find(query, fields, options);
  console.log(result);
  return result;
};

export const userCount = async () => {
  const result = await User.countDocuments({});
  return result;
};

export const readUserById = async (id) => {
  const result = await User.findById(id);
  console.log(result);
  return result;
};

export const deleteUserById = async (id) => {
  const result = await User.findByIdAndDelete(id);
  console.log(result);
  return result;
};

export const updateUserById = async (id, update) => {
  const result = await User.findByIdAndUpdate(id, update);
  return result;
};

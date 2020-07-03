import mongoose from "mongoose";
import { initialData } from "./seedData";
import { userCount } from "../repositories/user/UserRepository";
export default class Database {
  open(MONGO_URL) {
    mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    mongoose.connection.on("connected", () => {
      console.log("Mongoose default connection is open to ", MONGO_URL);
    });
    const countUser = async () => {
      const count = await userCount();
      if (count <= 0) {
        console.log("Seeding initial Data in Users...");
        initialData();
      }
    };
    countUser();

    mongoose.connection.on("error", (err) => {
      console.log("Mongoose default connection has occured " + err + " error");
    });
  }
  disconnect() {
    mongoose.connection.close();
  }
}

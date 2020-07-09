import bcrypt from "bcrypt";
import {
  readUser,
  userCount,
  readUserById,
  deleteUserById,
  createUser,
  updateUserById,
} from "../../repositories/user/UserRepository";
const saltRounds = 10;
export default class Controller {
  getTraineeById = async (req, res) => {
    try {
      const user = await readUserById(req.query.id);
      if (!user) {
        return res.status(404).json("User Not found");
      }
      return res.status(200).json(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  };

  updateTrainee = async (req, res) => {
    try {
      const { id, dataToUpdate } = req.body;
      const oldUserData = await updateUserById(id, dataToUpdate);
      if (!oldUserData) {
        return res.status(404).json("User Not Updated");
      }
      const newUserData = await readUserById(id);
      return res.status(200).json({
        PreviousData: oldUserData,
        UpdatedData: newUserData,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  };

  createTrainee = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const hash = await bcrypt.hash(password, saltRounds);
      const user = await createUser({
        name,
        email,
        password: hash,
      });
      if (!user) {
        return res.status(404).json("User Not Created");
      }

      console.log("Created", user);
      return res.status(200).json(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  };

  deleteTraineeById = async (req, res) => {
    try {
      const user = await deleteUserById(req.params.id);
      if (!user) return res.status(404).send("User Not found");
      return res.json({ DeletedData: user });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send(err.message);
    }
  };

  getAllTrainee = async (req, res) => {
    try {
      const skip = Number(req.query.skip);
      const limit = Number(req.query.limit);
      const trainee = await readUser(
        {},
        {},
        {
          skip,
          limit,
          sort: {
            name: "1",
          },
        }
      );

      const count = await userCount();

      return res.json({
        AllTrainees: trainee,
        TotalPages: Math.ceil(count / limit),
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send(err.message);
    }
  };
}

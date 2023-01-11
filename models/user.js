import sequelize from "../utils/db.js";
import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import { createToken } from "../utils/jwt.js";
config();
export class User extends Model {
  static async login(email, password) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error(`User with email ${email} does not exist`);
      }
      if (user.token) {
        throw new Error("User is already logged in");
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new Error("Password doesn't match");
      }
      user.token = createToken(user.uid);
      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }
  static async logout() {
    try {
      // const loggedOut=
    } catch (error) {}
  }
}
User.init(
  {
    uid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(30),
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,

      set(value) {
        this.setDataValue(
          "password",
          bcrypt.hashSync(value, +process.env.SALT_ROUNDS)
        );
      },
    },
    token: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
  },
  { sequelize, modelName: "User" }
);

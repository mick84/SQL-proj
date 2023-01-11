import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
export const createToken = (uid) => {
  return jwt.sign({ uid, randomData: Math.random() }, process.env.JWT_SECRET, {
    expiresIn: "12h",
  });
};

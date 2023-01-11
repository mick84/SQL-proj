import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import { createToken } from "../utils/jwt.js";
export const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    let user = await User.findOne({
      where: { email },
    });
    if (user) {
      throw new Error(`User with email ${email} already exists`);
    }
    user = await User.create({ email, password, role });
    const token = createToken(user.uid);
    await user.update({ token });
    req.userID = user.uid;
    res.status(201).json({ email, token });
  } catch (error) {
    //console.log(error.message);
    return res.status(409).send(error.message);
  }
};
export const logout = async (req, res) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new Error("Unauthorized request");
    }
    const [_, token] = authorization.split(" ");
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(uid);
    if (!user) {
      throw new Error("User does not exist");
    }
    if (user.token === "") {
      throw new Error("User is already logged out");
    }
    req.userID = null;
    user.token = "";
    await user.save();
    res.status(200).send("logged out successfully");
  } catch (error) {
    return res.status(409).send(error.message);
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    req.userID = user.uid;
    res.status(202).json({ email: user.email, token: user.token });
  } catch (error) {
    return res.status(403).send(error.message);
  }
};

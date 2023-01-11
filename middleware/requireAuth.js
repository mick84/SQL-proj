import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
export const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(401).send("authorization token required");

  const [_, token] = authorization.split(" ");
  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(uid);
    req.uid = user.uid;
    next();
  } catch (error) {
    return res.status(401).send("request is not authorized!");
  }
};

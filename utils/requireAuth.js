import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import { Op } from "sequelize";
export const requireAuth = async (req, res, next) => {
  //verify authentication
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(401).json({ error: "authorization token required" });

  const [_, token] = authorization.split(" ");
  try {
    const uid = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = await User.findOne({ where: { uid } });

    next();
  } catch (error) {
    return res.status(401).json({ error: "request is not authorized!" });
  }
};

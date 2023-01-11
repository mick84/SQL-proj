import { Router } from "express";
import { auth } from "./auth.js";
export const indexRoute = Router();
indexRoute.use("/auth", auth);
//indexRoute.use("/admin", admin);

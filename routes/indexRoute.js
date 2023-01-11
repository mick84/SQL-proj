import { Router } from "express";
import { auth } from "./auth.js";
import { lead } from "./lead.js";
export const indexRoute = Router();
indexRoute.use("/auth", auth);
indexRoute.use("/lead", lead);
//indexRoute.use("/admin", admin);

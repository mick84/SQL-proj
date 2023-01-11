import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { validateAuthBody } from "../middleware/validators.js";
import * as authCtrl from "../controllers/authCtrl.js";
export const auth = Router();
auth.post("/register", validateAuthBody, authCtrl.register);
auth.get("/logout", requireAuth, authCtrl.logout);
auth.post("/login", validateAuthBody, authCtrl.login);

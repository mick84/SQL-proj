import { Router } from "express";
import * as leadCtrl from "../controllers/leadCtrl.js";
import { requireAuth } from "../middleware/requireAuth.js";
import {
  validateLeadBody,
  validateLeadUpdateBody,
  validateLeadStatus,
} from "../middleware/validators.js";
import { LeadStatus } from "../models/leadStatus.js";
import { Lead } from "../models/leadTable.js";
import { Op } from "sequelize";
export const lead = Router();

lead.get("/", requireAuth, leadCtrl.getAllLeads);

lead.post("/", validateLeadBody, leadCtrl.createLead);
lead.post(
  "/status",
  requireAuth,
  validateLeadStatus,
  leadCtrl.findOrCreateLeadStatus
);
lead.patch("/status", requireAuth, validateLeadStatus, async (req, res) => {
  try {
    const { status_id, status_name } = req.body;
    const statusToUpdate = await LeadStatus.findOne({ where: { status_id } });
    if (!statusToUpdate) {
      throw {
        status: 404,
        message: `Status with id ${status_id} does not exist`,
      };
    }
    const result = await statusToUpdate.update({ status_name });
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 400).send(error.message);
  }
});
lead.patch("/:id", requireAuth, validateLeadUpdateBody, leadCtrl.updateLead);
lead.delete("/:id", requireAuth, leadCtrl.deleteLead);

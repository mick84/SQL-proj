import { Router } from "express";
import { Lead } from "../models/leadTable.js";
import { leadUpdateValidator, leadValidator } from "../utils/validators.js";
export const lead = Router();
lead.post("/", async (req, res) => {
  try {
    const validator = leadValidator(req.body);
    if (!validator.validate()) {
      const errorsObj = validator.errors().all();
      const message = Object.values(errorsObj).flat().join("\n");
      throw { message };
    }
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (error) {
    return res.status(409).send(error.message);
  }
});
lead.patch("/:id", async (req, res) => {
  try {
    const validator = leadUpdateValidator(req.body);
    if (!validator.validate()) {
      const errorsObj = validator.errors().all();
      const message = Object.values(errorsObj).flat().join("\n");
      throw { message };
    }

    const { id } = req.params;
    const lead = await Lead.findByPk(id);
    if (!lead) {
      throw new Error(`Lead wit id ${id} does not exist.`);
    }
    await lead.update(req.body);
    res.status(206).json(lead);
  } catch (error) {
    return res.status(409).send(error.message);
  }
});
lead.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const lead = await Lead.destroy({ where: { id } });
  if (lead === 0) {
    return res.status(404).send(`No lead with id ${id} exists to delete`);
  }
  res.status(200).send(`Lead with id ${id} was successfully deleted.`);
});

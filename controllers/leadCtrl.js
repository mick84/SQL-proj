import { Lead } from "../models/leadTable.js";
import { LeadStatus } from "../models/leadStatus.js";
import { Op } from "sequelize";
export const createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (error) {
    console.log(error);
    return res.status(409).send(error.message);
  }
};
export const updateLead = async (req, res) => {
  try {
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
};
export const deleteLead = async (req, res) => {
  const { id } = req.params;
  const result = await Lead.destroy({ where: { id } });
  if (result === 0) {
    return res.status(404).send(`No lead with id ${id} exists to delete`);
  }
  res.status(200).send(`Lead with id ${id} was successfully deleted.`);
};
export const findOrCreateLeadStatus = async (req, res) => {
  try {
    const { status_id, status_name } = req.body;
    let [status, created] = await LeadStatus.findOrCreate({
      where: { [Op.or]: [{ status_id }, { status_name }] },
      defaults: { status_id, status_name },
    });
    res.status(created ? 201 : 205).json(status);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
export const getAllLeads = async (req, res) => {
  try {
    const leadList = await Lead.findAll();
    const plain = leadList.map((ld) => ld.get({ plain: true }));
    res.status(200).json(plain);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

import { make, Password } from "simple-body-validator";
const authRules = {
  email: ["required", "email"],
  password: ["required", Password.create().min(8).mixedCase(1, 1).numbers(1)],
};
const leadRules = {
  name: ["required", "string"],
  phone: ["required", "string"],
  event_date: ["required", "string"],
  email: ["required", "string"],
  location: ["required", "string"],
};
const leadUpdateRules = {
  name: ["string"],
  phone: ["string"],
  event_date: ["string"],
  email: ["string"],
  location: ["string"],
};
const leadStatusRules = {
  status_id: ["required"],
  status_name: ["required", "string"],
};

const authValidator = (body) => make().setData(body).setRules(authRules);
const leadValidator = (body) => make().setData(body).setRules(leadRules);
const leadStatusValidator = (body) =>
  make().setData(body).setRules(leadStatusRules);
const leadUpdateValidator = (body) =>
  make().setData(body).setRules(leadUpdateRules);

export const validateLeadStatus = (req, res, next) => {
  const validator = leadStatusValidator(req.body);
  if (!validator.validate()) {
    const errorsObj = validator.errors().all();
    const message = Object.values(errorsObj).flat().join("\n");
    return res.status(400).send(message);
  }
  next();
};
export const validateAuthBody = (req, res, next) => {
  const validator = authValidator(req.body);
  if (!validator.validate()) {
    const errorsObj = validator.errors().all();
    const message = Object.values(errorsObj).flat().join("\n");
    return res.status(400).send(message);
  }
  next();
};
export const validateLeadBody = (req, res, next) => {
  const validator = leadValidator(req.body);
  if (!validator.validate()) {
    const errorsObj = validator.errors().all();
    const message = Object.values(errorsObj).flat().join("\n");
    return res.status(400).send(message);
  }
  next();
};
export const validateLeadUpdateBody = (req, res, next) => {
  const validator = leadUpdateValidator(req.body);
  if (!validator.validate()) {
    const errorsObj = validator.errors().all();
    const message = Object.values(errorsObj).flat().join("\n");
    return res.status(400).send(message);
  }
  next();
};

import { make, Password, requiredIf } from "simple-body-validator";
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
  leadStatus: ["required", "number"],
};
const leadUpdateRules = {
  name: ["string"],
  phone: ["string"],
  event_date: ["string"],
  email: ["string"],
  location: ["string"],
  leadStatus: ["number"],
};
export const authValidator = (body) => make().setData(body).setRules(authRules);
export const leadValidator = (body) => make().setData(body).setRules(leadRules);
export const leadUpdateValidator = (body) =>
  make().setData(body).setRules(leadUpdateRules);

import sequelize from "../utils/db.js";
import { DataTypes } from "sequelize";
export const LeadStatus = sequelize.define("LeadStatus", {
  status_id: {
    type: DataTypes.SMALLINT(1),
  },
  status_name: {
    type: DataTypes.STRING(20),
    collate: "utf8_unicode_ci",
  },
});

import sequelize from "../utils/db.js";
import { DataTypes, Model } from "sequelize";
export class LeadStatus extends Model {}
LeadStatus.init(
  {
    status_id: {
      type: DataTypes.SMALLINT(1),
    },
    status_name: {
      type: DataTypes.STRING(20),
      collate: "utf8_unicode_ci",
    },
  },
  { sequelize, modelName: "LeadStatus" }
);

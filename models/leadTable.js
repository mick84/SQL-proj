import sequelize from "../utils/db.js";
import { DataTypes, Model } from "sequelize";
export class Lead extends Model {}
Lead.init(
  {
    id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(20),
      collate: "utf8_unicode_ci",
    },
    phone: {
      type: DataTypes.STRING(20),
      collate: "utf8_unicode_ci",
    },
    event_date: {
      type: DataTypes.STRING(20),
      collate: "utf8_unicode_ci",
    },
    email: {
      type: DataTypes.STRING(20),
      collate: "utf8_unicode_ci",
    },
    location: {
      type: DataTypes.STRING(20),
      collate: "utf8_unicode_ci",
    },
    LeadStatus: {
      type: DataTypes.TINYINT(1),
      defaultValue: 1,
    },
  },
  { sequelize, modelName: "Lead" }
);

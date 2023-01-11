import Sequelize from "sequelize";
import { config } from "dotenv";
config();
const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  "root",
  process.env.MYSQL_PASSWORD,
  {
    dialect: "mysql",
    host: "localhost",
  }
);
export default sequelize;
//const sequelize = new Sequelize("internEx");

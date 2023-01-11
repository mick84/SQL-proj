import express from "express";
import cors from "cors";
import sequelize from "./utils/db.js";
import { indexRoute } from "./routes/indexRoute.js";

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", indexRoute);
sequelize
  .sync(/*{ force: true }*/)
  .then(() => {
    console.log("DB connected sucessfully");
    app.listen(PORT, () => {
      console.log(`App is working on port ${PORT}`);
    });
  })
  .catch(console.log);

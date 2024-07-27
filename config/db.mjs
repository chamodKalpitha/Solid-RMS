import { Sequelize } from "sequelize";
import configModule from "./config";

const env = process.env.NODE_ENV || "development";
const config = configModule[env];

const sequelize = new Sequelize();

export default sequelize;

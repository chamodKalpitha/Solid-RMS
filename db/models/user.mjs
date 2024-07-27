"use strict";
import { Model, Sequelize } from "sequelize";
import sequelize from "../../config/db.mjs";

export default sequelize.define(
  "users",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.ENUM,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    contact_no: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    deletedAt: {
      type: Sequelize.DATE,
    },
  },
  {
    paranoid: true, //enable soft delete
    freezeTableName: true,
    modelName: "user",
  }
);

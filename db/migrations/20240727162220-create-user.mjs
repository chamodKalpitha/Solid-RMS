"use strict";
/** @type {import('sequelize-cli').Migration} */
import Sequelize from "sequelize";

export const up = async (queryInterface) => {
  await queryInterface.createTable("user", {
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
  });
};

export const down = async (queryInterface) => {
  await queryInterface.dropTable("user");
};

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user2 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user2.init({
    name: DataTypes.STRING,
    role: DataTypes.ENUM,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    contact_no: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user2',
  });
  return user2;
};
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Branch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Branch.belongsTo(models.Province, {
        foreignKey: "provinceId",
      });
      Branch.belongsTo(models.City, {
        foreignKey: "cityId",
      });
    }
  }
  Branch.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.TEXT,
      },
      phoneNumber: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.BOOLEAN,
      },
      provinceId: {
        type: DataTypes.INTEGER,
      },
      cityId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Branch",
    }
  );
  return Branch;
};

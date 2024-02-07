"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Forwarder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Forwarder.belongsTo(models.Province, {
        foreignKey: "originProvince",
        as: "Origin"
      });
      Forwarder.belongsTo(models.Province, {
        foreignKey: "destinationProvince",
        as: "Destination"
      });
    }
  }
  Forwarder.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name is required",
          },
          notNull: {
            msg: "Name is required",
          },
        },
      },
      originProvince: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Origin Province is required",
          },
          notNull: {
            msg: "Origin Province is required",
          },
        },
      },
      destinationProvince: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Destination Province is required",
          },
          notNull: {
            msg: "Destination Province is required",
          },
        },
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Status is required",
          },
          notNull: {
            msg: "Status is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Forwarder",
    }
  );
  return Forwarder;
};

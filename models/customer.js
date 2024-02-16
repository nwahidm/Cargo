'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Customer.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Username is required",
        },
        notNull: {
          msg: "Username is required",
        },
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Phone Number is required",
        },
        notNull: {
          msg: "Phone Number is required",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Address is required",
        },
        notNull: {
          msg: "Address is required",
        },
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};
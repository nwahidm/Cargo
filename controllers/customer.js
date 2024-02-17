const { isEmpty, assign } = require("lodash");
const { Customer } = require("../models");
const { Op } = require("sequelize");

class CustomerController {
  static async create(req, res, next) {
    const { name, phoneNumber, email, address } = req.body;
    console.log("[CREATE CUSTOMER]", name, phoneNumber, email, address);
    try {
      await Customer.create({
        name,
        phoneNumber,
        email,
        address,
        status: true,
      });

      res.status(201).json({
        status: 201,
        message: "Berhasil Create Customer",
      });
    } catch (error) {
      next(error);
    }
  }

  static async fetchAllCustomer(req, res, next) {
    const { name } = req.body;
    console.log("[FETCH ALL CUSTOMER]", name);
    try {
      let where = {};
      if (!isEmpty(name)) assign(where, { name: { [Op.iLike]: `%${name}%` } });

      const [totalRecords, filteredRecords, customersData] = await Promise.all([
        Customer.count({}),
        Customer.count({ where }),
        Customer.findAll({ where }),
      ]);

      res.status(200).json({
        status: 200,
        data: {
          totalRecords,
          filteredRecords,
          customersData,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async fetchDetailCustomer(req, res, next) {
    const id = req.params.id;
    console.log("[FETCH DETAIL CUSTOMER]", id);
    try {
      const targetCustomer = await Customer.findByPk(id);

      if (isEmpty(targetCustomer)) throw { name: "InvalidCustomerId" };

      res.status(200).json({
        status: 200,
        data: targetCustomer,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateCustomer(req, res, next) {
    const id = req.params.id;
    const { name, phoneNumber, email, address, status } = req.body;
    console.log("[UPDATE CUSTOMER]", id, name, phoneNumber, email, address, status);
    try {
      const targetCustomer = await Customer.findByPk(id);

      if (isEmpty(targetCustomer)) throw { name: "InvalidCustomerId" };

      let payload = {};
      if (!isEmpty(name)) assign(payload, { name });
      if (!isEmpty(phoneNumber)) assign(payload, { phoneNumber });
      if (!isEmpty(email)) assign(payload, { email });
      if (!isEmpty(address)) assign(payload, { address });
      if (!isEmpty(status)) assign(payload, { status });

      await Customer.update(payload, { where: { id } });

      res.status(201).json({
        status: 201,
        message: `Berhasil Update Customer`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCustomer(req, res, next) {
    const id = req.params.id;
    console.log("[DELETE CUSTOMER]", id);
    try {
      const targetCustomer = await Customer.findByPk(id);

      if (isEmpty(targetCustomer)) throw { name: "InvalidCustomerId" };

      await Customer.destroy({ where: { id } });

      res.status(200).json({
        status: 200,
        message: "Berhasil Delete Customer",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CustomerController;

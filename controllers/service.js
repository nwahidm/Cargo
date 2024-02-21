const { isEmpty, assign } = require("lodash");
const { Service } = require("../models");
const { Op } = require("sequelize");

class ServiceController {
  static async create(req, res, next) {
    const { description } = req.body;
    console.log("[CREATE SERVICE]", description);
    try {
      await Service.create({
        description
      });

      res.status(201).json({
        status: 201,
        message: "Berhasil Create Service",
      });
    } catch (error) {
      next(error);
    }
  }

  static async fetchAllServices(req, res, next) {
    const { description } = req.body;
    console.log("[FETCH ALL SERVICES]", description);
    try {
      let where = {};
      if (!isEmpty(description)) assign(where, { description: { [Op.iLike]: `%${description}%` } });

      const [totalRecords, filteredRecords, ServicesData] = await Promise.all([
        Service.count({}),
        Service.count({ where }),
        Service.findAll({ where }),
      ]);

      res.status(200).json({
        status: 200,
        data: {
          totalRecords,
          filteredRecords,
          ServicesData,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async fetchDetailService(req, res, next) {
    const id = req.params.id;
    console.log("[FETCH DETAIL SERVICE]", id);
    try {
      const targetService = await Service.findByPk(id);

      if (isEmpty(targetService)) throw { name: "InvalidServiceId" };

      res.status(200).json({
        status: 200,
        data: targetService,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateService(req, res, next) {
    const id = req.params.id;
    const { description } = req.body;
    console.log("[UPDATE SERVICE]", id, description);
    try {
      const targetService = await Service.findByPk(id);

      if (isEmpty(targetService)) throw { name: "InvalidServiceId" };

      let payload = {};
      if (!isEmpty(description)) assign(payload, { description });

      await Service.update(payload, { where: { id } });

      res.status(201).json({
        status: 201,
        message: `Berhasil Update Service`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteService(req, res, next) {
    const id = req.params.id;
    console.log("[DELETE SERVICE]", id);
    try {
      const targetService = await Service.findByPk(id);

      if (isEmpty(targetService)) throw { name: "InvalidServiceId" };

      await Service.destroy({ where: { id } });

      res.status(200).json({
        status: 200,
        message: "Berhasil Delete Service",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ServiceController;

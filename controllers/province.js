const { isEmpty, assign } = require("lodash");
const { Province } = require("../models");

class ProvinceController {
  static async create(req, res, next) {
    const { name, status } = req.body;
    console.log("[CREATE PROVINCE]", name, status);
    try {
      await Province.create({
        name,
        status,
      });

      res.status(201).json({
        status: 201,
        message: "Berhasil Create Province",
      });
    } catch (error) {
      next(error);
    }
  }

  static async fetchAllProvinces(req, res, next) {
    console.log("[FETCH ALL Provinces]");
    try {
      const provinces = await Province.findAll({
        order: [["name", "ASC"]],
      });

      res.status(200).json({
        status: 200,
        data: provinces,
      });
    } catch (error) {
      next(error);
    }
  }

  static async fetchDetailProvince(req, res, next) {
    const id = req.params.id;
    console.log("[FETCH DETAIL PROVINCE]", id);
    try {
      const targetProvince = await Province.findByPk(id);

      if (isEmpty(targetProvince)) throw { name: "InvalidProvinceId" };

      res.status(200).json({
        status: 200,
        data: targetProvince,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateProvince(req, res, next) {
    const id = req.params.id;
    const { name, status } = req.body;
    console.log("[UPDATE PROVINCE]", id, name, status);
    try {
      const targetProvince = await Province.findByPk(id);

      if (isEmpty(targetProvince)) throw { name: "InvalidProvinceId" };

      let payload = {};
      if (!isEmpty(name)) assign(payload, { name });
      if (status) assign(payload, { status });

      await Province.update(payload, { where: { id } });

      res.status(201).json({
        status: 201,
        message: `Berhasil Update Province`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteProvince(req, res, next) {
    const id = req.params.id;
    console.log("[DELETE PROVINCE]", id);
    try {
      const targetProvince = await Province.findByPk(id);

      if (isEmpty(targetProvince)) throw { name: "InvalidProvinceId" };

      await Province.destroy({ where: { id } });

      res.status(200).json({
        status: 200,
        message: "Berhasil Delete Province",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProvinceController;

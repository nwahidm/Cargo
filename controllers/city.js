const { isEmpty, assign } = require("lodash");
const { City, Province } = require("../models");

class CityController {
  static async create(req, res, next) {
    const { name, provinceId, status } = req.body;
    console.log("[CREATE CITY]", name, provinceId, status);
    try {
      await City.create({
        name,
        provinceId,
        status,
      });

      res.status(201).json({
        status: 201,
        message: "Berhasil Create City",
      });
    } catch (error) {
      next(error);
    }
  }

  static async fetchAllCities(req, res, next) {
    console.log("[FETCH ALL CITIES]");
    try {
      const cities = await City.findAll({
        include: [{ model: Province }],
        order: [["name", "ASC"]],
      });

      res.status(200).json({
        status: 200,
        data: cities,
      });
    } catch (error) {
      next(error);
    }
  }

  static async fetchDetailCity(req, res, next) {
    const id = req.params.id;
    console.log("[FETCH DETAIL CITY]", id);
    try {
      const targetCity = await City.findByPk(id, {
        include: [{ model: Province }],
      });

      if (isEmpty(targetCity)) throw { name: "InvalidCityId" };

      res.status(200).json({
        status: 200,
        data: targetCity,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateCity(req, res, next) {
    const id = req.params.id;
    const { name, provinceId, status } = req.body;
    console.log("[UPDATE CITY]", id, name, provinceId, status);
    try {
      const targetCity = await City.findByPk(id);

      if (isEmpty(targetCity)) throw { name: "InvalidCityId" };

      let payload = {};
      if (!isEmpty(name)) assign(payload, { name });
      if (!isEmpty(provinceId)) assign(payload, { provinceId });
      if (!isEmpty(status)) assign(payload, { status });

      await City.update(payload, { where: { id } });

      res.status(201).json({
        status: 201,
        message: `Berhasil Update City`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCity(req, res, next) {
    const id = req.params.id;
    console.log("[DELETE CITY]", id);
    try {
      const targetCity = await City.findByPk(id);

      if (isEmpty(targetCity)) throw { name: "InvalidCityId" };

      await City.destroy({ where: { id } });

      res.status(200).json({
        status: 200,
        message: "Berhasil Delete City",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CityController;

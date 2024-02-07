const { isEmpty, assign } = require("lodash");
const { Province, Forwarder } = require("../models");

class ForwarderController {
  static async create(req, res, next) {
    const { name, originProvince, destinationProvince, status } = req.body;
    console.log(
      "[CREATE FORWARDER]",
      name,
      originProvince,
      destinationProvince,
      status
    );
    try {
      await Forwarder.create({
        name,
        originProvince,
        destinationProvince,
        status,
      });

      res.status(201).json({
        status: 201,
        message: "Berhasil Create Forwarder",
      });
    } catch (error) {
      next(error);
    }
  }

  static async fetchAllForwarders(req, res, next) {
    console.log("[FETCH ALL FORWARDERS]");
    try {
      const forwarders = await Forwarder.findAll({
        include: [
          { model: Province, as: "Origin" },
          { model: Province, as: "Destination" },
        ],
        order: [["name", "ASC"]],
      });

      res.status(200).json({
        status: 200,
        data: forwarders,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async fetchDetailForwarder(req, res, next) {
    const id = req.params.id;
    console.log("[FETCH DETAIL FORWARDER]", id);
    try {
      const targetForwarder = await Forwarder.findByPk(id, {
        include: [
          { model: Province, as: "Origin" },
          { model: Province, as: "Destination" },
        ],
      });

      if (isEmpty(targetForwarder)) throw { name: "InvalidForwarderId" };

      res.status(200).json({
        status: 200,
        data: targetForwarder,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateForwarder(req, res, next) {
    const id = req.params.id;
    const { name, originProvince, destinationProvince, status } = req.body;
    console.log(
      "[UPDATE FORWARDER]",
      id,
      name,
      originProvince,
      destinationProvince,
      status
    );
    try {
      const targetForwarder = await Forwarder.findByPk(id);

      if (isEmpty(targetForwarder)) throw { name: "InvalidForwarderId" };

      let payload = {};
      if (!isEmpty(name)) assign(payload, { name });
      if (!isEmpty(originProvince)) assign(payload, { originProvince });
      if (!isEmpty(destinationProvince))
        assign(payload, { destinationProvince });
      if (!isEmpty(status)) assign(payload, { status });

      await Forwarder.update(payload, { where: { id } });

      res.status(201).json({
        status: 201,
        message: `Berhasil Update Forwarder`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteForwarder(req, res, next) {
    const id = req.params.id;
    console.log("[DELETE FORWARDER]", id);
    try {
      const targetForwarder = await Forwarder.findByPk(id);

      if (isEmpty(targetForwarder)) throw { name: "InvalidForwarderId" };

      await Forwarder.destroy({ where: { id } });

      res.status(200).json({
        status: 200,
        message: "Berhasil Delete Forwarder",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ForwarderController;

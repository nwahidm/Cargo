const { isEmpty, assign } = require("lodash");
const { Branch, City, Province } = require("../models");

class BranchController {
  static async create(req, res, next) {
    const { name, address, phoneNumber, provinceId, cityId, status } = req.body;
    console.log("[CREATE BRANCH]", name, address, phoneNumber, provinceId, cityId, status);
    try {
      await Branch.create({
        name,
        address,
        phoneNumber,
        provinceId,
        cityId,
        status,
      });

      res.status(201).json({
        status: 201,
        message: "Berhasil Create Branch",
      });
    } catch (error) {
      next(error);
    }
  }

  static async fetchAllBranchs(req, res, next) {
    console.log("[FETCH ALL BRANCHS]");
    try {
      const branchs = await Branch.findAll({
        include: [{ model: Province }, { model: City }],
        order: [["name", "ASC"]],
      });

      res.status(200).json({
        status: 200,
        data: branchs,
      });
    } catch (error) {
      next(error);
    }
  }

  static async fetchDetailBranch(req, res, next) {
    const id = req.params.id;
    console.log("[FETCH DETAIL BRANCH]", id);
    try {
      const targetBranch = await Branch.findByPk(id, {
        include: [{ model: Province }, { model: City }],
      });

      if (isEmpty(targetBranch)) throw { name: "InvalidBranchId" };

      res.status(200).json({
        status: 200,
        data: targetBranch,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateBranch(req, res, next) {
    const id = req.params.id;
    const { name, address, phoneNumber, provinceId, cityId, status } = req.body;
    console.log("[UPDATE CITY]", id, name, address, phoneNumber, provinceId, cityId, status);
    try {
      const targetBranch = await Branch.findByPk(id);

      if (isEmpty(targetBranch)) throw { name: "InvalidBranchId" };

      let payload = {};
      if (!isEmpty(name)) assign(payload, { name });
      if (!isEmpty(address)) assign(payload, { address });
      if (!isEmpty(phoneNumber)) assign(payload, { phoneNumber });
      if (!isEmpty(provinceId)) assign(payload, { provinceId });
      if (!isEmpty(cityId)) assign(payload, { cityId });
      if (status) assign(payload, { status });

      await Branch.update(payload, { where: { id } });

      res.status(201).json({
        status: 201,
        message: `Berhasil Update Branch`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteBranch(req, res, next) {
    const id = req.params.id;
    console.log("[DELETE BRANCH]", id);
    try {
      const targetBranch = await Branch.findByPk(id);

      if (isEmpty(targetBranch)) throw { name: "InvalidBranchId" };

      await Branch.destroy({ where: { id } });

      res.status(200).json({
        status: 200,
        message: "Berhasil Delete Branch",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BranchController;

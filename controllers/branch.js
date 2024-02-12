const { isEmpty, assign } = require("lodash");
const { Branch, City, Province } = require("../models");
const { Op } = require("sequelize");

class BranchController {
  static async create(req, res, next) {
    const { name, address, phoneNumber, provinceId, cityId, status } = req.body;
    console.log(
      "[CREATE BRANCH]",
      name,
      address,
      phoneNumber,
      provinceId,
      cityId,
      status
    );
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
    const { name, provinceId, cityId, status } = req.body;
    console.log("[FETCH ALL BRANCHS]", name, provinceId, cityId, status);
    try {
      let where = {};
      if (!isEmpty(name)) assign(where, { name: { [Op.iLike]: `%${name}%` } });
      if (!isEmpty(provinceId)) assign(where, { provinceId });
      if (!isEmpty(cityId)) assign(where, { cityId });
      if (!isEmpty(status)) assign(where, { status });

      const [totalRecords, filteredRecords, branchsData] = await Promise.all([
        Branch.count({}),
        Branch.count({ where }),
        Branch.findAll({
          where,
          include: [{ model: Province }, { model: City }],
          order: [["name", "ASC"]],
        }),
      ]);

      res.status(200).json({
        status: 200,
        data: {
          totalRecords,
          filteredRecords,
          branchsData,
        },
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
    console.log(
      "[UPDATE CITY]",
      id,
      name,
      address,
      phoneNumber,
      provinceId,
      cityId,
      status
    );
    try {
      const targetBranch = await Branch.findByPk(id);

      if (isEmpty(targetBranch)) throw { name: "InvalidBranchId" };

      let payload = {};
      if (!isEmpty(name)) assign(payload, { name });
      if (!isEmpty(address)) assign(payload, { address });
      if (!isEmpty(phoneNumber)) assign(payload, { phoneNumber });
      if (!isEmpty(provinceId)) assign(payload, { provinceId });
      if (!isEmpty(cityId)) assign(payload, { cityId });
      if (!isEmpty(status)) assign(payload, { status });

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

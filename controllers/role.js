const { isEmpty, assign } = require("lodash");
const { Role } = require("../models");
const { Op } = require("sequelize");

class RoleController {
  static async create(req, res, next) {
    const { description } = req.body;
    console.log("[CREATE ROLE]", description);
    try {
      await Role.create({
        description
      });

      res.status(201).json({
        status: 201,
        message: "Berhasil Create Role",
      });
    } catch (error) {
      next(error);
    }
  }

  static async fetchAllRoles(req, res, next) {
    const { description } = req.body;
    console.log("[FETCH ALL ROLE]", description);
    try {
      let where = {};
      if (!isEmpty(description)) assign(where, { description: { [Op.iLike]: `%${description}%` } });

      const [totalRecords, filteredRecords, rolesData] = await Promise.all([
        Role.count({}),
        Role.count({ where }),
        Role.findAll({ where }),
      ]);

      res.status(200).json({
        status: 200,
        data: {
          totalRecords,
          filteredRecords,
          rolesData,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async fetchDetailRole(req, res, next) {
    const id = req.params.id;
    console.log("[FETCH DETAIL ROLE]", id);
    try {
      const targetRole = await Role.findByPk(id);

      if (isEmpty(targetRole)) throw { name: "InvalidRoleId" };

      res.status(200).json({
        status: 200,
        data: targetRole,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateRole(req, res, next) {
    const id = req.params.id;
    const { description } = req.body;
    console.log("[UPDATE ROLE]", id, description);
    try {
      const targetRole = await Role.findByPk(id);

      if (isEmpty(targetRole)) throw { name: "InvalidRoleId" };

      let payload = {};
      if (!isEmpty(description)) assign(payload, { description });

      await Role.update(payload, { where: { id } });

      res.status(201).json({
        status: 201,
        message: `Berhasil Update Role`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteRole(req, res, next) {
    const id = req.params.id;
    console.log("[DELETE ROLE]", id);
    try {
      const targetRole = await Role.findByPk(id);

      if (isEmpty(targetRole)) throw { name: "InvalidRoleId" };

      await Role.destroy({ where: { id } });

      res.status(200).json({
        status: 200,
        message: "Berhasil Delete Role",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RoleController;

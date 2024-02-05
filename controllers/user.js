const { isEmpty, assign } = require("lodash");
const { compareHash, hashPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async register(req, res, next) {
    const { username, password } = req.body;
    console.log("[CREATE USER]", username, password);
    try {
      const hashedPassword = hashPassword(password);
      await User.create({
        username,
        password: hashedPassword,
      });

      res.status(201).json({
        status: 201,
        message: "Berhasil Create User",
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    const { username, password } = req.body;
    console.log("[LOGIN USER]", username, password);
    try {
      const targetUser = await User.findOne({
        where: { username },
      });

      if (!targetUser) throw { name: "Invalid" };

      const isValid = compareHash(password, targetUser.password);
      if (!isValid) throw { name: "Invalid" };

      const access_token = signToken({ id: targetUser.id });
      delete targetUser.password;

      res.status(200).json({
        status: 200,
        data: {
          access_token,
          targetUser,
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async fetchAllUser(req, res, next) {
    console.log("[FETCH ALL USER]");
    try {
      const users = await User.findAll();

      res.status(200).json({
        status: 200,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }

  static async fetchDetailUser(req, res, next) {
    const id = req.params.id;
    console.log("[FETCH DETAIL USER]", id);
    try {
      const targetUser = await User.findByPk(id);

      if (isEmpty(targetUser)) throw { name: "InvalidUserId" };

      res.status(200).json({
        status: 200,
        data: targetUser,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    const id = req.params.id;
    const { username, password } = req.body;
    console.log("[UPDATE USER]", id, username, password);
    try {
      const targetUser = await User.findByPk(id);

      if (isEmpty(targetUser)) throw { name: "InvalidUserId" };

      let payload = {};
      if (!isEmpty(username)) assign(payload, { username });
      if (!isEmpty(password)) {
        const newPassword = hashPassword(password);
        assign(payload, { password: newPassword });
      }

      await User.update(payload, { where: { id } });

      res.status(201).json({
        status: 201,
        message: `Berhasil Update User`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    const id = req.params.id;
    console.log("[DELETE USER]", id);
    try {
      const targetUser = await User.findByPk(id);

      if (isEmpty(targetUser)) throw { name: "InvalidUserId" };

      await User.destroy({ where: { id } });

      res.status(200).json({
        status: 200,
        message: "Berhasil Delete User",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;

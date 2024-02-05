const { split } = require("lodash");
const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const indexHeaders = req.headers;
    const access_token = split(indexHeaders.authorization, " ")[1];

    if (!access_token) throw { name: "invalid_token" };

    const payload = verifyToken(access_token);
    const user = await User.findByPk(payload.id);
    if (!user) throw { name: "invalid_token" };

    req.user = {
      id: user.id,
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;

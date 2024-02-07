const errorHandler = (error, req, res, next) => {
  let code = 500;
  let message = "Internal Server Error";

  if (
    error.name == "SequelizeUniqueConstraintError" ||
    error.name == "SequelizeValidationError"
  ) {
    code = 400;
    message = error.errors[0].message;
  } else if (error.name == "Invalid") {
    code = 401;
    message = "Username / Password Salah";
  } else if (
    error.name == "invalid_token" ||
    error.name == "JsonWebTokenError"
  ) {
    code = 401;
    message = "Invalid Token";
  } else if (error.name == "InvalidUserId") {
    code = 404;
    message = "User Not Found";
  } else if (error.name == "InvalidProvinceId") {
    code = 404;
    message = "Province Not Found";
  } else if (error.name == "InvalidCityId") {
    code = 404;
    message = "City Not Found";
  } else if (error.name == "InvalidBranchId") {
    code = 404;
    message = "Branch Not Found";
  } else if (error.name == "InvalidForwarderId") {
    code = 404;
    message = "Forwarder Not Found";
  }

  res.status(code).json({ status: code, message });
};

module.exports = errorHandler;

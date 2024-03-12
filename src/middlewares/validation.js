const Validator = require("validatorjs");
const { ResponseData } = require("../helpers/ResponseHelper");
const { user: userModel, tier: tierModel } = require("../db/models/index");

const registerValidationRules = {
  nama: "required|string|max:50",
  role: "string|in:user,admin",
  username: "required|string|max:50",
  password: "required|string|min:8|alpha_num",
  confirmPassword: "required|same:password",
};

exports.registerValidation = async (request, response, next) => {
  try {
    const userData = {
      nama: request.body.nama,
      role: request.body.role,
      username: request.body.username,
      password: request.body.password,
      confirmPassword: request.body.confirmPassword,
    };

    const validate = new Validator(userData, registerValidationRules);

    if (validate.fails()) {
      const errorMessages = Object.values(validate.errors.errors)
        .flat()
        .join(", ")
        .split(", ");

      return response
        .status(400)
        .send(ResponseData(false, "Bad Request", errorMessages, null));
    }

    const existingUsername = await userModel.findOne({
      where: { username: userData.username },
    });

    if (existingUsername) {
      return response
        .status(400)
        .send(
          ResponseData(
            false,
            "Bad request",
            ["Username Sudah Digunakan"],
            null,
          ),
        );
    }

    next();
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .send(ResponseData(false, "", [error.message], null));
  }
};

const updateUserValidationRules = {
  nama: "string|max:50",
  role: "in:user,admin",
  username: "string|max:50",
  password: "string|min:8|alpha_num",
  confirmPassword: "required_with:password|string|same:password",
};

exports.updateUserValidation = async (request, response, next) => {
  try {
    const userData = {
      nama: request.body.nama,
      role: request.body.role,
      username: request.body.username,
      password: request.body.password,
      confirmPassword: request.body.confirmPassword,
    };

    const validate = new Validator(userData, updateUserValidationRules);

    if (validate.fails()) {
      const errorMessages = Object.values(validate.errors.errors).flat();

      return response
        .status(400)
        .send(ResponseData(false, "Bad Request", errorMessages, null));
    }

    next();
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .send(ResponseData(false, "", [error.message], null));
  }
};

const tierValidationRules = {
  harga: "required|numeric",
  nama: "required|string|max:50",
};

exports.tierValidation = async (request, response, next) => {
  try {
    const tierData = {
      harga: request.body.harga,
      nama: request.body.nama,
    };

    const validate = new Validator(tierData, tierValidationRules);

    if (validate.fails()) {
      const validationErrors = Object.values(validate.errors.errors)
        .flat()
        .join(", ")
        .split(", ");

      return response
        .status(400)
        .send(ResponseData(false, "Bad Request", validationErrors, null));
    }

    const existingName = await tierModel.findOne({
      where: { nama: tierData.nama },
    });

    if (existingName) {
      return response
        .status(400)
        .send(
          ResponseData(false, "Bad Request", ["Nama Sudah Digunakan"], null),
        );
    }

    next();
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .send(
        ResponseData(false, "Internal Server Error", [error.message], null),
      );
  }
};
const transactionValidationRules = {
  userID: "required|numeric",
  aplikasiID: "required|numeric",
  durasi: "required|numeric",
};

exports.transactionValidation = async (request, response, next) => {
  try {
    const transactionData = {
      userID: request.body.userID,
      aplikasiID: request.body.aplikasiID,
      durasi: request.body.durasi,
    };

    const validate = new Validator(transactionData, transactionValidationRules);

    if (validate.fails()) {
      const validationErrors = Object.values(validate.errors.errors)
        .flat()
        .join(", ")
        .split(", ");

      return response
        .status(400)
        .send(ResponseData(false, "Bad Request", validationErrors, null));
    }

    next();
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .send(
        ResponseData(false, "Internal Server Error", [error.message], null),
      );
  }
};

const topUpValidationRules = {
  saldo: "required|numeric",
};

exports.topUpValidation = async (request, response, next) => {
  try {
    const topUpData = {
      saldo: request.body.saldo,
    };

    const validate = new Validator(topUpData, topUpValidationRules);

    if (validate.fails()) {
      const validationErrors = Object.values(validate.errors.errors)
        .flat()
        .join(", ")
        .split(", ");

      return response
        .status(400)
        .send(ResponseData(false, "Bad Request", validationErrors, null));
    }

    next();
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .send(
        ResponseData(false, "Internal Server Error", [error.message], null),
      );
  }
};

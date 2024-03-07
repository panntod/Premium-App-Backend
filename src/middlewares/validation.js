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
      return response
        .status(400)
        .send(ResponseData(false, "Bad Request", validate.errors, null));
    }

    const existingUsername = await userModel.findOne({
      where: { username: userData.username },
    });

    if (existingUsername) {
      return response
        .status(400)
        .send(
          ResponseData(false, "Bad request", "Username Sudah Digunakan", null)
        );
    }

    next();
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .send(ResponseData(false, "", error.message, null));
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
      return response
        .status(400)
        .send(ResponseData(false, "Bad Request", validate.errors, null));
    }

    const existingName = await tierModel.findOne({
      where: { nama: tierData.nama },
    });

    if (existingName) {
      return response
        .status(400)
        .send(ResponseData(false, "Bad request", "Nama Sudah Digunakan", null));
    }

    next();
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .send(ResponseData(false, "", error.message, null));
  }
};

const transactionValidationRules = {
  userID: "required|numeric",
  aplikasiID: "required|numeric",
  qty: "required|numeric",
};

exports.transactionValidation = async (request, response, next) => {
  try {
    const transactionData = {
      userID: request.body.userID,
      aplikasiID: request.body.aplikasiID,
      qty: request.body.qty,
    };

    const validate = new Validator(transactionData, transactionValidationRules);

    if (validate.fails()) {
      return response
        .status(400)
        .send(ResponseData(false, "Bad Request", validate.errors, null));
    }

    next();
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .send(ResponseData(false, "", error.message, null));
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
      return response
        .status(400)
        .send(ResponseData(false, "Bad Request", validate.errors, null));
    }

    next();
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .send(ResponseData(false, "", error.message, null));
  }
};

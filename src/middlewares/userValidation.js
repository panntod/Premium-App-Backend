const Validator = require("validatorjs");
const { ResponseData } = require("../helpers/ResponseHelper");
const { user: userModel } = require("../db/models/index");
const { PasswordCompare } = require("../helpers/PasswordHelper");

const registerValidationRules = {
  nama: "required|string|max:50",
  role: "required|string|in:user,admin",
  username: "required|string|max:50",
  password: "required|string|min:8|alpha_num",
  confirmPassword: "required|same:password",
};

exports.registerValidation = async (req, res, next) => {
  try {
    const userData = {
      nama: req.body.nama,
      role: req.body.role,
      username: req.body.username,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    };

    const validate = new Validator(userData, registerValidationRules);

    if (validate.fails()) {
      return res
        .status(400)
        .send(ResponseData(false, "Bad Request", validate.errors, null));
    }

    const existingUsername = await userModel.findOne({
      where: { username: userData.username },
    });

    if (existingUsername) {
      return res
        .status(400)
        .send(
          ResponseData(false, "Bad request", "Username Sudah Digunakan", null)
        );
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send(ResponseData(false, "", error.message, null));
  }
};

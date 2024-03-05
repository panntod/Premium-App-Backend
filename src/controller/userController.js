const userModel = require(`../db/models/index`).user;
const { Op } = require(`sequelize`);
// const { GeneratePasswword, ComparePass } = require("../helpers/passhelper");
const { ResponseData } = require("../helpers/ResponseHelper");

exports.getAllUser = async (request, response) => {
  try {
    let users = await userModel.findAll();
    return response
      .status(200)
      .send(ResponseData(true, "Sukses mengambil seluruh user", null, users));
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

exports.findUser = async (request, response) => {
  try {
    let keyword = request.body.key;
    let users = await userModel.findAll({
      where: {
        [Op.or]: [
          { userID: { [Op.substring]: keyword } },
          { username: { [Op.substring]: keyword } },
          { nama: { [Op.substring]: keyword } },
          { role: { [Op.substring]: keyword } },
        ],
      },
    });
    return response
      .status(200)
      .send(ResponseData(true, "Sukses mengambil user", null, users));
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

exports.addUser = async (request, response) => {
  try {
    let newUser = {
      username: request.body.username,
      nama: request.body.nama,
      password: request.body.password,
      role: request.body.role,
    };

    await userModel.create(newUser);

    return response
      .status(201)
      .send(ResponseData(true, "Sukses membuat data user", null, newUser));
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

exports.updateUser = async (request, response) => {
  try {
    let userID = request.params.id;
    let newUser = {
      username: request.body.username,
      nama: request.body.nama,
      role: request.body.role,
    };
    await userModel.update(newUser, { where: { userID: userID } });
    return response
      .status(201)
      .send(ResponseData(true, "Sukses update data user", null, newUser));
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

exports.resetPassword = async (request, response) => {
  let { email, password, newPass } = request.body;
  try {
    const findUser = await userModel.findOne({
      where: { email: email },
    });
    if (!findUser) {
      return response
        .status(404)
        .send(ResponseData(false, "User tidak ditemukan", null, null));
    }

    const isValidPassword = await ComparePass(password, findUser.password);

    if (!isValidPassword) {
      return response
        .status(404)
        .send(ResponseData(false, "password gk vailid", null, null));
    }
    const hashedPass = await GeneratePasswword(newPass);
    const result = await userModel.update(
      { password: hashedPass },
      { where: { email: email } }
    );
    return response
      .status(201)
      .send(ResponseData(true, "Sukses update password", null, null));
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

exports.deleteUser = async (request, response) => {
  try {
    let userID = request.params.id;
    const result = await userModel.destroy({ where: { userID: userID } });
    if (!result) {
      return response
        .status(404)
        .send(ResponseData(false, "User tidak ditemukan", null, null));
    }
    return response
      .status(201)
      .send(ResponseData(true, "Sukses menghapus data user", null, null));
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

const { user: userModel } = require(`../db/models/index`);
const { Op } = require(`sequelize`);
const { ResponseData } = require("../helpers/ResponseHelper");
const { PasswordHashing } = require("../helpers/PasswordHelper");

exports.getAllUser = async (request, response) => {
  try {
    let users = await userModel.findAll();
    return response
      .status(200)
      .send(
        ResponseData(true, "Sukses mengambil seluruh data user", null, users),
      );
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

exports.findUser = async (request, response) => {
  try {
    let keyword = request.body.keyword;
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

    if (!users) {
      return response
        .status(404)
        .send(ResponseData(true, "User tidak ditemukan", null, null));
    }

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
    const newUser = {
      username: request.body.username,
      nama: request.body.nama,
      password: await PasswordHashing(request.body.password),
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

    if (request.body.password) {
      newUser = {
        password: await PasswordHashing(request.body.password),
      };
    }

    const existingUser = await userModel.findOne({
      where: { userID: userID },
    });

    if (!existingUser) {
      return response
        .status(404)
        .send(ResponseData(true, "User tidak ditemukan", null, null));
    }

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

exports.topUpSaldo = async (request, response) => {
  try {
    const username = request.params.username;
    const findUser = await userModel.findOne({ where: { username: username } });

    if (!findUser) {
      return response
        .status(404)
        .send(ResponseData(false, "User tidak ditemukan", null, null));
    }

    const currentSaldo = findUser.saldo || 0; 
    const additionalSaldo = parseFloat(request.body.saldo);

    if (isNaN(additionalSaldo) || additionalSaldo <= 0) {
      return response
        .status(400)
        .send(ResponseData(false, "Jumlah top up tidak valid", null, null));
    }

    const newSaldo = currentSaldo + additionalSaldo;

    await userModel.update(
      { saldo: newSaldo },
      { where: { username: username } },
    );

    return response
      .status(201)
      .send(ResponseData(true, "Sukses menambahkan saldo", null, null));
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};


exports.getMe = async (request, response) => {
  try {
    const usernameUser = request.body.username;

    if (!usernameUser) {
      return response
        .status(401)
        .send(ResponseData(false, "Parameter Harus Valid", null, null));
    }

    const findUser = await userModel.findOne({
      where: { username: usernameUser },
    });

    if (!findUser) {
      return response
        .status(401)
        .send(ResponseData(false, "Anda Belum Login", null, null));
    }

    const responseData = {
      userID: findUser.userID,
      username: findUser.username,
      nama: findUser.nama,
      saldo: findUser.saldo,
      role: findUser.role,
    };

    return response
      .status(201)
      .send(
        ResponseData(true, "Sukses menambahkan saldo user", null, responseData),
      );
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

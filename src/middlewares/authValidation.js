const { user: userModel } = require(`../db/models/index`);
const { PasswordCompare } = require("../helpers/PasswordHelper");
const {
  GenerateToken,
  ExtractToken,
  ResponseData,
} = require("../helpers/ResponseHelper");

exports.authentication = async (req, res) => {
  try {
    const { username, password } = req.body;

    const findUser = await userModel.findOne({
      where: { username: username },
    });

    if (!findUser) {
      return res
        .status(404)
        .send(ResponseData(false, "Username Tidak Ditemukan", null, null));
    }

    const matched = await PasswordCompare(password, findUser.password);

    if (!matched) {
      return res
        .status(400)
        .send(ResponseData(false, "Password Salah", null, null));
    }

    const dataUser = {
      id: findUser.userID,
      nama: findUser.nama,
      username: findUser.username,
      role: findUser.role,
    };

    const token = GenerateToken(dataUser);

    const responseData = {
      id: dataUser.id,
      nama_user: dataUser.nama_user,
      role: dataUser.role,
      username: dataUser.username,
      token: token
    };

    return res
      .status(200)
      .send(ResponseData(true, "Login Berhasil", null, responseData));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

exports.authorization = async (req, res, next) => {
  try {
    let authToken = req.headers.authorization;

    if (!authToken) {
      return res
        .status(404)
        .send(ResponseData(false, "Token Tidak Ditemukan", null, null));
    }

    let tokenKey = authToken.split(" ")[1];


    const decodedToken = ExtractToken(tokenKey);

    if (decodedToken.error) {
      return res
        .status(401)
        .send(
          ResponseData(
            false,
            decodedToken.error,
            null,
            null
          )
        );
    }

    if (!decodedToken) {
      return res
        .status(401)
        .send(ResponseData(false, "Unauthorized User", null, null));
    }

    res.locals.role = decodedToken?.role;
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

exports.adminOnly = (req, res, next) => {
  try {
    const userRole = res.locals.role;

    if (userRole !== "admin") {
      return res
        .status(403)
        .send(ResponseData(false, "Forbidden Access", null, null));
    }

    next();
  } catch (error) {
    next(error);
  }
};

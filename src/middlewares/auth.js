const { user: userModel } = require(`../db/models/index`);
const { PasswordCompare } = require("../helpers/PasswordHelper");
const {
  GenerateToken,
  ExtractToken,
  ResponseData,
} = require("../helpers/ResponseHelper");

exports.authentication = async (request, response) => {
  try {
    const { username, password } = request.body;

    const findUser = await userModel.findOne({
      where: { username: username },
    });

    if (!findUser) {
      return response
        .status(404)
        .send(ResponseData(false, "Username Tidak Ditemukan", null, null));
    }

    const matched = await PasswordCompare(password, findUser.password);

    if (!matched) {
      return response
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

    response.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none",
    });

    return response.status(200).send(
      ResponseData(true, "Login Berhasil", null, {
        ...dataUser,
        token: token,
      })
    );
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

exports.authorization = async (request, response, next) => {
  try {
    const tokenKey = request.cookies.token || request.headers.authorization?.split("Bearer ")[1];

    const decodedToken = ExtractToken(tokenKey);
    if (!decodedToken) {
      return response
        .status(401)
        .send(ResponseData(false, "Unauthorized User", null, null));
    }

    if (decodedToken.error) {
      return response
        .status(401)
        .send(ResponseData(false, decodedToken.error, null, null));
    }

    response.locals.role = decodedToken.role;
    next();
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

exports.adminOnly = (_, response, next) => {
  try {
    const userRole = response.locals.role;

    if (userRole !== "admin") {
      return response
        .status(403)
        .send(ResponseData(false, "Forbidden Access", null, null));
    }

    next();
  } catch (error) {
    next(error);
  }
};

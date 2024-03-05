const userModel = require(`..db/models/index`).user;
const { Op } = require(`sequelize`);
const { GeneratePasswword, ComparePass } = require("../helpers/passhelper");

exports.getAllUser = async (request, response) => {
  /** call findAll() to get all data */
  let users = await userModel.findAll();
  return response.json({
    success: true,
    data: users,
    message: `All users have been loaded`,
  });
};

exports.findUser = async (request, response) => {
  /** define keyword to find data */
  let keyword = request.body.key;
  /** call findAll() within where clause and operation
   * to find data based on keyword */
  let users = await userModel.findAll({
    where: {
      [Op.or]: [
        { userID: { [Op.substring]: keyword } },
        { firstname: { [Op.substring]: keyword } },
        { lastname: { [Op.substring]: keyword } },
        { email: { [Op.substring]: keyword } },
        { role: { [Op.substring]: keyword } },
      ],
    },
  });
  return response.json({
    success: true,
    data: users,
    message: `All Users have been loaded`,
  });
};

exports.addUser = async (request, response) => {
  let newUser = {
    username: request.body.username,
    nama: request.body.nama,
    password: request.body.password,
    role: request.body.role,
  };
  userModel
    .create(newUser)
    .then((result) => {
      return response.json({
        success: true,
        data: result,
        message: `New user has been inserted`,
      });
    })
    .catch((error) => {
      /** if insert's process fail */
      return response.json({
        success: false,
        message: error.message,
      });
    });
};

exports.updateUser = (request, response) => {
  let dataUser = {
    firstname: request.body.firstname,
    lastname: request.body.lastname,
    email: request.body.email,
    role: request.body.role,
  };
  let userID = request.params.id;
  userModel
    .update(dataUser, { where: { userID: userID } })
    .then((result) => {
      return response.json({
        success: true,
        message: `Data user has been updated`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};

exports.updatePassAdmin = async (request, response) => {
  let newPass = md5(request.body.newPass);
  let userID = request.params.id;
  userModel
    .update({ password: newPass }, { where: { userID: userID } })
    .then((result) => {
      return response.json({
        success: true,
        result: result,
        message: `Password has been updated`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};

exports.updatePass = async (request, response) => {
  let { email, password, newPass } = request.body;
  try {
    const findUser = await userModel.findOne({
      where: { email: email },
    });
    if (!findUser) {
      return response.status(404).json({
        success: false,
        status: result,
        message: "user gk ada",
      });
    }

    const isValidPassword = await ComparePass(password, findUser.password);

    if (!isValidPassword) {
      return response.status(401).json({
        success: false,
        status: "unauthorized",
        message: "wrong",
      });
    }
    const hashedPass = await GeneratePasswword(newPass);
    const result = await userModel.update(
      { password: hashedPass },
      { where: { email: email } }
    );
    return response.status(201).json({
      success: true,
      message: "updated",
    });
  } catch (error) {
    return response.json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteUser = (request, response) => {
  /** define id user that will be update */
  let userID = request.params.id;
  /** execute delete data based on defined id user */
  userModel
    .destroy({ where: { userID: userID } })
    .then((result) => {
      /** if update's process success */
      return response.json({
        success: true,
        message: `Data user has been deleted`,
      });
    })
    .catch((error) => {
      /** if update's process fail */
      return response.json({
        success: false,
        message: error.message,
      });
    });
};

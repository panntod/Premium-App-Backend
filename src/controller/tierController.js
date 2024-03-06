const tierModel = require("../db/models/index").tier;
const { ResponseData } = require("../helpers/ResponseHelper");

exports.getAllTier = async (request, response) => {
  try {
    let tiers = await tierModel.findAll();
    return response
      .status(200)
      .send(ResponseData(true, "Successfully accessed all tiers", null, tiers));
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

exports.findTier = async (request, response) => {
  try {
    let keyword = request.params.tierID;
    let tiers = await tierModel.findAll({
      where: {
        tierID: keyword,
      },
    });
    return response
      .status(200)
      .send(ResponseData(true, "Sukses mengambil user", null, tiers));
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

exports.addTier = async (request, response) => {
  try {
    let newTier = {
      harga: request.body.harga,
      nama: request.body.nama,
    };

    await tierModel.create(newTier);

    return response
      .status(201)
      .send(ResponseData(true, "Sukses membuat data tier", null, newTier));
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

exports.updateTier = async (request, response) => {
  try {
    let tierID = request.params.id;
    let newTier = {
      nama: request.body.nama,
      harga: request.body.harga,
    };
    await tierModel.update(newTier, { where: { tierID: tierID } });
    return response
      .status(201)
      .send(ResponseData(true, "Sukses update data user", null, newTier));
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

exports.deleteTier = async (request, response) => {
  try {
    let tierID = request.params.id;
    const result = await tierModel.destroy({ where: { tierID: tierID } });
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

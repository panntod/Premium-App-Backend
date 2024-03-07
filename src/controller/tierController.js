const { tier: tierModel } = require("../db/models/index");
const { ResponseData } = require("../helpers/ResponseHelper");

exports.getAllTier = async (request, response) => {
  try {
    let tiers = await tierModel.findAll();
    return response
      .status(200)
      .send(
        ResponseData(true, "Sukses mengambil seluruh data tier", null, tiers)
      );
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

exports.findTier = async (request, response) => {
  try {
    let tierID = request.params.tierID;
    let tiers = await tierModel.findAll({
      where: {
        tierID: tierID,
      },
    });
    return response
      .status(200)
      .send(ResponseData(true, "Sukses mendapatkan data tier", null, tiers));
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
    const findTier = await tierModel.findOne({ where: { tierID: tierID } });

    if (!findTier) {
      return response
        .status(404)
        .send(ResponseData(true, "Tier data tidak ditemukan", null, null));
    }

    await tierModel.update(newTier, { where: { tierID: tierID } });
    return response
      .status(201)
      .send(ResponseData(true, "Sukses update data tier", null, newTier));
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
        .send(ResponseData(false, "Tier tidak ditemukan", null, null));
    }
    return response
      .status(201)
      .send(ResponseData(true, "Sukses menghapus data tier", null, null));
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

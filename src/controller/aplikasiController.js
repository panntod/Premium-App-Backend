const aplikasiModel = require("../db/models/index").aplikasi;
const { ResponseData } = require("../helpers/ResponseHelper");
const path = require("path");
const fs = require("fs");
const upload = require("./uploadImage").single(`image`);

exports.getAllApp = async (request, response) => {
  try {
    let apps = await aplikasiModel.findAll();
    return response
      .status(200)
      .send(
        ResponseData(true, "Sukses mengambil seluruh aplikasi", null, apps)
      );
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

exports.addAplikasi = async (request, response) => {
  try {
    upload(request, response, async (error) => {
      if (error) {
        return response.json({ message: error });
      }
      if (!request.file) {
        return response.json({
          message: `image isnt feels right`,
        });
      }

      let newApp = {
        nama: request.body.nama,
        id_tier: request.body.id_tier,
        image: request.file.filename,
        deskripsi: request.body.deskripsi,
      };

      await aplikasiModel.create(newApp);

      return response
        .status(201)
        .send(ResponseData(true, "Sukses membuat data user", null, newApp));
    });
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

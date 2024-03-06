const {
  aplikasi: aplikasiModel,
  tier: tierModel,
} = require("../db/models/index");
const { Op } = require(`sequelize`);
const { ResponseData } = require("../helpers/ResponseHelper");
const path = require("path");
const fs = require("fs");
const upload = require("./uploadImage").single(`image`);

exports.getAllApp = async (request, response) => {
  try {
    const appsWithTiers = await aplikasiModel.findAll({
      include: {
        model: tierModel,
        as: "tierAplikasi",
      },
    });
    return response
      .status(200)
      .send(
        ResponseData(
          true,
          "Sukses mengambil seluruh aplikasi",
          null,
          appsWithTiers
        )
      );
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

exports.findApp = async (request, response) => {
  try {
    let keyword = request.body.keyword;
    let aplikasi = await aplikasiModel.findAll({
      where: {
        [Op.or]: [
          { aplikasiID: { [Op.substring]: keyword } },
          { nama: { [Op.substring]: keyword } },
        ],
      },
    });

    if (!aplikasi) {
      return response
        .status(404)
        .send(ResponseData(true, "app tidak ditemukan", null, null));
    }
    return response
      .status(200)
      .send(ResponseData(true, "Sukses mengambil app", null, aplikasi));
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
        return response
          .status(500)
          .send(ResponseData(false, "gambar tidak masuk", error, null));
      }

      let newApp = {
        nama: request.body.nama,
        tierID: request.body.tierID,
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

exports.updateAplikasi = async (request, response) => {
  try {
    upload(request, response, async (error) => {
      if (error) {
        return response
          .status(500)
          .send(ResponseData(false, error.message, error, null));
      }
      let aplikasiID = request.params.id;
      let dataApp = {
        nama: request.body.nama,
        tierID: request.body.tierID,
        deskripsi: request.body.deskripsi,
      };
      if (request.file) {
        const selectedApp = await aplikasiModel.findOne({
          where: { aplikasiID: aplikasiID },
        });
        const oldImage = selectedApp.image;
        const pathImage = path.join(__dirname, `../images`, oldImage);
        if (fs.existsSync(pathImage)) {
          fs.unlink(pathImage, (error) => console.log(error));
        }
        dataApp.image = request.file.filename;
      }
      await aplikasiModel.update(dataApp, {
        where: { aplikasiID: aplikasiID },
      });
      return response
        .status(201)
        .send(ResponseData(true, "Sukses membuat data user", null, dataApp));
    });
  } catch (error) {
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

exports.deleteAplikasi = async (request, response) => {
  try {
    const appID = request.params.id;
    const app = await aplikasiModel.findOne({ where: { aplikasiID: appID } });
    const oldImage = app.image;
    const pathImage = path.join(__dirname, `../images`, oldImage);
    if (fs.existsSync(pathImage)) {
      fs.unlink(pathImage, (error) => console.log(error));
    }
    await aplikasiModel.destroy({ where: { aplikasiID: appID } });
    return response
      .status(201)
      .send(ResponseData(true, "Sukses delete data", null, null));
  } catch (error) {
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

const {
  aplikasi: aplikasiModel,
  tier: tierModel,
  transaksi: transaksiModel,
} = require("../db/models/index");
const { Op } = require(`sequelize`);
const { ResponseData } = require("../helpers/ResponseHelper");
const path = require("path");
const fs = require("fs").promises;
const upload = require("./uploadImage").single(`image`);

exports.getAllApp = async (request, response) => {
  try {
    const dataApp = await aplikasiModel.findAll({
      include: {
        model: tierModel,
        as: "tierAplikasi",
      },
    });

    const formattedData = dataApp.map((app) => ({
      nama: app.nama,
      image: app.image,
      deskripsi: app.deskripsi,
      tier: app.tierAplikasi.nama,
      harga: app.tierAplikasi.harga,
    }));

    return response
      .status(200)
      .send(
        ResponseData(
          true,
          "Sukses mengambil seluruh aplikasi",
          null,
          formattedData
        )
      );
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

exports.findApp = async (request, response) => {
  try {
    let keyword = request.body.keyword;
    let dataAplikasi = await aplikasiModel.findAll({
      where: {
        [Op.or]: [
          { aplikasiID: { [Op.substring]: keyword } },
          { nama: { [Op.substring]: keyword } },
        ],
      },
      include: {
        model: tierModel,
        as: "tierAplikasi",
      },
    });

    if (!dataAplikasi) {
      return response
        .status(404)
        .send(ResponseData(true, "Aplikasi tidak ditemukan", null, null));
    }

    const formattedData = dataAplikasi.map((app) => ({
      nama: app.nama,
      image: app.image,
      deskripsi: app.deskripsi,
      tier: app.tierAplikasi.nama,
      harga: app.tierAplikasi.harga,
    }));

    return response
      .status(200)
      .send(ResponseData(true, "Sukses mengambil app", null, formattedData));
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
        return response
          .status(500)
          .send(ResponseData(false, error.message, error, null));
      }

      if (!request.file) {
        return response
          .status(500)
          .send(ResponseData(false, "Gambar tidak ditemukan", error, null));
      }

      let newApp = {
        nama: request.body.nama,
        tierID: request.body.tierID,
        image: request.file.filename,
        deskripsi: request.body.deskripsi,
      };

      const tierAplikasi = await tierModel.findOne({
        where: { tierID: newApp.tierID },
      });

      if (!tierAplikasi) {
        return response
          .status(404)
          .send(ResponseData(false, "Tier tidak ditemukan", null, null));
      }

      await aplikasiModel.create(newApp);

      return response
        .status(201)
        .send(ResponseData(true, "Sukses membuat data aplikasi", null, newApp));
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

      const aplikasiID = request.params.id;
      const newApp = {
        nama: request.body.nama,
        tierID: request.body.tierID,
        deskripsi: request.body.deskripsi,
      };

      const selectedApp = await aplikasiModel.findOne({
        where: { aplikasiID: aplikasiID },
      });

      if (!selectedApp) {
        return response
          .status(404)
          .send(ResponseData(false, "Aplikasi tidak ditemukan", null, null));
      }

      if (request.file) {
        if (selectedApp) {
          const oldImage = selectedApp.image;
          const pathImage = path.join(__dirname, "../images", oldImage);

          try {
            await fs.unlink(pathImage);
          } catch (error) {
            console.error("Error deleting old image:", error);
          }

          newApp.image = request.file.filename;
        }
      } 

      if (!newApp.tierID) {
        newApp.tierID = selectedApp.tierID;
      }

      const tierAplikasi = await tierModel.findOne({
        where: { tierID: newApp.tierID },
      });

      if (!tierAplikasi) {
        return response
          .status(404)
          .send(ResponseData(false, "Tier tidak ditemukan", null, null));
      }

      await aplikasiModel.update(newApp, {
        where: { aplikasiID: aplikasiID },
      });

      return response
        .status(201)
        .send(ResponseData(true, "Sukses membuat data aplikasi", null, newApp));
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

exports.getStatistik = async (request, response) => {
  try {
    const dataApp = await aplikasiModel.findAll();
    const dataTransaksi = await transaksiModel.findAll();

    const responseData = {
      statistikApp: dataApp.length,
      statistikTransaksi: dataTransaksi.length,
    };

    response
      .status(200)
      .send(
        ResponseData(true, "Sukses Mendapatkan Statistik", null, responseData)
      );
  } catch (error) {
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

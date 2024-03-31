const {
  user: userModel,
  aplikasi: aplikasiModel,
  transaksi: transaksiModel,
  detail_transaksi: detailTransaksiModel,
} = require("../db/models/index");
const { Op } = require(`sequelize`);
const { ResponseData } = require("../helpers/ResponseHelper");
const uploadImage = require("./uploadImage").single(`image`);
const fs = require("fs").promises;
const path = require("path");

exports.getAllApp = async (_, response) => {
  try {
    const dataApp = await aplikasiModel.findAll();

    return response
      .status(200)
      .send(
        ResponseData(true, "Sukses mengambil seluruh aplikasi", null, dataApp)
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
          { harga: { [Op.substring]: keyword } },
        ],
      },
    });

    if (!dataAplikasi.length) {
      return response
        .status(404)
        .send(ResponseData(true, "Aplikasi tidak ditemukan", null, null));
    }

    return response
      .status(200)
      .send(ResponseData(true, "Sukses mengambil app", null, dataAplikasi));
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

exports.findAppByID = async (request, response) => {
  try {
    let paramsID = request.params.aplikasiID;
    let dataAplikasi = await aplikasiModel.findOne({
      where: { aplikasiID: paramsID },
    });

    if (!dataAplikasi) {
      return response
        .status(404)
        .send(ResponseData(true, "Aplikasi tidak ditemukan", null, null));
    }

    return response
      .status(200)
      .send(ResponseData(true, "Sukses mengambil app", null, dataAplikasi));
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

exports.addAplikasi = async (request, response) => {
  try {
    uploadImage(request, response, async (error) => {
      if (error)
        return response
          .status(500)
          .send(ResponseData(false, error.message, error, null));

      if (!request.file) {
        return response
          .status(500)
          .send(ResponseData(false, "Gambar tidak ditemukan", error, null));
      }

      let newApp = {
        nama: request.body.nama,
        harga: request.body.harga,
        image: request.file.filename,
        deskripsi: request.body.deskripsi,
      };

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
    uploadImage(request, response, async (error) => {
      if (error)
        return response
          .status(500)
          .send(ResponseData(false, error.message, error, null));

      const appID = request.params.id;
      const newApp = {
        nama: request.body.nama,
        harga: request.body.harga,
        deskripsi: request.body.deskripsi,
      };

      const selectedApp = await aplikasiModel.findOne({
        where: { aplikasiID: appID },
      });

      if (!selectedApp)
        return response
          .status(404)
          .send(ResponseData(false, "Aplikasi tidak ditemukan", null, null));

      if (request.file) {
        if (selectedApp) {
          const oldImage = selectedApp.image;
          const pathImage = path.join(__dirname, "../images", oldImage);

          try {
            await fs.unlink(pathImage);
          } catch (error) {
            console.error("Gagal menghapus image:", error);
          }

          newApp.image = request.file.filename;
        }
      }

      await aplikasiModel.update(newApp, { where: { aplikasiID: appID } });

      const existingDetailTransaksi = await detailTransaksiModel.findAll({
        where: { aplikasiID: appID },
        include: {
          model: transaksiModel,
          as: "detailTransaksi",
        },
      });

      existingDetailTransaksi.forEach(async (existingDetail) => {
        const status = existingDetail.detailTransaksi.status;
        const updatedTotalHarga = existingDetail.durasi * newApp.harga;

        if (status === "draft") {
          await detailTransaksiModel.update(
            { harga: newApp.harga, total_harga: updatedTotalHarga },
            { where: { detail_transaksiID: existingDetail.detail_transaksiID } }
          );
        }
      });

      return response
        .status(201)
        .send(ResponseData(true, "Sukses memperbarui data aplikasi", null, newApp));
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
    const dataApp = await aplikasiModel.findOne({
      where: { aplikasiID: appID },
    });

    if (!dataApp) {
      return response
        .status(404)
        .send(ResponseData(true, "Aplikasi tidak ditemukan", null, null));
    }

    const oldImage = dataApp.image;
    const pathImage = path.join(__dirname, `../images`, oldImage);

    await aplikasiModel.destroy({ where: { aplikasiID: appID } });

    try {
      await fs.access(pathImage);
      await fs.unlink(pathImage);
      console.log(`File ${pathImage} dihapus.`);
    } catch (error) {
      console.error(`Gagal menghapus file ${pathImage}.`, error);
    }

    return response
      .status(201)
      .send(ResponseData(true, "Sukses delete data", null, null));
  } catch (error) {
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

exports.getStatistik = async (_, response) => {
  try {
    const dataUser = await userModel.findAll();
    const dataApp = await aplikasiModel.findAll();
    const dataTransaksi = await transaksiModel.findAll();

    const responseData = {
      statistikUser: dataUser.length,
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

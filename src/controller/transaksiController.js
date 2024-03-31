const {
  transaksi: transaksiModel,
  detail_transaksi: detailTransaksiModel,
  user: userModel,
  aplikasi: aplikasiModel,
} = require("../db/models/index");
const { ResponseData } = require("../helpers/ResponseHelper");
const { Op } = require("sequelize");
exports.addTransaksi = async (request, response) => {
  try {
    const existingAplikasi = await aplikasiModel.findOne({
      where: { aplikasiID: request.body.aplikasiID },
    });

    if (!existingAplikasi) {
      return response
        .status(404)
        .send(ResponseData(false, "Aplikasi tidak ditemukan", null, null));
    }

    const existingUser = await userModel.findOne({
      where: { userID: request.body.userID },
    });

    if (!existingUser) {
      return response
        .status(404)
        .send(ResponseData(false, "User tidak ditemukan", null, null));
    }

    const newTransaksi = {
      userID: existingUser.userID,
      aplikasiID: existingAplikasi.aplikasiID,
    };

    const transaksiNew = await transaksiModel.create(newTransaksi);

    const aplikasiID = transaksiNew?.aplikasiID;

    const aplikasiData = await aplikasiModel.findOne({
      where: { aplikasiID: aplikasiID },
    });

    const newDetailTransaksi = {
      transaksiID: transaksiNew?.transaksiID,
      aplikasiID: aplikasiData?.aplikasiID,
      harga: aplikasiData ? aplikasiData.harga : 0,
      durasi: request.body.durasi,
      total_harga:
        (aplikasiData ? aplikasiData.harga : 0) * request.body.durasi,
    };

    console.log(newDetailTransaksi);

    const result = await detailTransaksiModel.create(newDetailTransaksi);

    return response
      .status(201)
      .send(ResponseData(true, "Sukses menambah data transaksi", null, result));
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};
exports.getAllTransaksi = async (_, response) => {
  try {
    const dataTransaksi = await transaksiModel.findAll({
      include: [
        {
          model: userModel,
          as: "userTransaksi",
        },
        {
          model: detailTransaksiModel,
          as: "detailTransaksi",
        },
        {
          model: aplikasiModel,
          as: "aplikasiTransaksi",
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const formatData = dataTransaksi.map((data) => ({
      transaksiID: data.transaksiID,
      tgl: data.tgl,
      status: data.status,
      userID: data.userTransaksi.userID,
      username: data.userTransaksi.username,
      detailTransaksiID: data.detailTransaksi.detail_transaksiID,
      harga: data.detailTransaksi.harga,
      durasi: data.detailTransaksi.durasi,
      totalHarga: data.detailTransaksi.total_harga,
      aplikasiID: data.aplikasiTransaksi.aplikasiID,
      namaApp: data.aplikasiTransaksi.nama,
      hargaApp: data.aplikasiTransaksi.harga,
      deskripsiApp: data.aplikasiTransaksi.deskripsi,
    }));

    return response
      .status(200)
      .send(
        ResponseData(
          true,
          "Sukses mendapatkan semua data transaksi",
          null,
          formatData
        )
      );
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

exports.getTransaksiById = async (request, response) => {
  try {
    const userID = request.params.userID;
    const dataTransaksi = await transaksiModel.findAll({
      include: [
        {
          model: userModel,
          as: "userTransaksi",
        },
        {
          model: detailTransaksiModel,
          as: "detailTransaksi",
        },
        {
          model: aplikasiModel,
          as: "aplikasiTransaksi",
        },
      ],
      where: { userID: userID },
      order: [["createdAt", "DESC"]],
    });

    if (dataTransaksi.length === 0) {
      return response
        .status(404)
        .send(
          ResponseData(false, "Gagal mendapatkan data transaksi", null, null)
        );
    }

    const formatData = dataTransaksi.map((data) => ({
      transaksiID: data.transaksiID,
      tgl: data.tgl,
      status: data.status,
      userID: data.userTransaksi.userID,
      username: data.userTransaksi.username,
      detailTransaksiID: data.detailTransaksi.detail_transaksiID,
      harga: data.detailTransaksi.harga,
      durasi: data.detailTransaksi.durasi,
      totalHarga: data.detailTransaksi.total_harga,
      aplikasiID: data.aplikasiTransaksi.aplikasiID,
      namaApp: data.aplikasiTransaksi.nama,
      hargaApp: data.aplikasiTransaksi.harga,
      deskripsiApp: data.aplikasiTransaksi.deskripsi,
    }));

    return response
      .status(200)
      .send(
        ResponseData(
          true,
          "Sukses mendapatkan semua data transaksi",
          null,
          formatData
        )
      );
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

exports.filterTransaksi = async (request, response) => {
  try {
    const { startDate, endDate } = request.body;

    const endDateWithTime = new Date(endDate);
    endDateWithTime.setHours(23, 59, 59, 999);

    const dataTransaksi = await transaksiModel.findAll({
      where: {
        tgl: {
          [Op.between]: [startDate, endDateWithTime],
        },
      },
      include: [
        {
          model: userModel,
          as: "userTransaksi",
        },
        {
          model: detailTransaksiModel,
          as: "detailTransaksi",
        },
        {
          model: aplikasiModel,
          as: "aplikasiTransaksi",
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const formatData = dataTransaksi.map((data) => ({
      transaksiID: data.transaksiID,
      tgl: data.tgl,
      status: data.status,
      userID: data.userTransaksi.userID,
      username: data.userTransaksi.username,
      detailTransaksiID: data.detailTransaksi.detail_transaksiID,
      harga: data.detailTransaksi.harga,
      durasi: data.detailTransaksi.durasi,
      totalHarga: data.detailTransaksi.total_harga,
      aplikasiID: data.aplikasiTransaksi.aplikasiID,
      namaApp: data.aplikasiTransaksi.nama,
      hargaApp: data.aplikasiTransaksi.harga,
      deskripsiApp: data.aplikasiTransaksi.deskripsi,
    }));

    return response
      .status(200)
      .send(
        ResponseData(
          true,
          "Sukses mendapatkan semua data transaksi",
          null,
          formatData
        )
      );
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

exports.updateStatusTransaksi = async (request, response) => {
  try {
    const existingUser = await userModel.findOne({
      where: { userID: request.body.userID },
    });

    if (!existingUser) {
      return response
        .status(404)
        .send(ResponseData(false, "User tidak ditemukan", null, null));
    }

    const existingTransaksi = await transaksiModel.findOne({
      where: { transaksiID: request.params.transaksiID },
      include: {
        model: detailTransaksiModel,
        as: "detailTransaksi",
      },
    });

    if (!existingTransaksi) {
      return response
        .status(404)
        .send(ResponseData(false, "Transaksi tidak ditemukan", null, null));
    } else if (existingTransaksi.status === "lunas") {
      return response
        .status(400)
        .send(ResponseData(false, "Transaksi sudah dibayar", null, null));
    }

    const total = existingTransaksi.detailTransaksi.total_harga;
    const sisaSaldo = existingUser.saldo - total;

    if (sisaSaldo < 0) {
      return response
        .status(402)
        .send(ResponseData(false, "Saldo anda tidak mencukupi", null, null));
    }

    await userModel.update(
      { saldo: sisaSaldo },
      { where: { userID: existingUser.userID } }
    );

    await transaksiModel.update(
      { status: "lunas" },
      { where: { transaksiID: existingTransaksi.transaksiID } }
    );

    const responseData = {
      transaksiID: existingTransaksi.transaksiID,
      detailTransaksiID: existingTransaksi.detailTransaksi.detail_transaksiID,
      status: "lunas",
      username: existingUser.username,
      sisaSaldo: sisaSaldo,
    };

    return response
      .status(200)
      .send(
        ResponseData(
          true,
          "Sukses mengupdate status data transaksi",
          null,
          responseData
        )
      );
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

exports.deleteTransaksi = async (request, response) => {
  try {
    const transaksiID = request.params.transaksiID;
    const existingTransaksi = await transaksiModel.findOne({
      where: { transaksiID: request.params.transaksiID },
    });
    if (!existingTransaksi) {
      return response
        .status(404)
        .send(ResponseData(false, "Transaksi tidak ditemukan", null, null));
    }

    await detailTransaksiModel.destroy({
      where: { transaksiID: transaksiID },
    });

    await transaksiModel.destroy({
      where: { transaksiID: transaksiID },
    });

    return response
      .status(201)
      .send(ResponseData(true, "Sukses menghapus data transaksi", null, null));
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

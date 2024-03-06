const { Op } = require("sequelize");
const { ResponseData } = require("../helpers/ResponseHelper");
const {
  transaksi: transaksiModel,
  detail_transaksi: detailTransaksiModel,
  user: userModel,
  aplikasi: aplikasiModel,
  tier: tierModel,
} = require("../db/models/index");

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

    const newTransaksi = {
      userID: request.body.userID,
      aplikasiID: existingAplikasi.aplikasiID,
    };

    const transaksiNew = await transaksiModel.create(newTransaksi);

    const aplikasiID = transaksiNew?.aplikasiID;

    const aplikasiData = await aplikasiModel.findOne({
      where: { aplikasiID: aplikasiID },
      include: {
        model: tierModel,
        as: "tierAplikasi",
      },
    });

    const newDetailTransaksi = [
      {
        transaksiID: transaksiNew?.transaksiID,
        aplikasiID: aplikasiData?.aplikasiID,
        tierID: aplikasiData?.tierAplikasi.tierID,
        harga: aplikasiData ? aplikasiData.tierAplikasi.harga : 0,
        qty: request.body.qty,
        total_harga:
          (aplikasiData ? aplikasiData.tierAplikasi.harga : 0) *
          request.body.qty,
      },
    ];

    const result = await detailTransaksiModel.bulkCreate(newDetailTransaksi);

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

exports.getAllTransaksi = async (request, response) => {
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

    const formattedData = dataTransaksi.map((transaksi) => {
      const firstDetail = transaksi.detailTransaksi[0];

      return {
        transaksiID: transaksi.transaksiID,
        status: transaksi.status,
        userID: transaksi.userID,
        namaUser: transaksi.userTransaksi.nama,
        username: transaksi.userTransaksi.username,
        aplikasiID: transaksi.aplikasiTransaksi.aplikasiID,
        namaAplikasi: transaksi.aplikasiTransaksi.nama,
        deskripsi: transaksi.aplikasiTransaksi.deskripsi,
        image: transaksi.aplikasiTransaksi.image,
        tierID: firstDetail ? firstDetail.tierID : null,
        qty: firstDetail ? firstDetail.qty : null,
        harga: firstDetail ? firstDetail.harga : null,
        total_harga: firstDetail ? firstDetail.total_harga : null,
        tgl: transaksi.tgl,
      };
    });

    return response
      .status(200)
      .send(
        ResponseData(
          true,
          "Sukses mendapatkan semua data transaksi",
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

    const formattedData = dataTransaksi.map((transaksi) => {
      const firstDetail = transaksi.detailTransaksi[0];

      return {
        transaksiID: transaksi.transaksiID,
        status: transaksi.status,
        userID: transaksi.userID,
        namaUser: transaksi.userTransaksi.nama,
        username: transaksi.userTransaksi.username,
        aplikasiID: transaksi.aplikasiTransaksi.aplikasiID,
        namaAplikasi: transaksi.aplikasiTransaksi.nama,
        deskripsi: transaksi.aplikasiTransaksi.deskripsi,
        image: transaksi.aplikasiTransaksi.image,
        tierID: firstDetail ? firstDetail.tierID : null,
        qty: firstDetail ? firstDetail.qty : null,
        harga: firstDetail ? firstDetail.harga : null,
        total_harga: firstDetail ? firstDetail.total_harga : null,
        tgl: transaksi.tgl,
      };
    });

    return response
      .status(200)
      .send(
        ResponseData(
          true,
          "Sukses mendapatkan semua data transaksi",
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

exports.updateStatusTransaksi = async (request, response) => {
  try {
    let transaksiID = request.params.transaksiID;
    await transaksiModel.update(
      { status: "lunas" },
      { where: { transaksiID: transaksiID } }
    );
    return response
      .status(200)
      .send(
        ResponseData(
          true,
          "Sukses mengupdate status data transaksi",
          null,
          null
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
    await detailTransaksiModel.destroy({
      where: { detail_transaksiID: transaksiID },
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

const { ResponseData } = require("../helpers/ResponseHelper");
const {
  transaksi: transaksiModel,
  detail_transaksi: detailTransaksiModel,
  user: userModel,
  aplikasi: aplikasiModel,
  tier: tierModel,
} = require("../db/models/index");
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
      include: {
        model: tierModel,
        as: "tierAplikasi",
      },
    });

    const newDetailTransaksi = {
      transaksiID: transaksiNew?.transaksiID,
      aplikasiID: aplikasiData?.aplikasiID,
      tierID: aplikasiData?.tierAplikasi.tierID,
      harga: aplikasiData ? aplikasiData.tierAplikasi.harga : 0,
      durasi: request.body.durasi,
      total_harga:
        (aplikasiData ? aplikasiData.tierAplikasi.harga : 0) *
        request.body.durasi,
    };

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
        detailTransaksiID: firstDetail ? firstDetail.detail_transaksiID : null,
        status: transaksi.status,
        namaUser: transaksi.userTransaksi.nama,
        username: transaksi.userTransaksi.username,
        namaAplikasi: transaksi.aplikasiTransaksi.nama,
        durasi: firstDetail ? firstDetail.durasi : null,
        harga: firstDetail ? firstDetail.harga : null,
        totalHarga: firstDetail ? firstDetail.total_harga : null,
        deskripsi: transaksi.aplikasiTransaksi.deskripsi,
        image: transaksi.aplikasiTransaksi.image,
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
        detailTransaksiID: firstDetail ? firstDetail.detail_transaksiID : null,
        status: transaksi.status,
        namaUser: transaksi.userTransaksi.nama,
        username: transaksi.userTransaksi.username,
        namaAplikasi: transaksi.aplikasiTransaksi.nama,
        durasi: firstDetail ? firstDetail.durasi : null,
        harga: firstDetail ? firstDetail.harga : null,
        totalHarga: firstDetail ? firstDetail.total_harga : null,
        deskripsi: transaksi.aplikasiTransaksi.deskripsi,
        image: transaksi.aplikasiTransaksi.image,
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

    const formattedData = dataTransaksi.map((transaksi) => {
      const firstDetail = transaksi.detailTransaksi[0];

      return {
        transaksiID: transaksi.transaksiID,
        detailTransaksiID: firstDetail ? firstDetail.detail_transaksiID : null,
        status: transaksi.status,
        namaUser: transaksi.userTransaksi.nama,
        username: transaksi.userTransaksi.username,
        namaAplikasi: transaksi.aplikasiTransaksi.nama,
        durasi: firstDetail ? firstDetail.durasi : null,
        harga: firstDetail ? firstDetail.harga : null,
        totalHarga: firstDetail ? firstDetail.total_harga : null,
        deskripsi: transaksi.aplikasiTransaksi.deskripsi,
        image: transaksi.aplikasiTransaksi.image,
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

    const total = existingTransaksi.detailTransaksi[0].total_harga;
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
      detailTransaksiID:
        existingTransaksi.detailTransaksi[0].detail_transaksiID,
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

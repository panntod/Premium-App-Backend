const {
  transaksi: transaksiModel,
  detail_transaksi: detailTransaksiModel, // Pastikan model detail_transaksi diimport dengan benar
  user: userModel,
  aplikasi: aplikasiModel,
  tier: tierModel, // Pastikan model tier diimport dengan benar
} = require("../db/models/index");

const { ResponseData } = require("../helpers/ResponseHelper");

exports.addTransaksi = async (request, response) => {
  try {
    const currentDate = new Date();
    const newTransaksi = {
      tgl: currentDate,
      userID: request.body.userID,
      aplikasiID: request.body.aplikasiID,
      status: "belum",
    };

    const transaksiNew = await transaksiModel.create(newTransaksi);

    const transaksiID = transaksiNew.transaksiID;

    const detailTransaksi = request.body.detail_transaksi;

    for (const detailItem of detailTransaksi) {
      const tierData = await tierModel.findByPk(detailItem.tierID);

      const newDetailTransaksi = {
        transaksiID: transaksiID,
        aplikasiID: detailItem.aplikasiID,
        harga: tierData ? tierData.harga : 0,
        qty: detailItem.qty,
        total_harga: (tierData ? tierData.harga : 0) * detailItem.qty,
      };

      await detailTransaksiModel.create(newDetailTransaksi);
    }

    return response
      .status(201)
      .send(ResponseData(true, "Sukses tambah transaksi", null, transaksiNew));
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

exports.getAllTransaksi = async (request, response) => {
  try {
    const allTransaksi = await transaksiModel.findAll({
      include: [
        {
          model: detailTransaksiModel,
          as: "detailTransaksi",
          include: [
            {
              model: aplikasiModel,
              as: "detailAplikasi",
              include: [
                {
                  model: tierModel,
                  as: "tierAplikasi",
                },
              ],
            },
          ],
        },
      ],
    });

    return response
      .status(200)
      .send(
        ResponseData(
          true,
          "Sukses mendapatakan semua transaksi",
          null,
          allTransaksi
        )
      );
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

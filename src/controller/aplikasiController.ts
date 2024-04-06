import Aplikasi from "../db/models/Aplikasi";
import { Op } from "sequelize";
import { Request, Response } from "express";
import { ResponseData } from "../helpers/ResponseHelper";
import multer from "multer";
import path from "path";
import fs from "fs";
const upload = multer().single("image")

interface AplikasiData {
    aplikasiID?: string;
    nama?: string;
    harga?: bigint;
    image?: string;
    deskripsi?: string;
}

export const getAllAplikasi = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    try {
      let aplikasis = await Aplikasi.findAll({
        order: [["createdAt", "DESC"]],
      });
      return response
        .status(200)
        .send(
          ResponseData(true, "Sukses mengambil seluruh data Aplikasi", null, aplikasis)
        );
    } catch (error: any) {
      console.log(error);
      return response
        .status(500)
        .send(ResponseData(false, error.message, error, null));
    }
};

export const findAplikasi = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    try {
      let keyword = request.body.keyword;
      let aplikasis:AplikasiData[] = await Aplikasi.findAll({
        where: {
          [Op.or]: [
            { nama: { [Op.substring]: keyword } },
            { harga: { [Op.substring]: keyword } },
          ],
        },
      });
  
      if (!aplikasis.length) {
        return response
          .status(404)
          .send(ResponseData(true, "APlikasi tidak ditemukan", null, null));
      }
  
      return response
        .status(200)
        .send(ResponseData(true, "Sukses mengambil data aplikasi", null, aplikasis));
    } catch (error: any) {
      console.log(error);
      return response
        .status(500)
        .send(ResponseData(false, error.message, error, null));
    }
  };

  export const addAplikasi = async (
    request: Request,
    response: Response
  ) => {
    try {
      upload(request, response, async (err: any) => {
        if (err) {
          return response
            .status(400)
            .send(ResponseData(false, "Gagal upload file", err, null));
        }

        if (!request.file) {
          return response
            .status(400)
            .send(ResponseData(false, "Tidak ada file yang diunggah", null, null));
        }

        const newApp: AplikasiData = {
          nama: request.body.nama,
          harga: request.body.harga,
          image: request.file.filename,
          deskripsi: request.body.deskripsi
         };
        console.log(newApp.image)
        await Aplikasi.create(newApp);

        return response
          .status(201)
          .send(ResponseData(true, "Sukses membuat data aplikasi", null, newApp));
      });
    } catch (error: any) {
      console.log(error);
      return response
        .status(500)
        .send(ResponseData(false, error.message, error, null));
    }
};

  export const updateAplikasi = async (
    request: Request,
    response: Response
  ) => {
    try {
      upload(request, response, async (err: any) => {
      let aplikasiID = request.params.id;
  
      const existingApp = await Aplikasi.findOne({
        where: { aplikasiID: aplikasiID },
      });
  
      let newApp: Partial<AplikasiData> = {
        nama: request.body.nama,
        harga: request.body.harga,
        deskripsi: request.body.deskripsi
      };
  
      if (!request.body.nama) {
        newApp.nama = existingApp?.nama
      }
  
      if (!existingApp) {
        return response
          .status(404)
          .send(ResponseData(true, "App tidak ditemukan", null, null));
      }
      
      if (request.file) {
        if (existingApp) {
          const oldImage = existingApp.image;
          const pathImage = path.join(__dirname, "../images", oldImage);

          try {
            await fs.unlink(pathImage, (err));
          } catch (error) {
            console.error("Gagal menghapus image:", error);
          }

          newApp.image = request.file.filename;
        }
      }

      await Aplikasi.update(newApp, { where: { aplikasiID:aplikasiID } });
      return response
        .status(201)
        .send(ResponseData(true, "Sukses update data app", null, newApp));
      })
      
    } catch (error: any) {
      console.log(error);
      return response
        .status(500)
        .send(ResponseData(false, error.message, error, null));
    }
  };

  export const deleteAplikasi = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    try {
      let aplikasiID = request.params.id;
      const result = await Aplikasi.destroy({ where: { aplikasiID: aplikasiID } });
      if (!result) {
        return response
          .status(404)
          .send(ResponseData(false, "Aplikasi tidak ditemukan", null, null));
      }
      return response
        .status(201)
        .send(ResponseData(true, "Sukses menghapus data aplikasi", null, null));
    } catch (error: any) {
      console.log(error);
      return response
        .status(500)
        .send(ResponseData(false, error.message, error, null));
    }
  };
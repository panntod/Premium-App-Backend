import User from "../db/models/User";
import { Op } from "sequelize";
import { Request, Response } from "express";
import { GenerateToken, ResponseData } from "../helpers/ResponseHelper";
import { PasswordCompare, PasswordHashing } from "../helpers/PasswordHelper";

interface UserData {
  userID: string;
  nama: string | null;
  username: string | null;
  password?: string | null;
  role: string;
}

export const getAllUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    let users = await User.findAll({
      order: [["createdAt", "DESC"]],
    });
    return response
      .status(200)
      .send(
        ResponseData(true, "Sukses mengambil seluruh data user", null, users)
      );
  } catch (error: any) {
    console.log(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

export const findUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    let keyword = request.body.keyword;
    let users: UserData[] = await User.findAll({
      where: {
        [Op.or]: [
          { userID: { [Op.substring]: keyword } },
          { username: { [Op.substring]: keyword } },
          { nama: { [Op.substring]: keyword } },
          { role: { [Op.substring]: keyword } },
        ],
      },
    });

    if (!users.length) {
      return response
        .status(404)
        .send(ResponseData(true, "User tidak ditemukan", null, null));
    }

    return response
      .status(200)
      .send(ResponseData(true, "Sukses mengambil user", null, users));
  } catch (error: any) {
    console.log(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

export const addUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const newUser = {
      username: request.body.username,
      nama: request.body.nama,
      password: await PasswordHashing(request.body.password),
      role: request.body.role,
    };

    await User.create(newUser);

    return response
      .status(201)
      .send(ResponseData(true, "Sukses membuat data user", null, newUser));
  } catch (error: any) {
    console.log(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

export const updateUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    let userID = request.params.id;

    const existingUser = await User.findOne({
      where: { userID: userID },
    });

    let newUser: Partial<UserData> = {
      nama: request.body.nama,
      role: request.body.role,
    };

    if (request.body.password) {
      newUser.password = await PasswordHashing(request.body.password);
    }

    if (!request.body.username) {
      newUser.username = existingUser?.username
    }

    if (!existingUser) {
      return response
        .status(404)
        .send(ResponseData(true, "User tidak ditemukan", null, null));
    }

    await User.update(newUser, { where: { userID: userID } });
    return response
      .status(201)
      .send(ResponseData(true, "Sukses update data user", null, newUser));
  } catch (error: any) {
    console.log(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};


export const deleteUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    let userID = request.params.id;
    const result = await User.destroy({ where: { userID: userID } });
    if (!result) {
      return response
        .status(404)
        .send(ResponseData(false, "User tidak ditemukan", null, null));
    }
    return response
      .status(201)
      .send(ResponseData(true, "Sukses menghapus data user", null, null));
  } catch (error: any) {
    console.log(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

export const topUpSaldo = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const username = request.params.username;
    const findUser = await User.findOne({ where: { username: username } });

    if (!findUser) {
      return response
        .status(404)
        .send(ResponseData(false, "User tidak ditemukan", null, null));
    }

    const currentSaldo = findUser.saldo || 0;
    const additionalSaldo = parseFloat(request.body.saldo);

    if (isNaN(additionalSaldo) || additionalSaldo <= 0) {
      return response
        .status(400)
        .send(ResponseData(false, "Jumlah top up tidak valid", null, null));
    }

    const newSaldo = currentSaldo + additionalSaldo;

    await User.update({ saldo: newSaldo }, { where: { username: username } });

    return response
      .status(201)
      .send(ResponseData(true, "Sukses menambahkan saldo", null, null));
  } catch (error: any) {
    console.error(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

export const getMe = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const usernameUser = request.body.username;

    if (!usernameUser) {
      return response
        .status(401)
        .send(ResponseData(false, "Parameter Harus Valid", null, null));
    }

    const findUser = await User.findOne({
      where: { username: usernameUser },
    });

    if (!findUser) {
      return response
        .status(401)
        .send(ResponseData(false, "Anda Belum Login", null, null));
    }

    const responseData: UserData = {
      userID: findUser.userID,
      username: findUser.username,
      nama: findUser.nama,
      role: findUser.role,
    };

    return response
      .status(201)
      .send(
        ResponseData(true, "Sukses menambahkan saldo user", null, responseData)
      );
  } catch (error: any) {
    console.log(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};
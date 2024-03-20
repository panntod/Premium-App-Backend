import User from "../db/models/User"
import { NextFunction, Request, Response } from "express"
import { PasswordCompare } from "../helpers/PasswordHelper"
import { ExtractToken, GenerateToken, ResponseData } from "../helpers/ResponseHelper"

export const authentication = async (request: Request, response: Response) => {
  try {
    const { username, password } = request.body;

    const findUser = await User.findOne({
      where: { username: username },
    });

    if (!findUser) {
      return response
        .status(404)
        .send(ResponseData(false, "Username Tidak Ditemukan", null, null));
    }

    const matched = await PasswordCompare(password, findUser.password);

    if (!matched) {
      return response
        .status(400)
        .send(ResponseData(false, "Password Salah", null, null));
    }

    const dataUser = {
      id: findUser.userID,
      nama: findUser.nama,
      username: findUser.username,
      role: findUser.role,
    };

    const token = GenerateToken(dataUser);

    const responseData = {
      token: token,
      id: dataUser.id,
      nama: dataUser.nama,
      role: dataUser.role,
      username: dataUser.username,
    };

    return response
      .status(200)
      .send(ResponseData(true, "Login Berhasil", null, responseData));
  } catch (error: any) {
    console.log(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

export const authorization = async (request: Request, response: Response, next: NextFunction) => {
  try {
    let authToken = request.headers.authorization;

    if (!authToken) {
      return response
        .status(404)
        .send(ResponseData(false, "Token Tidak Ditemukan", null, null));
    }

    let tokenKey = authToken.split(" ")[1];

    const decodedToken = ExtractToken(tokenKey);
    if (!decodedToken) {
      return response
        .status(401)
        .send(ResponseData(false, "Unauthorized User", null, null));
    }

    if (decodedToken.error) {
      return response
        .status(401)
        .send(ResponseData(false, decodedToken.error, null, null));
    }

    response.locals.role = decodedToken.token.role;
    
    next();
  } catch (error: any) {
    console.log(error);
    return response
      .status(500)
      .send(ResponseData(false, error.message, error, null));
  }
};

export const adminOnly = (request: Request, response: Response, next: NextFunction) => {
  try {
    const userRole = response.locals.role;

    if (userRole !== "admin") {
      return response
        .status(403)
        .send(ResponseData(false, "Forbidden Access", null, null));
    }

    next();
  } catch (error) {
    next(error);
  }
};

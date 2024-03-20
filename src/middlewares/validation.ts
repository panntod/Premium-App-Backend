import { Request, Response, NextFunction } from "express";
import { ResponseData } from "../helpers/ResponseHelper";
import User from "../db/models/User";
import Validator from "validatorjs";

interface UserInterface {
  nama?: string,
  role?: string,
  username?: string,
  password: string,
  confirmPassword: string,
}

const registerValidationRules = {
  nama: "required|string|max:50",
  role: "string|in:user,admin",
  username: "required|string|max:50",
  password: "required|string|min:8|alpha_num",
  confirmPassword: "required|same:password",
};

export const registerValidation = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const userData: UserInterface = {
      nama: request.body.nama,
      role: request.body.role,
      username: request.body.username,
      password: request.body.password,
      confirmPassword: request.body.confirmPassword,
    };

    const validate = new Validator(userData, registerValidationRules);

    if (validate.fails()) {
      const errorMessages = Object.values(validate.errors.errors)
        .flat()
        .join(", ")
        .split(", ");

      return response
        .status(400)
        .send(ResponseData(false, "Bad Request", errorMessages, null));
    }

    const existingUsername = await User.findOne({
      where: { username: userData.username },
    });

    if (existingUsername) {
      return response
        .status(400)
        .send(
          ResponseData(
            false,
            "Bad request",
            ["Username Sudah Digunakan"],
            null,
          ),
        );
    }

    next();
  } catch (error: any) {
    console.error(error);
    return response
      .status(500)
      .send(ResponseData(false, "", error.message, null));
  }
};

const updateUserValidationRules = {
  nama: "string|max:50",
  role: "in:user,admin",
  password: "string|min:8|alpha_num",
  confirmPassword: "required_with:password|string|same:password",
};

export const updateUserValidation = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const userData: Partial<UserInterface> = {
      nama: request?.body?.nama,
      role: request?.body?.role,
      password: request?.body?.password,
      confirmPassword: request?.body?.confirmPassword,
    };

    const validate = new Validator(userData, updateUserValidationRules);

    if (validate.fails()) {
      const errorMessages = Object.values(validate.errors.errors).flat();

      return response
        .status(400)
        .send(ResponseData(false, "Bad Request", errorMessages, null));
    }
    
    if(request.body.username){
      const existingUsername = await User.findOne({
        where: { username: request.body.username },
      });
  
      if (existingUsername) {
        return response
          .status(400)
          .send(
            ResponseData(
              false,
              "Bad request",
              ["Username Sudah Digunakan"],
              null,
            ),
          );
      }
    }

    next();
  } catch (error: any) {
    console.error(error);
    return response
      .status(500)
      .send(ResponseData(false, "", error.message, null));
  }
};

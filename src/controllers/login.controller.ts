import { Request, response, Response } from "express";
import labels from "../labels";
import LoginModel from "../models/login.model";
import bcrypt from "bcryptjs";
import getJwt from "../helpers/jwt";

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = LoginModel.findOne(username);

    if (!user) {
      res.status(400).json({
        message: labels.MENSSAGE_400,
        response: labels.FAILED_LOGIN,
      });
    }

    if (!user._status) {
      res.status(400).json({
        message: labels.MENSSAGE_400,
        response: labels.STATUS_USER,
      });
    }

    const validPassword = bcrypt.compareSync(password, user._password);
    if (!validPassword) {
      res.status(400).json({
        message: labels.MENSSAGE_400,
        response: labels.FAILED_LOGIN,
      });
    }

    const token = await getJwt(String(user._id));
    res.status(200).json({
      message: labels.SUCCESSFUL_LOGIN,
      username: user._username,
      token,
      expiresIn: 3600,
    });
  } catch (error) {
    console.error(error);
  }
};


export default login

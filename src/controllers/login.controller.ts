import { Request, Response } from "express";
import labels from "../labels";
import LoginModel from "../models/login.model";
import bcrypt from "bcryptjs";
import getJwt from "../helpers/jwt";
import debug from "debug"

const log = debug("app:module-login-controller")

const login = async (req: Request, res: Response): Promise<void> => { 
  try {
    const { username, password } = req.body;

    const user = await LoginModel.findOne({ username });

    if (!user) {
      res.status(400).json({
        message: labels.MENSSAGE_400,
        response: labels.FAILED_LOGIN,
      });
      return; // Importante para evitar ejecución adicional
    }

    if (!user._status) {
      res.status(400).json({
        message: labels.MENSSAGE_400,
        response: labels.STATUS_USER,
      });
      return;
    }

    const validPassword = bcrypt.compareSync(password, user._password);
    if (!validPassword) {
      res.status(400).json({
        message: labels.MENSSAGE_400,
        response: labels.FAILED_LOGIN,
      });
      return;
    }

    const token = await getJwt(String(user._id), user._role);
    res.status(200).json({
      message: labels.SUCCESSFUL_LOGIN,
      username: user._username,
      token,
      expiresIn: 3600,
    });
  } catch (error) {
    log(error);
    res.status(500).json({
      message: labels.ERROR_SERVER,
    });
  }
};



export default login

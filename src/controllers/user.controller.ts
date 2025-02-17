import { Request, Response } from "express";
import Login from "../models/login.model";
import bcript from "bcryptjs";
import labels from "../labels";
import debug from "debug";


const log = debug("app:module-user-controller")

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;
    const user = new Login({ username, password, role });

    const salt = bcript.genSaltSync();
    user._password = bcript.hashSync(password, salt);

    await user.save();
    res.status(201).json({
      message: labels.SUCCESFUL_REGISTER,
      username: user._username,
    });
  } catch (error) {
    log(error);  
    res.status(500).json({
      message: labels.ERROR_SERVER,
    });
  }
};

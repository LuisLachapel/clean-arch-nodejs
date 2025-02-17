import { sign } from "jsonwebtoken";
import dotenv from "dotenv";
import labels from "../labels";
import debug = require("debug");

dotenv.config();
const log = debug("app:module-jwt-helpers")


const getJwt = (uid: string, role: string) => {
  try {
    return new Promise((resolve, reject) => {
      const payload = { uid, role };
      sign(
        payload,
        process.env.SECRET_KEY || "",
        {
          expiresIn: "1h",
        },
        (error, token) => {
          if (error) {
            console.error(error);
            reject(labels.ERROR_TOKEN);
          } else {
            resolve(token);
          }
        }
      );
    });
  } catch (error) {
    log(error);
    throw new Error(labels.ERROR_SERVER);
  }
};

export default getJwt;

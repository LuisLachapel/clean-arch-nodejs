import { sign } from "jsonwebtoken";
import dotenv from "dotenv";
import labels from "../labels";

dotenv.config();

const getJwt = (uid: string) => {
  try {
    return new Promise((resolve, reject) => {
      const payload = { uid };
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
    console.error(error);
    throw new Error(labels.ERROR_SERVER);
  }
};

export default getJwt;

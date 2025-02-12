import express, { Application } from "express";
import db_conection from "../database/config";
import labels from "../labels";
import dotenv from "dotenv";
import loginRoutes from "../routes/login.routes";

dotenv.config();
class Server {
  private app: Application;
  private port: string;

  //Paths
  private login_path: string;

  constructor() {
    (this.app = express()), (this.port = process.env.PORT || "3000");
    this.login_path = "/api/login";

    this.db_connect();
    this.middlewares();
    this.routes();
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(labels.LISTEN_SERVER + this.port)
    );
  }

  async db_connect() {
    await db_conection();
  }

  routes(){
    this.app.use(this.login_path,loginRoutes)
  }

  middlewares(){
    this.app.use(express.json())
  }
}

export default Server;

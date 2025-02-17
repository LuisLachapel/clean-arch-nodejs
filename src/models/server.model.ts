import express, { Application } from "express";
import db_conection from "../database/config";
import labels from "../labels";
import dotenv from "dotenv";
import loginRoutes from "../routes/login.routes";
import userRoutes from "../routes/user.routes"
import productRouter from "../routes/product.routes"
import cors from "cors"

dotenv.config();
class Server {
  private app: Application;
  private port: string;

  //Paths
  private login_path: string;
  private user_path: string;
  private product_path: string;

  constructor() {
    (this.app = express()), (this.port = process.env.PORT || "3000");
    this.login_path = "/api/login";
    this.user_path = "/api/user";
    this.product_path = "/api/products";

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
    this.app.use(this.user_path, userRoutes)
    this.app.use(this.product_path, productRouter)
  }

  middlewares(){
    const allowedOrigin = process.env.ALLOWED_CORS || ""
    this.app.use(cors({origin: allowedOrigin}))
    this.app.use(express.json())
    
  }
}

export default Server;

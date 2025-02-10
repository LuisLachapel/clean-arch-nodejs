import express,{Application} from "express";
import db_conection from "../database/config"
import labels from "../labels";
import dontenv from 'dotenv'

dontenv.config()
class Server{
private  app: Application;
private port: string;



constructor(){
    this.app = express(),
    this.port = process.env.PORT || "3000"

    this.db_connect()
}

listen(){
    this.app.listen(this.port, () =>console.log(labels.LISTEN_SERVER + this.port))
}

async db_connect(){
    await db_conection()
}
}

export default Server;
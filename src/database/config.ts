import dontenv from "dotenv"
import {connect} from "mongoose"
import debug = require("debug")

dontenv.config()
const log = debug("app:module-config-database")


const db_conection = async() =>{
    try {
        await connect(process.env.MONGO_URI || '')
        
    } catch (error) {
        log(error);
    }
}

export default db_conection;
import dontenv from "dotenv"
import {connect} from "mongoose"

dontenv.config()

const db_conection = async() =>{
    try {
        await connect(process.env.MONGO_URI || '')
        
    } catch (error) {
        console.error(error);
    }
}

export default db_conection;
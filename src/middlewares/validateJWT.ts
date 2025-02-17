import {Request, Response, NextFunction} from "express";
import labels from "../labels";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import Login from "../models/login.model"
import debug from "debug";


const log = debug("app:module-validateJwt-middlewares")

const validateJwt = async(req: Request, res: Response, next: NextFunction): Promise<any> => {
    dotenv.config();
    try {

        const token = req.header(labels.AUTHORIZATION)

    if(!token){
        return res.status(401).json({
            message: labels.TOKEN_FAILED
        })
    }

    const {uid} = <any> jwt.verify(token,process.env.SECRET_KEY || '')
    const user = await Login.findById(uid)

    if(!uid){
       return res.status(401).json({
            message: labels.TOKEN_FAILED
        })
    }

    if(!user?._status){
        return res.status(401).json({
            message: labels.TOKEN_FAILED
        })
    }

    next()

        
    } catch (error) {
        log(error)
        res.status(500).json({
            message: labels.ERROR_SERVER,
            
        })
        
    }

}


export default validateJwt
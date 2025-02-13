import {Request, Response, NextFunction} from "express";
import labels from "../labels";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import Login from "../models/login.model"




const validateJwt = async(req: Request, res: Response, next: NextFunction) => {
    dotenv.config();
    try {

        const token = req.header(labels.AUTHORIZATION)?.split(" ")[1]

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
        console.error(error)
        res.status(500).json({
            message: labels.ERROR_SERVER,
            
        })
        
    }

}


export default validateJwt
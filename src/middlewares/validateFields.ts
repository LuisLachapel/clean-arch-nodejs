import {Request, Response, NextFunction} from "express"
import {validationResult} from "express-validator"
import labels  from "../labels"
import debug from "debug"


const log = debug("app:module-validateFields-middlewares")


const validateFieldsRequest = (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
              res.status(400).json({
                message: labels.EMPTY_FIELD,
                errors
            });
        }

        next();
        
    } catch (error) {
        log(error)
        res.status(500).json({
            message: labels.ERROR_SERVER
        })
    }
}

export {
    validateFieldsRequest
}
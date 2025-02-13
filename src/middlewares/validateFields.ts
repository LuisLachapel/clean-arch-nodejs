import {Request, Response, NextFunction} from "express"
import {validationResult} from "express-validator"
import labels  from "../labels"

const validateFieldsRequest = (req: Request, res: Response, next: NextFunction): void => {
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
        console.error(error)
        res.status(500).json({
            message: labels.ERROR_SERVER
        })
    }
}

export {
    validateFieldsRequest
}
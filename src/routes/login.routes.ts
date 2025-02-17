import {Router} from "express"
import login from "../controllers/login.controller"
import { validateFieldsRequest } from "../middlewares/validateFields"

const router = Router()

router.post("/",[
    validateFieldsRequest
],login
)

export default router

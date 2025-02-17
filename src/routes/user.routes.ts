import {Router} from "express"
import validateJwt from "../middlewares/validateJWT"
import { validateFieldsRequest } from "../middlewares/validateFields"
import { createUser } from "../controllers/user.controller"

const router = Router();

router.post("/create",[validateJwt(),validateFieldsRequest],createUser);
 
export default router; 
import {Router} from "express"
import {check} from "express-validator"
import labels from "../labels"
import login from "../controllers/login.controller"

const router = Router()

router.post("/login",
    check("username",labels.EMPTY_FIELD).not().isEmpty(),
    check("password",labels.EMPTY_FIELD).not().isEmpty(),
    check("role", labels.EMPTY_FIELD).not().isEmpty(),
    check("status",labels.EMPTY_FIELD).not().isEmpty()
    ,login
)

export default router

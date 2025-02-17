import { Router } from "express";
import { check } from "express-validator";
import validateJwt from "../middlewares/validateJWT";
import { validateFieldsRequest } from "../middlewares/validateFields";
import {
  getProducts,
  getProductsByPrice,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";
import labels from "../labels";
import { ProductExist } from "../helpers/db.validators";
const router = Router();

router.get("/", [validateJwt], getProducts);

router.get("/byprice", [validateJwt], getProductsByPrice);

router.post("/create", [validateJwt, validateFieldsRequest], createProduct);

router.put(
  "/update/:id",
  [
    validateJwt,
    check("id", labels.NOT_VALID_ID).isMongoId(),
    check("id").custom(ProductExist),
    validateFieldsRequest,
  ],
  updateProduct
);

router.delete(
  "/delete/:id",
  [
    validateJwt,
    check("id", labels.NOT_VALID_ID).isMongoId(),
    check("id").custom(ProductExist),
    validateFieldsRequest,
  ],
  deleteProduct
);

export default router;

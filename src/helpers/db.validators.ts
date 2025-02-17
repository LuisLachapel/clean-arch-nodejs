import labels from "../labels"
import Product from "../models/product.model"
import debug from "debug"
import { validationResult } from "express-validator";

const log = debug("app:module-db.validators-helpers")

export const ProductExist = async (id: string) => {
    const idDB = await Product.findById(id);
    if (!idDB) {
        return Promise.reject(new Error(labels.ID_NOT_EXIST.replace("{id}", id))); // Esto evita que el controlador se ejecute
    }
};

import labels from "../labels"
import Product from "../models/product.model"
import debug from "debug"

const log = debug("app:module-db.validators-helpers")

export const ProductExist = async (id: string) =>{
    try {
        const idDB = await Product.findById(id)

        if(!idDB){
            throw new Error(labels.ID_NOT_EXIST.replace("{id}", id))
        }
    } catch (error) {
        log(error);
        throw new Error(labels.ERROR_SERVER)
    }
}
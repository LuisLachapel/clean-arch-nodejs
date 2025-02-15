import { Request,  Response } from "express";
import labels from "../labels";
import Product from "../models/product.model";
import debug from "debug";

const log = debug("app:module-product-controller");
export const getProducts = async (req: Request, res: Response) => {
  
  try {
    const products = await Product.find();

    if (products.length === 0) {
      res.status(404).json({
        message: labels.NOT_FOUND,
        body: products,
      });
    } else {
      res.status(200).json({
        products,
      });
    }
  } catch (error) {
    log(error);
    res.status(500).json({
      response: labels.ERROR_SERVER,
    });
  }
};

export const getProductsByPrice = async (req: Request, res: Response) => {
  try {
    const {min, max} = req.body
    const products = await Product.find({price: {$gte: min, $lte: max}})
    if(products.length === 0){
        res.status(404).json({
            message: labels.NOT_FOUND,
            products
        })
    }
    else{
        res.status(200).json({
            products
        })
    }
  } catch (error) {
    log(error)
  }
};

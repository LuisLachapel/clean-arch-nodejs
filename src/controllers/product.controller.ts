import { Request, Response } from "express";
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
    const { min, max } = req.body;
    const products = await Product.find({ price: { $gte: min, $lte: max } });
    if (products.length === 0) {
      res.status(404).json({
        message: labels.NOT_FOUND,
        products,
      });
    } else {
      res.status(200).json({
        products,
      });
    }
  } catch (error) {
    log(error);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, quantity, status } = req.body;

    const product = new Product({ name, description, price, quantity, status });

    await product.save();

    res.status(201).json({
      message: labels.SUCCESFUL_INSERT,
      product,
    });
  } catch (error) {
    log(error);
    res.status(500).json({
      message: labels.ERROR_SERVER,
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try { 
    const id = req.params.id;
    const { _id, ...rest } = req.body;

    const product = await Product.findByIdAndUpdate(id, rest, { new: true });

    if (!product) {
       res.status(404).json({ message: labels.ID_NOT_EXIST.replace("{id}", id) });
       return; 
    }

    res.status(200).json({
      message: labels.SUCCESFUL_UPDATE,
      product,
    });
  } catch (error) {
    log(error);
    res.status(500).json({
      message: labels.ERROR_SERVER,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    await Product.findByIdAndDelete(id);

    res.status(200).json({
      message: labels.SUCCESFUL_DELETE,
    });
  } catch (error) {
    log(error);
    res.status(500).json({
      message: labels.ERROR_SERVER,
    });
  }
};

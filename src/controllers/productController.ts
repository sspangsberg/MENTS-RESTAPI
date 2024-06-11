import { Request, Response } from "express";
import { productModel } from "../models/productModel";
import { ProductService } from "../services/ProductService";

const pService = new ProductService();

// CRUD routes
export async function createProduct(req: Request, res: Response) {
  let data = req.body;

  try {
    var result = await pService.create(data);
    res.status(201).send({ data: result });
  } catch (error) {
    res.status(500).send({ message: error });
  }
}

/**
 *
 * @param req
 * @param res
 */
export async function getAllProducts(req: Request, res: Response) {
  try {
    var result = await pService.get({});
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error });
  }
}

/**
 *
 * @param req
 * @param res
 */
export async function getProductsInStock(req: Request, res: Response) {
  try {
    var result = await pService.get({ stock: { $gt: 0 } });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error });
  }
}

/**
 *
 * @param req
 * @param res
 */
export async function getProductById(req: Request, res: Response) {
  try {
    var result = await pService.get({ _id: req.params.id });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error });
  }
}

/**
 *
 * @param req
 * @param res
 */
export async function getProductsBasedOnQuery(req: Request, res: Response) {
  const field = req.body.field;
  const value = req.body.value;

  try {
    var result = await pService.get({ [field]: [value] });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error });
  }
}

// Update specific product - put
export const updateProductById = (req: Request, res: Response) => {
  const id = req.params.id;

  productModel
    .findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message:
            "Cannot update product with id=" +
            id +
            ". Maybe product was not found.",
        });
      } else {
        res.send({ message: "Product was succesfully updated." });
      }
    })
    .catch((err: string) => {
      res.status(500).send({ message: "Error updating product with id=" + id });
    });
};

// Delete specific product - delete
export const deleteProductById = (req: Request, res: Response) => {
  const id = req.params.id;

  productModel
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message:
            "Cannot delete product with id=" +
            id +
            ". Maybe product was not found.",
        });
      } else {
        res.send({ message: "Product was succesfully deleted." });
      }
    })
    .catch((err: string) => {
      res.status(500).send({ message: "Error delete product with id=" + id });
    });
};

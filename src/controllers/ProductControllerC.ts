import { Request, Response } from "express";
import { productModel } from "../models/productModel";
import { ProductService } from "../services/ProductService";

export class ProductControllerC {
  private pService = new ProductService();

  public ProductControllerC() {}

  /**
   *
   * @param req
   * @param res
   */
  public getProducts(req: Request, res: Response) {
    try {
      var result = this.pService.getAll();
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send({ message: error });
    }
  }
}

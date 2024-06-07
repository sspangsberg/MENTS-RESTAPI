import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";

export class ProductControllerC {
  private pService = new ProductService();

  public ProductControllerC() {}

  /**
   *
   * @param req
   * @param res
   */
  public async getAll(req: Request, res: Response) {
    try {
      console.log("asdfasdfasd" + this.pService);

      var result = await this.pService.getAll();

      res.status(200).send(result);
    } catch (error) {
      res.status(500).send({ message: error });
    }
  }
}

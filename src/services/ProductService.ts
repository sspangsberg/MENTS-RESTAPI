import { Product } from "../interfaces/product";
import { productModel } from "../models/productModel";

export class ProductService {
  
  /**
   *
   */
  public constructor() {}

  /**
   *
   * @returns
   */
  public async getAll() {
    const resultSet: Array<Product> = await productModel.find();
    return resultSet;
  }

  /**
   *
   * @returns
   */
  public async create(newProduct: Array<Product>) {
    productModel.insertMany(newProduct);
  }
}

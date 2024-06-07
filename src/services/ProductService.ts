import { Product } from "../interfaces/product";
import { productModel } from "../models/productModel";
import { DBManager } from "../util/DBManager";

export class ProductService {
  private dManager = new DBManager();

  /**
   *
   */
  public constructor() {}

  /**
   *
   * @returns
   */
  public async getAll() {
    
    
    
    try {
        console.log("before connect");
        await this.dManager.connect();
        //const resultSet: Array<Product> = await productModel.find();
        const resultSet = await productModel.find();
        await this.dManager.close();
    
        return resultSet;
    }
    catch (error) {
        console.log(error);
    }
  }
}

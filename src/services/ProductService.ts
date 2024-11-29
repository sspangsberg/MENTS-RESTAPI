import { Product } from "../interfaces/product";
import { productModel } from "../models/productModel";
import { ObjectId } from "mongodb";

export class ProductService {
  /**
   *
   * @returns
   */
  public async get(filterParam: Object): Promise<Array<Product>> {
    try {
      let result: Array<Product> = await productModel.find(filterParam);
      return result;
    } catch (error) {
      console.error("Error fetching products:", error);
      // Handle error appropriately, e.g., throw an error or return an empty array
      throw error; // or return [];
    }
  }

  /**
   *
   * @returns
   */
  public async create(newProducts: Array<Product>): Promise<Array<Product>> {
    try {
      /*
      newProducts.map((p) => {
        const _id = new ObjectId(p._createdBy); // we need to manually convert the string to ObjectID
        p._createdBy = _id;
      });
      */

      const result = await productModel.insertMany(newProducts);
      return result;
    } catch (error) {
      console.error("Error creating new product:", error);
      // Handle error appropriately, e.g., throw an error or return an empty array
      throw error; // or return [];
    }
  }
}

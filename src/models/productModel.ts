import { Schema, model } from "mongoose";
import { Product } from "../interfaces/product";

// Create a DB schema
const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  description: { type: String },
  imageURL: { type: String, required: true },
  price: { type: Number, required: true, cast: false },
  stock: { type: Number, required: true },
  discount: { type: Boolean, required: true, default: false },
  discountPct: { type: Number, required: true, default: 0 },
  isHidden: { type: Boolean, required: true, default: false },
  _createdBy: { type: String, ref: "User", required: true },
});

// Create a Model.
export const productModel = model<Product>("Product", productSchema);

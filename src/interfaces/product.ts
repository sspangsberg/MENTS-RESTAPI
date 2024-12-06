import { ObjectId } from "mongodb";
import { User } from "./user";

export interface Product extends Document {
  id: ObjectId;
  name: string;
  description: string;
  imageURL: string;
  price: number;
  stock: number;
  discount: boolean;
  discountPct: number;
  isHidden: boolean;
  _createdBy: User["id"];
}

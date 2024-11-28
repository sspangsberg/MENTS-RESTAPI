import { ObjectId } from "mongodb";
import { User } from "./user";

export interface Product extends Document {
  id: ObjectId;
  name: string;
  description: string;
  imageURL: string;
  price: Number;
  stock: Number;
  discount: Boolean;
  discountPct: Number;
  isHidden: Boolean;
  _createdBy: User["id"];
}

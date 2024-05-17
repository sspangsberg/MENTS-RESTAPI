import { ObjectId } from "mongodb";
//import { User } from "./user";

export interface Product extends Document {
  id: ObjectId;
  name: string;
  description: string;
  price: Number;
  stock: Number;
  status: Boolean;
  //_createdBy: User["id"];
  _createdBy: string;
}

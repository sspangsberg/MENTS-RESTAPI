import { ObjectId } from "mongodb";
import { IUser } from "./IUser";

export interface IProduct extends Document {
  id: ObjectId;
  name: string;
  description: string;
  price: Number;
  stock: Number;
  status: Boolean;
  _createdBy: IUser["id"];
}

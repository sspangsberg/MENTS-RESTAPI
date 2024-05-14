import { ObjectId } from "mongodb";

export interface User extends Document {
  id: ObjectId;
  name: string;
  email: string;
  password: string;
  registerDate: Date;
}

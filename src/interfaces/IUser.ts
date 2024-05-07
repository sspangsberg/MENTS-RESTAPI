import { ObjectId } from "mongodb";

export interface IUser extends Document {  
    id: ObjectId;
    name: string;
    email: string;
    password: string;
    registerDate: Date;
  }
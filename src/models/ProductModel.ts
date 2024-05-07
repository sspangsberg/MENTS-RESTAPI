import { Schema, model } from 'mongoose';
import { IProduct } from '../interfaces/IProduct';

// Create a DB schema
let productSchema = new Schema<IProduct>(
    {
        name: { type:String, required:true },
        description: { type:String },
        price: { type:Number, required:true },
        stock: { type:Number, required:true },
        status: { type:Boolean, required:true, default: true },
        _createdBy: { type: Schema.Types.ObjectId, ref: "User", required:true }
    }
)

// Create a Model.
export const ProductModel = model<IProduct>('Product', productSchema);
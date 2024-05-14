import { Schema, model } from 'mongoose';
import { Product } from '../interfaces/product';

// Create a DB schema
let productSchema = new Schema<Product>(
    {
        name: { type:String, required:true },
        description: { type:String },
        price: { type:Number, required:true },
        stock: { type:Number, required:true },
        status: { type:Boolean, required:true, default: true },
        //_createdBy: { type: Schema.Types.ObjectId, ref: "User", required:true }
        _createdBy: { type: String, required:true }
    }
)

// Create a Model.
export const productModel = model<Product>('Product', productSchema);
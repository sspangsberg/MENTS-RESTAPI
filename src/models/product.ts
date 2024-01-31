import { Schema, model } from 'mongoose';
import { IProduct } from '../interfaces/IProduct';

// Create a DB schema
let productSchema = new Schema<IProduct>(
    {
        name: {type:String},
        description: {type:String},
        price: {type:Number},
        inStock: {type:Boolean}
    }
)

// Create a Model.
export const Product = model<IProduct>('Product', productSchema);
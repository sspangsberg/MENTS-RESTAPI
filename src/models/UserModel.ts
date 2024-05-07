import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/IUser';

let userSchema = new Schema<IUser>(
    {
        name: { type:String, required: true, min: 6, max: 255 },
        email: { type:String, required: true, min: 6, max: 255 },
        password: { type:String, required: true, min: 6, max: 255 },
        registerDate: { type:Date, default: Date.now }
    }
);

export const UserModel = model<IUser>('User', userSchema);
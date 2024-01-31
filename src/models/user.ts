import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/IUser';

let userSchema = new Schema<IUser>(
    {
        name: { type:String, required: true, min: 6, max: 255 },
        email: { type:String, required: true, min: 6, max: 255 },
        password: { type:String, required: true, min: 6, max: 255 },
        date: { type:Date, default: Date.now }
    }
);

export const User = model<IUser>('User', userSchema);
//module.exports = mongoose.model("user", userSchema);
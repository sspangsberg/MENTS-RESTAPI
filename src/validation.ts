import Joi, { ValidationResult } from "joi";
import { IUser } from "./interfaces/IUser";

// validating registration
export const validateUserRegistrationInfo = (data: IUser): ValidationResult => {
    const schema = Joi.object(
        {
            name: Joi.string().min(6).max(255).required(),
            email: Joi.string().min(6).max(255).required(),
            password: Joi.string().min(6).max(255).required()
        });

    return schema.validate(data);
}

// validating login
export const validateUserLoginInfo = (data: IUser): ValidationResult => {
    const schema = Joi.object(
        {
            email: Joi.string().min(6).max(255).required(),
            password: Joi.string().min(6).max(255).required()
        });

    return schema.validate(data);
}
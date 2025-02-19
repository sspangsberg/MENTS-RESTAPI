// imports
import {
    type Request,
    type Response,
    type NextFunction
} from "express";

import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";
import Joi, { ValidationResult } from "joi";

// Project imports
import { userModel } from "../models/userModel";
import { User } from "../interfaces/user";
import { connect, disconnect } from '../repository/database';

/**
 * Register a new user
 * @param req 
 * @param res 
 * @returns 
 */
export async function registerUser(req: Request, res: Response) {

    try {
        // validate the user and password
        const { error } = validateUserRegistrationInfo(req.body);

        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }

        await connect();

        // check if the email is already registered
        const emailExist = await userModel.findOne({ email: req.body.email });

        if (emailExist) {
            res.status(400).json({ error: "Email already exists. " });
            return;
        }

        // has the password
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);

        // create a user object and save in the DB
        const userObject = new userModel({
            name: req.body.name,
            email: req.body.email,
            password,
        });

        const savedUser = await userObject.save();
        res.status(200).json({ error: null, data: savedUser._id });

    } catch {
        res.status(500).send("Error registering user.");
    }
    finally {
        await disconnect();
    }
};

/**
 * Login an existing user
 * @param req 
 * @param res 
 * @returns 
 */
export async function loginUser(req: Request, res: Response) {

    try {

        // validate user login inf
        const { error } = validateUserLoginInfo(req.body);

        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }

        await connect();

        // if login info is valid, find the user
        const user: User | null = await userModel.findOne({ email: req.body.email });

        // throw error if email is wrong (user does not exist in DB)
        if (!user) {
            res.status(400).json({ error: "Email is wrong. " });
            return;
        }
        else {
            // user exist - check for password correctness
            const validPassword: boolean = await bcrypt.compare(
                req.body.password,
                user.password
            );

            // throw error if password is wrong
            if (!validPassword) {
                res.status(400).json({ error: "Password is wrong. " });
                return;
            }
                
            const userId: string = user.id;

            // create authentication token with username and id
            const token: string = jwt.sign(
                // payload
                {
                    name: user.name,
                    email: user.email,
                    id: userId,
                },
                // TOKEN_SECRET,
                process.env.TOKEN_SECRET as string,
                // EXPIRATION
                { expiresIn: '2h' }
            );

            // attach auth token to header
            res.header("auth-token", token).json({
                error: null,
                data: { userId, token },
            });
        }
    }
    catch {
        res.status(500).send("Error logging in user.");
    }
    finally {
        await disconnect();
    }
};

/**
 * Middleware logic to verify our token (JWT)
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.header("auth-token");

    if (!token) {
        res.status(400).json({ error: "Access Denied." });
        return;
    }
        

    try {
        if (token)
            jwt.verify(token, process.env.TOKEN_SECRET as string);
        
        next();
        
    } catch {
        res.status(401).send("Invalid Token.");
    }
};


/*
// logic to verify whether a refresh token and its corresponding email is valid
const verifyRefresh = (email: string, refreshToken: string) => {
        try {
                const decoded = jwt.verify(refreshToken, process.env.TOKEN_SECRET as string);
                return <any>decoded.email === email;
        } catch (error) {
                return false;
        }
}
*/

/**
 * Validating registration
 * @param data 
 * @returns 
 */
export function validateUserRegistrationInfo(data: User): ValidationResult {
    const schema = Joi.object({
        name: Joi.string().min(6).max(255).required(),
        email: Joi.string().email().min(6).max(255).required(),
        password: Joi.string().min(6).max(255).required(),
    });

    return schema.validate(data);
};

/**
 * Validating login
 * @param data 
 * @returns 
 */
export function validateUserLoginInfo(data: User): ValidationResult {
    const schema = Joi.object({
        email: Joi.string().email().min(6).max(255).required(),
        password: Joi.string().min(6).max(255).required(),
    });

    return schema.validate(data);
};
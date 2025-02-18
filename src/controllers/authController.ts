// imports
import {
    type Request,
    type Response
} from "express";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Joi from "joi";

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

        await connect();

        // check if the email is already registered
        const emailExist = await userModel.findOne({ email: req.body.email });

        if (emailExist) {
            return res.status(400).json({ error: "Email already exists. " });
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

    } catch (error) {
        res.status(500).send("Error registering user. Error:" + error);
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
        const data = req.body;

        const schema = Joi.object({
            name: Joi.string().min(6).max(255).required(),
            email: Joi.string().email().min(6).max(255).required(),
            password: Joi.string().min(6).max(255).required(),
        });

        const { error } = schema.validate(data);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        await connect();

        // if login info is valid, find the user
        const user: User | null = await userModel.findOne({ email: req.body.email });

        // throw error if email is wrong (user does not exist in DB)
        if (!user) {
            return res.status(400).json({ error: "Email is wrong. " });
        }

        // user exist - check for password correctness
        const validPassword: boolean = await bcrypt.compare(
            req.body.password,
            user.password
        );

        // throw error if password is wrong
        if (!validPassword)
            return res.status(400).json({ error: "Password is wrong. " });

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
            { expiresIn: "24h" } //process.env.JWT_EXPIRES_IN as string }
        );

        // attach auth token to header
        res.header("auth-token", token).json({
            error: null,
            data: { userId, token },
        });
    }
    catch {
        res.status(500).send("Error logging in user.");
    }
    finally {
        await disconnect();
    }
};



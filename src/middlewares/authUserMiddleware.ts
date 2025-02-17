import Joi from "joi";
import {
    type Request,
    type Response,
    type NextFunction
} from "express";

import jwt from "jsonwebtoken";


/**
 * Validating user info middleware (independant of the repository)
 * @param data 
 * @returns 
 */
export function validateUserMiddleware(req: Request, res: Response, next: NextFunction) {

    const data = req.body;

    const schema = Joi.object({
        name: Joi.string().min(6).max(255).required(),
        email: Joi.string().email().min(6).max(255).required(),
        password: Joi.string().min(6).max(255).required(),
    });

    const { error } = schema.validate(data);

    if (error) {
        res.status(400).json({ error: error.details[0].message });
    }
    else
        next(); // if succesfully, pass control flow on to the controller
};



/**
 * Middleware logic to verify our token (JWT)
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export function verifyTokenMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.header("auth-token");

    if (!token) return res.status(400).json({ error: "Access Denied." });

    try {
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
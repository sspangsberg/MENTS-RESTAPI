import {
  type Request,
  type Response,
  type NextFunction
} from "express";
import { userModel } from "../models/userModel";
import { User } from "../interfaces/user";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import Joi, { ValidationResult } from "joi";

// registration
export const registerUser = async (req: Request, res: Response) => {
  // validate the user and password
  const { error } = validateUserRegistrationInfo(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

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

  try {
    const savedUser = await userObject.save();
    res.json({ error: null, data: savedUser._id });
  } catch (error) {
    res.status(400).json({ error });
  }
};

// login
export const loginUser = async (req: Request, res: Response) => {
  // validate user login inf
  const { error } = validateUserLoginInfo(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // if login info is valid, find the user
  const user: User | null = await userModel.findOne({ email: req.body.email });

  // throw error if email is wrong (user does not exist in DB)
  if (!user) {
    return res.status(400).json({ error: "Email is wrong. " });
  }

  // user exist - check for password correctness
  const validPassword: Boolean = await bcrypt.compare(
    req.body.password,
    user.password
  );

  // throw error if password is wrong
  if (!validPassword)
    return res.status(400).json({ error: "Password is wrong. " });

  const userId: ObjectId = user.id;

  // create authentication token with username and id
  const token: string = jwt.sign(
    // payload
    {
      name: user.name,
      email: user.email,
      id: userId,
    },
    // TOKEN_SECRET,
    process.env.TOKEN_SECRET!,
    // EXPIRATION
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  // attach auth token to header
  res.header("auth-token", token).json({
    error: null,
    data: { userId, token },
  });
};

// logic to verify our token (JWT)
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("auth-token");

  if (!token) return res.status(401).json({ error: "Access Denied." });

  try {
    jwt.verify(token, process.env.TOKEN_SECRET as string);
    next();
  } catch (error) {
    res.status(400).json({ error: "Token is not valid." });
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

// validating registration
const validateUserRegistrationInfo = (data: User): ValidationResult => {
  const schema = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required(),
    password: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(data);
};

// validating login
const validateUserLoginInfo = (data: User): ValidationResult => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required(),
    password: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(data);
};

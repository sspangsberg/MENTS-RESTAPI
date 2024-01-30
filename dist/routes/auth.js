"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const router = require("express").Router();
const User = require("../models/user");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// registration
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // validate the user and password
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    // check if the email is already registered
    const emailExist = yield User.findOne({ email: req.body.email });
    if (emailExist) {
        return res.status(400).json({ error: "Email already exists. " });
    }
    // has the password
    const salt = yield bcrypt.genSalt(10);
    const password = yield bcrypt.hash(req.body.password, salt);
    // create a user object and save in the DB
    const userObject = new User({
        name: req.body.name,
        email: req.body.email,
        password
    });
    try {
        const savedUser = yield userObject.save();
        res.json({ error: null, data: savedUser._id });
    }
    catch (error) {
        res.status(400).json({ error });
    }
}));
// login
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //
    // validate user login inf
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    // if login info is valid, find the user
    const user = yield User.findOne({ email: req.body.email });
    // throw error if email is wrong (user does not exist in DB)
    if (!user) {
        return res.status(400).json({ error: "Email is wrong. " });
    }
    // user exist - check for password correctness
    const validPassword = yield bcrypt.compare(req.body.password, user.password);
    // throw error if password is wrong
    if (!validPassword)
        return res.status(400).json({ error: "Password is wrong. " });
    // create authentication token with username and id
    const token = jwt.sign(
    // payload
    {
        name: user.name,
        id: user._id
    }, 
    // TOKEN_SECRET,
    process.env.TOKEN_SECRET, 
    // EXPIRATION
    { expiresIn: process.env.JWT_EXPIRES_IN });
    // attach auth token to header
    res.header("auth-token", token).json({
        error: null,
        data: { token }
    });
}));
module.exports = router;
//# sourceMappingURL=auth.js.map
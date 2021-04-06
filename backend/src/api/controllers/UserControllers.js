import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { registerValidation, loginValidation } from '../../../validation';

import User from "../models/Users";

export default {
    register: async (req, res) => {
        const { name, email, password } = req.body;
        //VALIDATE
        const { error } = registerValidation(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        try {
            //Check if user already exist
            let findUser = await User.find({ email: req.body.email });
            if (findUser.length > 0) {
                return res.status(400).send('Email already exists')
            }
            //Create user
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);

            const user = new User({
                Name: name,
                Email: email,
                Password: hashPassword
            });

            const savedUser = await user.save();
            //Create and sign Token
            const token = jwt.sign({ _id: savedUser._id }, process.env.jwtSecret, { expiresIn: 86400 });
            res.status(200).header('auth-token', token).send({ auth: true, token: token, user: savedUser });

        } catch (error) {
            res.status(4000).send(error);
        }
    },
    registerAdmin: async function (req, res) {
        const { name, email, password } = req.body;
        //VALIDATE
        const { error } = registerValidation(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        try {
            //Check if user already exist
            let findUser = await User.find({ email: req.body.email });
            if (findUser.length > 0) {
                return res.status(400).send('Email already exists')
            }
            //Create user
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);

            const user = new User({
                name: name,
                email: email,
                password: hashPassword,
                isAdmin: true,
            });

            const savedUser = await user.save();
            //Create and sign Token
            const token = jwt.sign({ _id: savedUser._id }, process.env.jwtSecret, { expiresIn: 86400 });
            res.status(200).header('auth-token', token).send({ auth: true, token: token, user: savedUser });

        } catch (error) {
            res.status(4000).send(error);
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;
        //VALIDATE
        const { error } = loginValidation(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        try {
            //Check if user already exist
            let findUser = await User.findOne({ Email: email });
            if (!findUser) {
                return res.status(400).send('Email doesnt exists')
            }
            //check if password is correct
            let isMatch = await bcrypt.compare(password, findUser.Password);

            if (!isMatch) {
                return res.status(400).send('Password invalid')
            }
            //Create and sign Token
            const token = jwt.sign({ _id: findUser._id, email: findUser.email }, process.env.jwtSecret);
            console.log(token)
            res.status(200).header('auth-token', token).send({ auth: true, token: token, user: findUser });
        } catch {
            res.status(400).send(error);
        }
    }
}

import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js';

export const register = async (req, res) => {
    const { email, password, username } = req.body;

    try {
        const userFound = await User.findOne({ email })
        if (userFound) return res.status(400).json(["The email already exists"])

        const passwordHash = await bcrypt.hash(password, 10) //cmlkn879bkjsbjbo98

        const newUser = new User({
            username,
            email,
            password: passwordHash,
        });

        const userSaved = await newUser.save(); //Save the new user created
        const token = await createAccessToken({ id: userSaved._id })

        // res.cookie('token', token);
        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production', // true en producción
        //     sameSite: 'None', // Necesario para permitir cookies cross-origin
        // });

        // const isProduction = process.env.NODE_ENV === 'production';
        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: isProduction,
        //     sameSite: isProduction ? 'None' : 'Lax',
        // });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Usa 'true' en producción
            sameSite: 'lax' // Necesario para cookies cross-origin
        });
        
        

        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        }); // Frontend does not need password info, so it is not here


    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error)
    }

};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        const userFound = await User.findOne({ email })
        if (!userFound) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, userFound.password)
        if (!isMatch) return res.status(400).json({ message: "Incorrect Password" });

        const token = await createAccessToken({ id: userFound._id })

        // // res.cookie('token', token)
        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production', // true en producción
        //     sameSite: 'None', // Necesario para permitir cookies cross-origin
        // });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Usa 'true' en producción
            sameSite: 'lax' // Necesario para cookies cross-origin
        });
        

        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        }); // Frontend does not need password info, so it is not here


    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error)
    }

};

// export const logout = (req, res) => {
//     res.cookie('token', "", {
//         expires: new Date(0)
//     })
//     return res.sendStatus(200);
// };
export const logout = (req, res) => {
    res.cookie('token', "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // true en producción
        sameSite: 'lax', // Necesario para permitir cookies cross-origin
        expires: new Date(0), // Expira inmediatamente para eliminar la cookie
    });
    return res.sendStatus(200);
};

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)
    if (!userFound) return res.status(400).json({ message: "User not found" });
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    })
};

export const verifyToken = async (req, res) => {
    const { token } = req.cookies
    if (!token) return res.status(401).json({ message: "Unauthorized" })

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: "Unauthorized" })

        const userFound = await User.findById(user.id)
        if (!userFound) return res.status(401).json({ message: "Unauthorized" })

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        });
    });
};
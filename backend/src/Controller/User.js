
// import httpStatus from "http-status";
// import { User } from "../Models/User.js";
// import bcrypt from "bcrypt";
// import crypto from "crypto";
// import mongoose from "mongoose";


// // =========================
// // LOGIN USER
// // =========================
// const login = async (req, res) => {
//     const { username, password } = req.body;

//     // Check required fields
//     if (!username || !password) {
//         return res.status(httpStatus.BAD_REQUEST).json({
//             message: "Please provide username and password"
//         });
//     }

//     try {
//         // Find user by username
//         const user = await User.findOne({ username });

//         if (!user) {
//             return res.status(httpStatus.NOT_FOUND).json({
//                 message: "User not found"
//             });
//         }

//         // Compare entered password with hashed password
//         const isPasswordCorrect = await bcrypt.compare(
//             password,
//             user.password
//         );

//         if (!isPasswordCorrect) {
//             return res.status(httpStatus.UNAUTHORIZED).json({
//                 message: "Invalid username or password"
//             });
//         }

//         // Generate token
//         const token = crypto.randomBytes(20).toString("hex");

//         // Save token
//         user.token = token;
//         await user.save();

//         // Send successful response
//         return res.status(httpStatus.OK).json({
//             token: token,
//             message: "Login successful"
//         });

//     } catch (error) {
//         console.error("LOGIN ERROR:", error);

//         return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//             message: "Something went wrong"
//         });
//     }
// };


// // =========================
// // REGISTER USER
// // =========================
// const register = async (req, res) => {
//     const { name, username, password } = req.body;

//     // Check required fields
//     if (!name || !username || !password) {
//         return res.status(httpStatus.BAD_REQUEST).json({
//             message: "Please provide name, username and password"
//         });
//     }

//     try {
//         // Check if username already exists
//         const existingUser = await User.findOne({ username });

//         if (existingUser) {
//             return res.status(httpStatus.CONFLICT).json({
//                 message: "User already exists"
//             });
//         }

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create new user
//         const newUser = new User({
//             name: name,
//             username: username,
//             password: hashedPassword
//         });

//         // Save user
//         await newUser.save();

//         return res.status(httpStatus.CREATED).json({
//             message: "User Registered"
//         });

//     } catch (error) {
//         console.error("REGISTER ERROR:", error);

//         return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//             message: "Something went wrong"
//         });
//     }
// };


// export { login, register };



import httpStatus from "http-status";
import { User } from "../Models/User.js";
import bcrypt, { hash } from "bcrypt"

import crypto from "crypto"
import { Meeting } from "../Models/meeting.js";
const login = async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Please Provide" })
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "User Not Found" })
        }


        let isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (isPasswordCorrect) {
            let token = crypto.randomBytes(20).toString("hex");

            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({ token: token })
        } else {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid Username or password" })
        }

    } catch (e) {
        return res.status(500).json({ message: `Something went wrong ${e}` })
    }
}


const register = async (req, res) => {
    const { name, username, password } = req.body;


    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(httpStatus.FOUND).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            username: username,
            password: hashedPassword
        });

        await newUser.save();

        res.status(httpStatus.CREATED).json({ message: "User Registered" })

    } catch (e) {
        res.json({ message: `Something went wrong ${e}` })
    }

}


const getUserHistory = async (req, res) => {
    const { token } = req.query;

    try {
        const user = await User.findOne({ token: token });
        const meetings = await Meeting.find({ user_id: user.username })
        res.json(meetings)
    } catch (e) {
        res.json({ message: `Something went wrong ${e}` })
    }
}

const addToHistory = async (req, res) => {
    const { token, meeting_code } = req.body;

    try {
        const user = await User.findOne({ token: token });

        const newMeeting = new Meeting({
            user_id: user.username,
            meetingCode: meeting_code
        })

        await newMeeting.save();

        res.status(httpStatus.CREATED).json({ message: "Added code to history" })
    } catch (e) {
        res.json({ message: `Something went wrong ${e}` })
    }
}


export { login, register, getUserHistory, addToHistory }
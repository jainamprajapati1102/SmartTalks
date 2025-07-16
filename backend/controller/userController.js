import { validationResult } from "express-validator";
import { createUser } from "../service/user.service.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import messageModel from "../models/message.model.js";
import mongoose from "mongoose";
export const signup = async (req, res) => {
  // console.log(req);rs
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body is empty" });
    }

    const error = validationResult(req);
    const { name, mobile } = req.body;

    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    // const hashPass = await userModel.hashedPassword(password);
    const chqMatch = await userModel.findOne({ mobile });
    if (chqMatch) {
      return res.status(300).json({ msg: "Mobile has already register" });
    }
    const user = await createUser({ name, mobile });
    const token = await user.generateToken();

    res.status(200).json({ user, token });
    // res.end();
  } catch (error) {
    console.log(error);
  }
};

export const signin = async (req, res) => {
  try {
    const { mobile } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await userModel.findOne({ mobile });
    if (!user) {
      return res.status(401).json({ msg: "Invalid mobile or Password" });
    }

    // const isMatch = user.comparePassword(password);
    // if (!isMatch) {
    //   return res.status(401).json({ message: "Invalid mobile and password" });
    // }
    const token = await user.generateToken();
    if (token) {
      res
        .status(200)
        .cookie("token", token, {
          httpOnly: false,
          secure: process.env.NODE_ENV === "production", // true in production
          sameSite: "Lax", // or "Strict"
          maxAge: 24 * 60 * 60 * 1000, // 1 day
        })
        .json({ msg: "Login successful", user });
      // res.end();
    } else {
      res.send("Token not generate");
    }
  } catch (error) {
    console.log(error.message);
  }
};

// in userController.js
export const getMe = async (req, res) => {
  try {
    const token = req.cookies.token;
    // console.log(token);

    if (!token) return res.status(401).json({ msg: "Not Authenticated" });

    const decoded = jwt.verify(token, "sm?>{}+arttal!_&&*k?@s"); //process.env.JWT_SECRET);
    console.log(decoded._id);
    if (decoded._id) {
      const user = await userModel.findById(decoded._id).select("-password");
      res.json({ user });
    }
  } catch (error) {
    // console.log(error);
    res.status(401).json({ msg: "Invalid or expired token" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ msg: "Logged out" });
};

export const search_user = async (req, res) => {
  // console.log(req.body);

  console.log("search_user-->" + req.body.mobile);
  try {
    const { mobile } = req.body;

    if (mobile) {
      let keyword = mobile.trim();
      // const find_user = await userModel.findOne({ mobile });
      const find_user = await userModel.find({
        $or: [{ mobile: { $regex: keyword } }, { name: { $regex: keyword } }],
      });
      // console.log(find_user);

      if (find_user) {
        res.status(200).json({ find_user });
      } else {
        res.status(400).json({ msg: "No results found for " + mobile });
      }
    } else {
      res.send({ msg: "mobile is not defined" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const exist_msg = async (req, res) => {
  try {
    const { id } = req.body;
    let decode_user = jwt.verify(id, "sm?>{}+arttal!_&&*k?@s");
    // const response = await messageModel.find({ receiver_id: decode_user._id });
    const receiverId = new mongoose.Types.ObjectId(decode_user._id);
    const response = await messageModel.aggregate([
      {
        $match: { receiver_id: receiverId },
      },
      {
        $group: {
           _id: "$sender_id",
          msg: { $push: "$$ROOT" },
          lastMsgTime: { $last: "$createdAt" },
        },
      },
      {
        $sort: { lastMsgTime: -1 },
      },
    ]);
    if (response) {
      res.status(200).send({ exist: response });
    }
  } catch (error) {
    console.log("err frm exist msg-->", error);
  }
};

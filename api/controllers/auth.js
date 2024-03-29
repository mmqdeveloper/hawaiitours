import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import errors from "../constants/errors.js";
import { authValidations } from "../validations/authValidations.js";

export const register = async (req, res, next) => {
  try {
    const registerReq = req.body;
    const {error} = authValidations.registerValidation.validate(registerReq);
    
    if (error) {
      return res.status(400).json({message: error.details[0].message});
    }
   
    const token = req.cookies.access_token;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT);
        if (decoded && decoded.isAdmin) {
          reqIsAdmin = registerReq.isAdmin;
          
        }
      } catch (err) {
        console.error("JWT verification error:", err);
      }
    }

    const checkExistedUsername = await User.findOne({username: registerReq.username});
    if (checkExistedUsername) return next(createError(errors.EXISTED_USERNAME.status, errors.EXISTED_USERNAME.message));

    const checkExistedEmail = await User.findOne({ email: registerReq.email });
    if (checkExistedEmail) return next(createError(errors.EXISTED_EMAIL.status, errors.EXISTED_EMAIL.message));

    const checkExistedPhone = await User.findOne({ phone: registerReq.phone })
    if (checkExistedPhone) return next(createError(errors.EXISTED_PHONE.status, errors.EXISTED_PHONE.message));


    var reqIsAdmin = false;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...registerReq,
      password: hash,
      isAdmin: reqIsAdmin,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res) => {
  res.clearCookie("access_token"); // Clear cookie
  res.status(200).json({ message: "Logout successful" });
};
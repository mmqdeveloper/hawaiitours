import Role from "../models/Role.js";
import User from "../models/User.js";
import { authValidations } from "../validations/authValidations.js";

export const updateUser = async (req,res,next)=>{
  try {
    const updatedUserReq = req.body;
    console.log(updatedUserReq.role);
    // const {error} = authValidations.authValidations.validate(updatedUserReq);
    const {error} = authValidations.registerValidation.validate(updatedUserReq);
    const checkRole = await Role.findOne({name: updatedUserReq.role});
    if (!checkRole) return next(createError(404, "Role not found"));

    updatedUserReq.role = checkRole._id;


    if (error) {
      return res.status(400).json({message: error.details[0].message});
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updatedUserReq },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}
export const deleteUser = async (req,res,next)=>{
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
}
export const getUser = async (req,res,next)=>{
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}
export const getUsers = async (req,res,next)=>{
  try {
    const users = await User.find().populate({path: 'role', select: 'name'});
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}
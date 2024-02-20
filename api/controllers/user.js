import Role from "../models/Role.js";
import User from "../models/User.js";
import { createError } from "../utils/error.js";
import { ResponseSuccess } from "../utils/responseSuccess.js";
import { authValidations } from "../validations/authValidations.js";

export const updateUser = async (req,res,next)=>{
  try {
    const updatedUserReq = req.body;
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
    return ResponseSuccess(updatedUser, res, "Updated Successfully")
  } catch (err) {
    next(err);
  }
}
export const deleteUser = async (req,res,next)=>{
  try {
    await User.findByIdAndDelete(req.params.id);
    if (!User) {
      return createError(500, "User not found!"); 
    }
    return ResponseSuccess(User, res, "Deleted User Successfully");
  } catch (err) {
    return createError(500, "Delete User Error");
  }
}
export const getUser = async (req,res,next)=>{
  try {
    const user = await User.findById(req.params.id).populate({path: "role", select: "name"});
    return ResponseSuccess(user, res ,"Get User Successfully");
  } catch (err) {
    next(err);
  }
}
export const getUsers = async (req,res,next)=>{
  try {
    const users = await User.find().populate({path: 'role', select: 'name'});
    return ResponseSuccess(users, res ,"Get List Successfully");
  } catch (err) {
    next(err);
  }
}
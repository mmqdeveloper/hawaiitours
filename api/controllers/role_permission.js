import Role from "../models/Role.js";
import { Permission, PermissionCategory } from "../models/Permission.js";
import { createError } from "../utils/error.js";
import errors from "../constants/errors.js";

const createPermissionCategory = async (req, res, next) => {
    try {
        const permissionCateReq = req.body;
        
        const name = permissionCateReq.name;
        if (!name || name == "") {
            return next(createError(400, "Name is required"));
        }
        const checkName = await PermissionCategory.findOne({name: name});
        if (checkName) return next(createError(errors.EXISTED_NAME.status, errors.EXISTED_NAME.message));

        const newPermissionCate = new PermissionCategory({
            name: permissionCateReq.name
        })

        await newPermissionCate.save();

        res.status(200).json(newPermissionCate);

    } catch (err) {
        return createError(500, "Create Permission Category Error");
    }
}

const updatePermissionCategory = async (req, res, next) => {
    try {
        const permissionCateReq = req.body;
        const permissionCateID = req.params.id;
        const name = permissionCateReq.name;
        if (!name || name == "") {
            return next(createError(400, "Name is required"));
        }

        const checkName = await PermissionCategory.findOne({name: name, _id:{$ne: permissionCateID}});
        if (checkName) return next(createError(errors.EXISTED_NAME.status, errors.EXISTED_NAME.message));

        const updatePermissionCate = await PermissionCategory.findByIdAndUpdate(
            permissionCateID,
            {$set: req.body},
            {new:true}
        )

        res.status(200).json(updatePermissionCate);
    } catch (error) {
        return createError(500, "Update Permission Category Error");
    }
}

const getAllPermissionCategories = async (req, res, next) => {
    try {
        const permissionCategories = await PermissionCategory.find();

        res.status(200).json(permissionCategories)
    } catch (error) {
        return createError(500, "Get Permission Categories Error");
    }
}

const getPermissionCategory = async (req, res, next) => {
    try {
        const permissionCategories = await PermissionCategory.find();

        res.status(200).json(permissionCategories)
    } catch (error) {
        return createError(500, "Get Permission Categories Error");
    }
}

export {
    createPermissionCategory,
    updatePermissionCategory,
    getAllPermissionCategories
}
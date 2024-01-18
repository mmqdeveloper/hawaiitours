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
        if (permissionCategories?.length == 0) {
            return createError(404, "Not Found any Permission Categories");
        }
        res.status(200).json(permissionCategories)
    } catch (error) {
        return createError(500, "Get Permission Categories Error");
    }
}

const getPermissionCategory = async (req, res, next) => {
    try {
        const permissionCategoryId = req.params.id;
        const permissionCategory = await PermissionCategory.findById(permissionCategoryId);
        if (!permissionCategory) {
            return next(createError(404, "Permission Category not found"));
        }

        res.status(200).json(permissionCategory);
    } catch (error) {
        return createError(500, "Get Permission Categories Error");
    }
}

const deletePermissionCategory = async (req, res, next) => {
    try {
        const permissionCategoryId = req.params.id;

        const permissionToDelete = await Permission.find({category: permissionCategoryId});
     
        if (permissionToDelete.length > 0) {
            for( const permission of permissionToDelete) {
                const roleWithPermissionToDelete = await Role.find({permissions: permission._id});
                    if (roleWithPermissionToDelete.length > 0) {
                        for(const role of roleWithPermissionToDelete){
                            role.permissions = role.permissions.filter(permissionId => permissionId !== permission._id);

                            await role.save();
                        }
                    }
                
                await Permission.findByIdAndDelete(permission._id);
                
            } 
        }
        const deletePermissionCategory = await PermissionCategory.findByIdAndDelete(permissionCategoryId);
        if (!deletePermissionCategory) {
            return next(createError(404, "Permission Category not found"));
        }
        res.status(200).json("Deleted Permission Category Successfully");

    }catch (err){
        return createError(500, "Delete Permission Categories Error");
    }
}


// PERMISSION

const createPermission = async (req, res, next) => {
    try {
        const permissionReq = req.body;
        
        const name = permissionReq.name;
        const categoryName = permissionReq.category;
        
        if (!name || name == "") return next(createError(400, "Name is required"));
        if (!categoryName || categoryName == "") return next(createError(400, "Categoty is required"));

        const checkName = await Permission.findOne({name: name});
        if (checkName) return next(createError(errors.EXISTED_NAME.status, errors.EXISTED_NAME.message));

        const permissionCategory = await PermissionCategory.findOne({name: categoryName});
        if(!permissionCategory) return next(createError(400, "Category not found"));

        const newPermission = new Permission({
            name: permissionReq.name,
            category: permissionCategory._id,
        })

        await newPermission.save();

        res.status(200).json(newPermission);

    } catch (err) {
        return createError(500, "Create Permission Category Error");
    }
}

const getAllPermissions = async(req, res, next) => {
    try {
        const permissions = await Permission.find().populate('category');

        res.status(200).json(permissions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getPermissionsbyCategory = async (req, res, next) => {
    try {
        const cateId = req.params.id;

        const permissions = await Permission.find({category: cateId});

        res.status(200).json(permissions);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
        
    }
}

const updatePermission = async (req, res, next) => {
    try {
        const permissionReq = req.body;
        const permissionId = req.params.id;

        const name = permissionReq.name;
        const categoryName = permissionReq.category;

        if (!name || name == "") {
            return next(createError(400, "Name is required"));
        }

        const checkName = await Permission.findOne({name: name, _id: {$ne: permissionId}});
        if (checkName) return next(createError(errors.EXISTED_NAME.status, errors.EXISTED_NAME.message));

        const checkCate = await PermissionCategory.findOne({name: categoryName});
        if (!checkCate) return next(createError(404, "Category not found"));
        
        permissionReq.category = checkCate._id

        const updatePermission = await Permission.findByIdAndUpdate(
            permissionId,
            {$set: permissionReq},
            {new: true}
        )

        res.status(200).json(updatePermission);
    } catch (error) {
        return createError(500, "Update Permission Error")
    }
}

const deletePermission = async (req, res, next) => {
    try {
        const permissionId = req.params.id;
        const deletePermission = await Permission.findByIdAndDelete(permissionId);
        if (!deletePermission) {
            return next(createError(404, "Permission not found"));
        }
        res.status(200).json("Deleted Permission Successfully");

    }catch (err){
        return createError(500, "Delete Permission Categories Error");
    }
}

// ROLE

const createRole = async(req, res, next) => {
    try {
        const {name, permissions} = req.body;

        const permissionsId = [];

        if (!name || name == "") return next(createError(400, "Name is required"));

        const checkName = await Role.findOne({name: name});
        if (checkName) return next(createError(errors.EXISTED_NAME.status, errors.EXISTED_NAME.message));

        if (!Array.isArray(permissions)){
            return next(createError(400,"Permissions should be an array"));
        } else {
            for (const permissionName of permissions){
                const checkPermission = await Permission.findOne({name: permissionName});
    
                if (!checkPermission) {
                    return next(createError(400, `Permission '${permissionName}' not found`))
                }
    
                permissionsId.push(checkPermission._id);
            }
        }
        const newRole = new Role({
            name: name,
            permissions: permissionsId
        })

        await newRole.save();

        res.status(201).json(newRole);

    } catch (error) {
        return createError(500, "Create Role Error");
    }
}

const getAllRoles = async (req, res, next) => {
    try {
        const roles = await Role.find().populate({path: 'permissions', select: 'name'})

        res.status(200).json(roles)
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getRolebyName = async (req, res, next) => {
    try {
        const name = req.params.name
        const role = await Role.findOne({name: name}).populate({path: 'permissions', select: '-category'})
        if (!role) {
            return next(createError(404, "Role not found"));
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getRolebyPermission = async (req, res, next) => {
    try {
        const permission = req.params.permission;
        const checkPermission = await Permission.findById(permission);
        if (!checkPermission) return next(createError(404, "Permission not found")); 
        const role = await Role.find({permission: permission}).populate({path: 'permissions', select: '-category'})
        if (!role) {
            return next(createError(404, "Role not found"));
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getRole = async (req, res, next) => {
    try {
        const roleId = req.params.id
        const role = await Role.findById(roleId).populate({path: 'permissions', select: 'name'})
        if (!role) {
            return next(createError(404, "Role not found"));
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const updateRole = async (req, res, next) => {
    try {
        const roleId = req.params.id;
        const updateRoleReq = req.body;
        const {name, permissions} = updateRoleReq;
        const permissionsId = [];

        if (!name || name == "") return next(createError(400, "Name is required"));

        const checkName = await Role.findOne({name: name, _id:{$ne: roleId}});
        if (checkName) return next(createError(errors.EXISTED_NAME.status, errors.EXISTED_NAME.message));

        if (!Array.isArray(permissions)) {
            return next(createError(400,"Permissions should be an array"));
        } else {
            for(const permissionName of permissions){
                const checkPermission = await Permission.findOne({name: permissionName});

                if (!checkPermission) {
                    return next(createError(400, `Permission ${permissionName} not found`));
                }

                permissionsId.push(checkPermission._id);
            }
        }
        updateRoleReq.permissions = permissionsId;
        const updatedRole = await Role.findByIdAndUpdate(
            roleId,
            {$set: updateRoleReq },
            {new: true}
        )

        if (!updatedRole) {
            return next(createError(404, "Role not found"))
        }

        res.status(200).json(updatedRole)


    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const deleteRole = async (req, res, next) => {
    try {
        const roleId = req.params.id;
        const deletedRole = await Role.findByIdAndDelete(roleId);
        if (!deletedRole) {
            return next(createError(404, "Role not found"))
        }

        res.status(200).json("Deleted Role Successfully");
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
export {
    createPermissionCategory,
    updatePermissionCategory,
    getAllPermissionCategories,
    getPermissionCategory,
    deletePermissionCategory,
    createPermission,
    updatePermission,
    getAllPermissions,
    getPermissionsbyCategory,
    deletePermission,
    createRole,
    getAllRoles,
    getRolebyName,
    getRolebyPermission,
    getRole,
    updateRole,
    deleteRole
}
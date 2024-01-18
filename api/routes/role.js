import express from "express";
import { 
    createPermissionCategory, 
    deletePermissionCategory, 
    getAllPermissionCategories, 
    getPermissionCategory, 
    updatePermissionCategory ,
    createPermission,
    getAllPermissions,
    getPermissionsbyCategory,
    createRole,
    getAllRoles,
    getRole,
    updateRole,
    deleteRole,
    updatePermission,
    deletePermission,
    getRolebyPermission
} from "../controllers/role_permission.js";


const router = express.Router();


router.get("/permission-category", getAllPermissionCategories);
router.get("/permission-category/:id", getPermissionCategory);
router.post("/permission-category", createPermissionCategory);
router.put("/permission-category/:id", updatePermissionCategory);
router.delete("/permission-category/:id", deletePermissionCategory);

router.get("/permission", getAllPermissions);
router.get("/permission-by-category/:id", getPermissionsbyCategory);
router.post("/permission", createPermission);
router.put("/permission/:id", updatePermission);
router.delete("/permission/:id", deletePermission);

router.get("/role-by-permission/:id", getRolebyPermission);
router.get("/", getAllRoles);
router.get("/:id", getRole);
router.post("/", createRole);
router.put("/:id", updateRole);
router.delete("/:id", deleteRole);



export default router;
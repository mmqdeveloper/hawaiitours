import mongoose from "mongoose";

const permissionCategorySchema = new mongoose.Schema({
    name: {

       type: String,
       required: true
    }
})

const PermissionCategory= mongoose.model("PermissionCategory", permissionCategorySchema);

const permissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PermissionCategory'
    }
})

const Permission = mongoose.model("Permission", permissionSchema);

export {
    PermissionCategory,
    Permission
}
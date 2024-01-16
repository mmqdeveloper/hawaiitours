import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    permission: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission'
    }]
})

const Role = mongoose.model("Role", roleSchema);
export default Role;
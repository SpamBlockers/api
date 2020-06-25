const { v4: uuid } = require(`uuid`);
const mongoose = require(`mongoose`);

const permissions = [`user`, `admin`];

const userSchema = new mongoose.Schema(
    {
        userID: {
            type: Number,
            required: true,
            unique: true,
        },
        key: {
            type: String,
            unique: true,
            default: () => uuid(),
        },
        permission: {
            type: String,
            enum: permissions,
            default: `user`,
        },
        banned: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

const User = mongoose.model(`User`, userSchema);

module.exports = User;
module.exports.permissions = permissions;

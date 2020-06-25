const asyncHandler = require(`express-async-handler`);
const createError = require(`http-errors`);
const User = require(`../models/user`);

module.exports = (permission = `user`) => {
    if (!User.permissions.includes(permission)) {
        throw new Error(`Invalid permission: ${permission}`);
    }

    const requiredPermissionLevel = User.permissions.indexOf(permission);

    return asyncHandler(async (req, res, next) => {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return next(createError(401, `Unauthorized`));
        }

        const [, key] = authorization.split(` `);
        if (!key) {
            return next(createError(401, `Unauthorized`));
        }

        const user = await User.findOne({ key });
        if (!user) {
            return next(createError(401, `Unauthorized`));
        }

        const permissionLevel = User.permissions.indexOf(user.permission);
        if (permissionLevel < requiredPermissionLevel) {
            return next(createError(403, `Forbidden`));
        }

        req.user = user;
        next();
    });
};

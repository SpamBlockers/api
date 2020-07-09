const { createUserSchema } = require(`../validators/users`);
const { ValidationError } = require(`@hapi/joi`);
const asyncHandler = require(`express-async-handler`);
const authenticate = require(`../middleware/authenticate`);
const createError = require(`http-errors`);
const express = require(`express`);
const User = require(`../models/user`);

const router = express.Router();

router.get(
    `/`,
    authenticate(`admin`),
    asyncHandler(async (req, res, next) => {
        const { permission } = req.query;
        const query = User.permissions.includes(permission) ? { permission } : {};

        try {
            const users = await User.find(query);

            res.json({
                ok: true,
                result: users.map(user => ({
                    userID: user.userID,
                    key: user.key,
                    permission: user.permission,
                    banned: user.banned,
                    createdAt: user.createdAt.getTime(),
                    updatedAt: user.updatedAt.getTime(),
                })),
            });
        } catch (error) {
            next(createError());
        }
    }),
);

router.get(
    `/:id(\\d+)`,
    authenticate(`admin`, true),
    asyncHandler(async (req, res, next) => {
        const userID = Number(req.params.id);
        let result = null;

        try {
            const user = await User.findOne({ userID });

            if (user) {
                result = {
                    userID: user.userID,
                    key: user.key,
                    permission: user.permission,
                    banned: user.banned,
                    createdAt: user.createdAt.getTime(),
                    updatedAt: user.updatedAt.getTime(),
                };
            }
        } catch (error) {
            return next(createError());
        }

        res.json({
            ok: true,
            result,
        });
    }),
);

router.post(
    `/`,
    authenticate(`admin`, true),
    asyncHandler(async (req, res, next) => {
        let body;

        try {
            body = await createUserSchema.validateAsync(req.body);
        } catch (error) {
            if (error instanceof ValidationError) {
                return next(createError(400, error.details[0].message));
            }

            return next(createError());
        }

        const newUser = new User({
            userID: body.userID,
            permission: body.permission,
        });

        try {
            await newUser.save();
        } catch (error) {
            if (error.code === 11000) {
                return next(createError(400, `Duplicate key`));
            }

            return next(createError());
        }

        res.json({
            ok: true,
            result: {
                userID: newUser.userID,
                key: newUser.key,
                permission: newUser.permission,
                banned: newUser.banned,
                createdAt: newUser.createdAt.getTime(),
                updatedAt: newUser.updatedAt.getTime(),
            },
        });
    }),
);

router.delete(
    `/`,
    authenticate(`admin`),
    asyncHandler(async (req, res, next) => {
        // TODO
        next(createError(501));
    }),
);

module.exports = router;

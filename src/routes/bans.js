const { createBanSchema } = require(`../validators/bans`);
const { ValidationError } = require(`@hapi/joi`);
const asyncHandler = require(`express-async-handler`);
const authenticate = require(`../middleware/authenticate`);
const Ban = require(`../models/ban`);
const createError = require(`http-errors`);
const express = require(`express`);

const router = express.Router();

router.get(
    `/`,
    authenticate(`user`),
    asyncHandler(async (req, res, next) => {
        const accepts = req.accepts([`text`, `json`]);
        if (!accepts) {
            return next(createError(406));
        }

        switch (accepts) {
            case `text`: {
                const bans = await Ban.find();
                return res.header(`Content-Type`, `text/plain`).send(bans.map(ban => ban.userID).join(`\n`));
            }

            case `json`:
            default:
                return next(createError(501));
        }
    }),
);

router.get(
    `/:id(\\d+)`,
    authenticate(`user`),
    asyncHandler(async (req, res, next) => {
        const userID = Number(req.params.id);

        try {
            const ban = await Ban.findOne({ userID });

            res.json({
                ok: true,
                result: {
                    userID: ban.userID,
                    reason: ban.reason,
                    admin: ban.admin,
                    createdAt: ban.createdAt.getTime(),
                    updatedAt: ban.updatedAt.getTime(),
                },
            });
        } catch (error) {
            next(createError());
        }
    }),
);

router.post(
    `/`,
    authenticate(`admin`),
    asyncHandler(async (req, res, next) => {
        let body;

        try {
            body = await createBanSchema.validateAsync(req.body);
        } catch (error) {
            if (error instanceof ValidationError) {
                return next(createError(400, error.details[0].message));
            }

            return next(createError());
        }

        const ban = await Ban.findOneAndUpdate(
            { userID: body.userID },
            {
                $set: {
                    reason: body.reason,
                    admin: req.user._id,
                },
            },
            { upsert: true },
        );

        if (ban && ban.reason === body.reason) {
            return res.json({
                ok: false,
                message: `That user is already banned with the same reason`,
            });
        }

        res.json({
            ok: true,
            result: null,
        });
    }),
);

module.exports = router;

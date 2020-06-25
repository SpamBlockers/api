const Joi = require(`@hapi/joi`);
const User = require(`../models/user`);

const createUserSchema = Joi.object({
    userID: Joi.number().integer().greater(0).required(),
    permission: Joi.string()
        .default(`user`)
        .valid(...User.permissions),
});

module.exports = {
    createUserSchema,
};

const Joi = require(`@hapi/joi`);

const createBanSchema = Joi.object({
    userID: Joi.number().integer().greater(0).required(),
    reason: Joi.string().default(null),
});

module.exports = {
    createBanSchema,
};

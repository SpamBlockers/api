/**
 * @api {GET} /users Get a list of all users
 * @apiVersion 1.0.0
 * @apiPermission admin
 * @apiGroup Users
 *
 * @apiSuccess {Boolean} ok <code>true</code>
 * @apiSuccess {Object[]} result The list of users
 * @apiSuccess {Number} result.userID The users Telegram ID
 * @apiSuccess {String} result.key The API key of the user
 * @apiSuccess {String = admin, user} result.permission The permission level of the user
 * @apiSuccess {Number} result.createdAt The date the user was first banned
 * @apiSuccess {Boolean} result.banned Whether the user is banned or not (not implemented yet)
 * @apiSuccess {Number} result.updatedAt The date when the users ban was updated
 *
 * @apiSuccessExample Success response:
 * {
 *     "ok": true,
 *     "result": [
 *         {
 *             "userID": 777000,
 *             "key": "fad88200-f4ff-4d71-ad73-e21239d1cba7",
 *             "permission": "user",
 *             "banned": false,
 *             "createdAt": 1589996262000,
 *             "updatedAt": 1589996262000
 *         }
 *     ]
 * }
 *
 * @apiUse APIKeyError
 */

/**
 * @api {GET} /users/:id Get a specific user by their Telegram ID
 * @apiVersion 1.0.0
 * @apiPermission admin
 * @apiGroup Users
 *
 * @apiSuccess {Boolean} ok <code>true</code>
 * @apiSuccess {Object} result The user object
 * @apiSuccess {Number} result.userID The users Telegram ID
 * @apiSuccess {String} result.key The API key of the user
 * @apiSuccess {String = admin, user} result.permission The permission level of the user
 * @apiSuccess {Number} result.createdAt The date the user was first banned
 * @apiSuccess {Boolean} result.banned Whether the user is banned or not (not implemented yet)
 * @apiSuccess {Number} result.updatedAt The date when the users ban was updated
 *
 * @apiSuccessExample Success response:
 * {
 *     "ok": true,
 *     "result": {
 *         "userID": 777000,
 *         "key": "fad88200-f4ff-4d71-ad73-e21239d1cba7",
 *         "permission": "user",
 *         "banned": false,
 *         "createdAt": 1589996262000,
 *         "updatedAt": 1589996262000
 *     }
 * }
 *
 * @apiUse APIKeyError
 */

/**
 * @api {POST} /users Create a new user
 * @apiVersion 1.0.0
 * @apiPermission admin
 * @apiGroup Users
 *
 * @apiParam {Number} userID The users Telegram ID
 * @apiParam {String = admin, user} [permission = user] The permission level of the user
 *
 * @apiSuccess {Boolean} ok <code>true</code>
 * @apiSuccess {Object} result The new user
 * @apiSuccess {Number} result.userID The users Telegram ID
 * @apiSuccess {String} result.key The API key of the user
 * @apiSuccess {String = admin, user} result.permission The permission level of the user
 * @apiSuccess {Boolean} result.banned Whether the user is banned or not (not implemented yet)
 * @apiSuccess {Number} result.createdAt The date the user was first banned
 * @apiSuccess {Number} result.updatedAt The date when the users ban was updated
 *
 * @apiSuccessExample Success response:
 * {
 *     "ok:": true,
 *     "result": {
 *         "userID": 777000,
 *         "key": "fad88200-f4ff-4d71-ad73-e21239d1cba7",
 *         "permission": "user",
 *         "banned": false,
 *         "createdAt": 1589996262000,
 *         "updatedAt": 1589996262000
 *     }
 * }
 *
 * @apiUse APIKeyError
 * @apiError BadRequest The user already exists
 */

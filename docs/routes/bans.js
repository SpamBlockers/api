/**
 * @api {GET} /bans Get a list of all bans
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiGroup Bans
 *
 * @apiHeader {String = text/plain} Accept
 *
 * @apiSuccessExample Success response:
 * 924244294
 * 1108273046
 * 1161696521
 * 1003578160
 *
 * @apiUse APIKeyError
 * @apiError NotAcceptable The <code>Accept</code> header must be <code>text/plain</code>
 */

/**
 * @api {GET} /bans/:id Get a ban by ID
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiGroup Bans
 *
 * @apiSuccess {Boolean} ok <code>true</code>
 * @apiSuccess {Object} result The ban object
 * @apiSuccess {Number} result.userID The users Telegram ID
 * @apiSuccess {String} result.reason The reason the user was banned
 * @apiSuccess {Number} result.admin The internal ID of the admin who banned the user
 * @apiSuccess {Number} result.createdAt The date the user was first banned
 * @apiSuccess {Number} result.updatedAt The date when the users ban was updated
 *
 * @apiSuccessExample Success response:
 * {
 *     "ok": true,
 *     "result": {
 *         "userID": 777000,
 *         "reason": "Banning users for no reason",
 *         "admin": "5ee6d7c714c6ff96a6447a95",
 *         "createdAt": 1593474414692,
 *         "updatedAt": 1593474414692
 *     }
 * }
 *
 * @apiUse APIKeyError
 */

/**
 * @api {POST} /bans Add or update a ban
 * @apiVersion 1.0.0
 * @apiPermission admin
 * @apiGroup Bans
 *
 * @apiParam {Number} userID The users Telegram ID
 * @apiParam {String} [reason] The reason the user is being banned
 *
 * @apiSuccess {Boolean} ok <code>true</code>
 * @apiSuccess {Object} result <code>null</code>
 *
 * @apiSuccessExample Success response:
 * {
 *     "ok": true,
 *     "result": null
 * }
 *
 * @apiUse APIKeyError
 */

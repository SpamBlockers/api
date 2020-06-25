const bansRouter = require(`./routes/bans`);
const express = require(`express`);
const usersRouter = require(`./routes/users`);

const router = express.Router();

router.use(`/users`, usersRouter);
router.use(`/bans`, bansRouter);

module.exports = router;

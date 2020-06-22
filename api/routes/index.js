const router = require('express').Router();
const usersRouter = require('./users');
const authRouter = require('./auth');

router.get('/status', (req, res) => {
  res.send({ status: 'up' });
});

router.use('/users', usersRouter);
router.use('/auth', authRouter);

module.exports = router;

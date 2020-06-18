const router = require('express').Router();
const usersRouter = require('./users');

router.get('/status', (req, res) => {
  res.send({ status: 'up' });
});

router.use('/users', usersRouter);

module.exports = router;

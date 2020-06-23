const router = require('express').Router();
const authRouter = require('./auth');

router.get('/status', (req, res) => {
  res.send({ status: 'up' });
});

router.use('/auth', authRouter);

module.exports = router;

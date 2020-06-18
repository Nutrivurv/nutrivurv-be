const router = require('express').Router();

router.get('/status', (req, res) =>{
  res.send({ status: 'up' });
});

module.exports = router;

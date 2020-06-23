const router = require('express').Router();
const { Users } = require('../controllers');

router.get('/', async (req, res) => {
  try {
    const users = await Users.getAllUsers();
    res.status(200).json({ users })
}  catch (error) {
    res.send(500).json({ error: error.message });
  }
})

router.get('/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const user = await Users.getUserBy({ email });
    user
    ? res.status(200).json(user)
    : res.status(404).json({error: 'no user found by the provided email'});
  } catch (error) {
    res.send(500).json({ error });
  }
});

module.exports = router;

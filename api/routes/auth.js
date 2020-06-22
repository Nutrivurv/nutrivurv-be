const router = require('express').Router();
const { Users } = require('../controllers');
const hashPassword = require('../../utils/hashPassword');

router.post('/register',async (req, res) => {
  const registrationDetails = req.body;
  const hash = await hashPassword(registrationDetails.password);
  const newUser = { ...registrationDetails,  password: hash }
  try {
    const registeredUser = await Users.addUser(newUser);
    return registeredUser.name === 'error'
      ? res.status(401).json({ message: 'missing details' })
      : res.status(201).json(registeredUser)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

const router = require('express').Router();
const { Users } = require('../controllers');
const hashPassword = require('../../utils/hashPassword');
const generateToken = require('../../utils/generateToken');
const validateLogin = require('../../utils/validateLogin');

router.post('/register',async (req, res) => {
  const registrationDetails = req.body;
  const hash = await hashPassword(registrationDetails.password);
  const newUser = { ...registrationDetails,  password: hash }
  try {
    const registeredUser = await Users.addUser(newUser);
    const token = generateToken(registeredUser.id);
    return registeredUser.name === 'error'
      ? res.status(401).json({ message: 'missing details' })
      : res.status(201).json({ message: `${registeredUser.username} registered!`, token })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const logginIn = await Users.getUserBy({ username });
    const checkUser = { username: logginIn.username, password: logginIn.password }
    if (checkUser){
      const { user, token } = await validateLogin(password, checkUser)
      res.status(200).json({ message: `Welcome ${user.username}`, token })
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});

module.exports = router;

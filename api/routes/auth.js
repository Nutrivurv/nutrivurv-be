const router = require('express').Router();
const { Users } = require('../controllers');
const hashPassword = require('../../utils/hashPassword');
const generateToken = require('../../utils/generateToken');
const { getUserBy } = require('../controllers/users');
const bcrypt = require('bcryptjs');
const validateRegistration = require('../../utils/validateRegistration');
const validateLogin = require('../../utils/validateLogin');

router.post('/register', validateRegistration, async (req, res) => {
  let newUser = req.body;
  newUser.password = await hashPassword(req.body.password);

  try {
    newUser = await Users.addUser(newUser);

    res.status(201).json({
      message: `${newUser.email} has been registered.`,
      token: generateToken(newUser.id),
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
});

router.post('/login', validateLogin, async (req, res) => {
  let user = req.body;
  let password = user.password;

  try {
    user = await Users.getUserBy({ email: user.email });

    if (!(await bcrypt.compare(password, user.password))) {
      res.status(400).json({
        message: 'Invalid credentials',
      });
    }

    res.status(200).json({
      message: `${user.email} has been authenticated.`,
      token: generateToken(user.id),
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
});

module.exports = router;

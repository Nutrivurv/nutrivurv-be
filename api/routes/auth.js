const router = require('express').Router();
const { Users } = require('../controllers');
const hashPassword = require('../../utils/hashPassword');
const generateToken = require('../../utils/generateToken');
const { getUserBy } = require('../controllers/users');
const bcrypt = require('bcryptjs');
const validateRegistration = require('../../utils/validateRegistration');
const validateLogin = require('../../utils/validateLogin');

router.post('/register', validateRegistration, async (req, res) => {
  const newUser = req.body;
  newUser.password = await hashPassword(req.body.password);

  try {
    const user = await Users.addUser(newUser);

    delete user.password;

    res.status(201).json({
      message: `New account created`,
      token: generateToken(user.id),
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
});

router.post('/login', validateLogin, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.getUserBy({ email });

    if (!user) {
      res.status(401).json({
        message: `No account associated with ${email}`,
      });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      res.status(401).json({
        message: 'Invalid password provided',
      });
    }

    delete user.password;

    res.status(200).json({
      message: `User is authenticated`,
      token: generateToken(user.id),
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
});

module.exports = router;

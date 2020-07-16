const router = require('express').Router();
const { Users } = require('../controllers');
const generateToken = require('../middleware/generateToken');
const bcrypt = require('bcryptjs');
const validateRegistration = require('../middleware/validateRegistration');
const validateLogin = require('../middleware/validateLogin');
const calculateBudgets = require('../helpers/calculateBudgets');
const validateIosRegistration = require('../middleware/ios/validateIosRegistration');

/********************************************************
 *                    REGISTER USER                     *
 ********************************************************/
router.post('/register', validateRegistration, async (req, res) => {
  let user = req.body;

  user.password = await bcrypt.hash(user.password, 10);

  [user] = await Users.addUser(user);

  delete user.password;

  const {
    fat_budget_g,
    carb_budget_g,
    protein_budget_g,
    caloric_budget_kcal,
  } = calculateBudgets(user);

  res.status(201).json({
    message: `New account created`,
    token: generateToken(user.id),
    user: {
      ...user,
      fat_budget_g,
      carb_budget_g,
      protein_budget_g,
      caloric_budget_kcal,
    },
  });
});

/********************************************************
 *                      LOGIN USER                       *
 ********************************************************/
router.post('/login', validateLogin, async (req, res) => {
  const { email, password } = req.body;

  const [user] = await Users.getUserBy({ email });

  // if the user is not found or the password is invalid
  if (!user || !(await bcrypt.compareSync(password, user.password))) {
    res.status(401).json({
      message: 'The email or password provided is invalid',
    });
  }

  delete user.password;

  const {
    fat_budget_g,
    carb_budget_g,
    protein_budget_g,
    caloric_budget_kcal,
  } = calculateBudgets(user);

  res.status(200).json({
    message: `User authenticated`,
    token: generateToken(user.id),
    user: {
      ...user,
      fat_budget_g,
      carb_budget_g,
      protein_budget_g,
      caloric_budget_kcal,
    },
  });
});

/********************************************************
 *                  REGISTER USER - IOS                 *
 ********************************************************/
router.post('/ios/register', validateIosRegistration, async (req, res) => {
  const newUser = req.body;
  newUser.password = await bcrypt.hash(req.body.password, 10);

  const [user] = await Users.addUser(newUser);

  delete user.password;

  res.status(201).json({
    message: `New account created`,
    token: generateToken(user.id),
    user,
  });
});

module.exports = router;

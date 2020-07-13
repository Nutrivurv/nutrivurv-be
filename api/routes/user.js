const router = require('express').Router();
const { Users } = require('../controllers');

/********************************************************
 *                     UPDATE USER                      *
 ********************************************************/
router.put('/:user_id', async (req, res) => {
  const user_id = req.params.user_id;
  const updates = req.body;

  try {
    const user = await Users.updateUser(user_id, updates);

    delete user.password;

    const {
      fat_budget_g,
      carb_budget_g,
      protein_budget_g,
      caloric_budget_kcal,
    } = calculateBudgets(user);

    res.status(200).json({
      message: 'Account updated',
      token: generateToken(user.id),
      user: {
        ...user,
        fat_budget_g,
        carb_budget_g,
        protein_budget_g,
        caloric_budget_kcal,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
});

module.exports = router;

const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { Users } = require('../controllers');
const calculateBudgets = require('../helper/calculateBudgets');

/********************************************************
 *                     UPDATE USER                      *
 ********************************************************/
router.put('/:user_id', async (req, res) => {
  const user_id = req.params.user_id;
  const updates = req.body;

  try {
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const [user] = await Users.updateUser(user_id, updates);

    delete user.password;

    const {
      fat_budget_g,
      carb_budget_g,
      protein_budget_g,
      caloric_budget_kcal,
    } = calculateBudgets(user);

    res.status(200).json({
      message: 'Account updated',
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

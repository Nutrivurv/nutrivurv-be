const { getUserBy } = require('../controllers/user-controller');

const validateRegistration = async (req, res, next) => {
  let user = req.body;

  console.log('user', user);

  if (user && user.email && user.password) {
    if (
      user.name &&
      user.gender &&
      user.target_weight_lbs &&
      user.activity_level &&
      user.height_cm &&
      user.weight_kg &&
      user.net_weekly_weight_change_kg &&
      user.date_of_birth
    ) {
      try {
        user = await getUserBy({ email: user.email });
        if (user) {
          res.status(409).json({
            message: `Account with email ${user.email} is already exists`,
          });
        } else {
          next();
        }
      } catch (error) {
        res.status(500).json({
          message: 'Internal Server Error',
          error: error.message,
        });
      }
    } else {
      res.status(400).json({
        message: 'Missing profile information',
      });
    }
  } else {
    res.status(400).json({
      message: 'Missing credentials',
    });
  }
};

module.exports = validateRegistration;

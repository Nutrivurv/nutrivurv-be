const { getUserBy } = require('../controllers/user-controller');

const locateAccount = async (req, res, next) => {
  let user = req.body;

  try {
    [user] = await getUserBy({ email: user.email });

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
};

module.exports = locateAccount;

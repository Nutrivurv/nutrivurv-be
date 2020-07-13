const { getUserBy } = require('../../controllers/user-controller');

const validateIosRegistration = async (req, res, next) => {
  let user = req.body;
  if (user && user.email && user.password) {
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
      message: 'Missing credentials',
    });
  }
};

module.exports = validateIosRegistration;

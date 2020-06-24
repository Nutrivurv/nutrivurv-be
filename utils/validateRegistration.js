const { getUserBy } = require('../api/controllers/users');

const validateRegistration = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (name && email && password) {
    try {
      const user = await getUserBy({ email });
      if (user) {
        res.status(400).json({
          message: `An account with email ${user.email} is already exists.`,
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

module.exports = validateRegistration;

const { getUserBy } = require('../../controllers/user-controller');

const validateIosRegistration = async (req, res, next) => {
  let user = req.body;
  if (user && user.email && user.password) {
    next();
  } else {
    res.status(400).json({
      message: 'Missing credentials',
    });
  }
};

module.exports = validateIosRegistration;

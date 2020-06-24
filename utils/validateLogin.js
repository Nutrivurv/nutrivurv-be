const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    next();
  } else {
    res.status(400).json({
      message: 'Missing credentials',
    });
  }
};

module.exports = validateLogin;

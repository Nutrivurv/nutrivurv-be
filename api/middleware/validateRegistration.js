const validateRegistration = async (req, res, next) => {
  let user = req.body;

  if (!user && user === {}) {
    res.status(400).json({ message: 'missing post data' });
    next();
  } else if (!user.email) {
    res.status(400).json({ message: 'missing required email field' });
  } else if (!user.password) {
    res.status(400).json({ message: 'missing required password field' });
  } else if (!user.name) {
    res.status(400).json({ message: 'missing required name field' });
  } else if (!user.gender) {
    res.status(400).json({ message: 'missing required gender field' });
  } else if (!user.target_weight_lbs) {
    res
      .status(400)
      .json({ message: 'missing required target_weight_lbs field' });
  } else if (!user.activity_level) {
    res.status(400).json({ message: 'missing required activity_level field' });
  } else if (!user.height_ft) {
    res.status(400).json({ message: 'missing required height_ft field' });
  } else if (!user.height_in) {
    res.status(400).json({ message: 'missing required height_in field' });
  } else if (!user.weight_lbs) {
    res.status(400).json({ message: 'missing required weight_lbs field' });
  } else if (!user.net_weekly_weight_change_lbs) {
    res
      .status(400)
      .json({ message: 'missing required net_weekly_weight_change_lbs field' });
  } else if (!user.date_of_birth) {
    res.status(400).json({ message: 'missing required date_of_birth field' });
  } else {
    next();
  }
};

module.exports = validateRegistration;

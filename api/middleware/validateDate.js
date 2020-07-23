const logModel = require('../controllers/log-model');
module.exports = async (req, res, next) => {
  try {
    const date = await logModel.getByDate(req.params.date);
    if (!date) {
      return res
        .status(404)
        .json({ message: `No entry found with the date of ${req.params.date}` });
    }
    next();
  } catch (err) {
    next();
  }
};
  
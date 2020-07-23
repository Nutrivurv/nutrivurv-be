const usersModel = require("../controllers/user-controller");
module.exports = async (req, res, next) => {
    try {
      const user = await usersModel.getById(req.params.id);
      if (!user) {
        return res
          .status(404)
          .json({ message: `No user found with the id of ${req.params.id}` });
      }
      next();
    } catch (err) {
      next();
    }
  };
  

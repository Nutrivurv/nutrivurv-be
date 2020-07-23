const router = require('express').Router();
const db = require('../controllers/log-model');
const User = require('../controllers/user-controller');
const validateId = require('../middleware/validateId');
const validator = require('../middleware/validator');

router.get('/:id/entry', validateId, (req, res) => {
  const { id } = req.params;

  User.getUserEntry(id)
    .then((posts) => {
      res.status(201).json({ posts });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Failed to get entry', err });
    });
});

router.post(
  '/:id/entry',
  validator('user_id'),
  validator('date'),
  validator('meal_type'),
  validator('edamam_food_id'),
  validator('measurement_uri'),
  validator('measurement_name'),
  validator('food_name'),
  validator('quantity'),
  validator('calories_kcal'),
  validator('fat_g'),
  validator('carbs_g'),
  validator('protein_g'),
  validateId,
  (req, res) => {
    const entryData = req.body;
    db.add(entryData)
      .then((entry) => {
        res.status(201).json(entry);
      })

      .catch((err) => {
        res.status(500).json({ message: 'Failed to create new log entry' });
      });
  }
);

module.exports = router;

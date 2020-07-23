const router = require('express').Router();
const db = require('../controllers/log-model');
const User = require('../controllers/user-controller');
const validateId = require('../middleware/validateId');
const validator = require('../middleware/validator');
const validateDate = require('../middleware/validateDate');

router.get('/:id/:date', validateId, validateDate, (req, res) => {
  const {date, id} = req.params;

  User.getUserEntry(date, id)
    .then((entry) => {
      res.status(201).json({ entry });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Failed to get entry', err });
    });
});

router.post(
  '/:id/',
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

router.delete('/:id/:log_entry_id', validateId, (req, res) => {
  const { log_entry_id } = req.params;
  db.remove(log_entry_id)
    .then((deleted) => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(400).json({ message: 'Could not find entry with given id' });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: 'Failed to delete entry' });
    });
});

router.put('/:id/:log_entry_id', validateId, (req, res) => {
  const { log_entry_id } = req.params;
  const { body } = req;

  db.update(log_entry_id, body)
    .then((updated) => {
      if (updated) {
        res.json({ updated: updated });
      } else {
        res.status(400).json({ message: 'Could not find entry with given id' });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: 'Failed to update entry' });
    });
});

module.exports = router;

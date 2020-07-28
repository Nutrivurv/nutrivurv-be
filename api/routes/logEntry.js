const router = require('express').Router();
const Log = require('../controllers/log-controller');
const User = require('../controllers/user-controller');
const validateUserId = require('../middleware/validateUserId');
const validateLogEntry = require('../middleware/validateLogEntry');
const validateDate = require('../middleware/validateDate');
const _ = require('lodash');

router.get('/:user_id/:date', validateUserId, validateDate, (req, res) => {
  const { user_id, date } = req.params;

  User.getUserLogsByDate(user_id, date)
    .then((logs) => {
      res.status(201).json({
        meals: _.groupBy(logs, (log) => log.meal_type),
      });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Failed to get entry', err });
    });
});

router.post('/:user_id', validateLogEntry, validateUserId, (req, res) => {
  const entryData = { ...req.body, user_id: req.params.user_id };

  Log.add(entryData)
    .then((entry) => {
      res.status(201).json(entry);
    })

    .catch((err) => {
      res.status(500).json({ message: 'Failed to create new log entry' });
    });
});

router.delete('/:log_entry_id', (req, res) => {
  const { log_entry_id } = req.params;

  Log.remove(log_entry_id)
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

router.put('/:log_entry_id', (req, res) => {
  const { log_entry_id } = req.params;
  const { body } = req;

  Log.update(log_entry_id, body)
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

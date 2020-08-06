const router = require('express').Router();
const Log = require('../controllers/log-controller');
const validateUserId = require('../middleware/validateUserId');
const validateLogEntry = require('../middleware/validateLogEntry');
const validateDate = require('../middleware/validateDate');
const _ = require('lodash');

router.get('/date/:date', validateUserId, validateDate, async (req, res) => {
  const user_id = req.user_id;
  const { date } = req.params;

  try {
    const logEntries = await Log.getByDate(user_id, date);

    res.status(200).json({
      message: 'Log entries retrieved successfully',
      ...logEntries,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get entry', error });
  }
});

router.get('/:log_entry_id', (req, res) => {
  const { log_entry_id } = req.params;

  Log.getById(log_entry_id)
    .then((logEntry) => {
      if (!logEntry)
        res.status(404).json({ message: 'No log found by that id' });
      else
        res.status(200).json({
          message: 'Log entry retrieved successfully',
          logEntry,
        });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Failed to get entry', err });
    });
});

router.post('/', validateLogEntry, validateUserId, async (req, res) => {
  const entryData = { ...req.body, user_id: req.user_id };

  try {
    const logEntry = await Log.add(entryData);

    res.status(201).json({
      message: 'Log entry created successfully',
      logEntry,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create new log entry',
      error: error.message,
    });
  }
});

router.delete('/:log_entry_id', async (req, res) => {
  const { log_entry_id } = req.params;

  try {
    const logEntry = await Log.getById(log_entry_id);

    if (logEntry) {
      await Log.remove(log_entry_id);
      res.status(200).json({
        message: 'Log entry deleted successfully',
        logEntry,
      });
    } else {
      res.status(400).json({ message: 'Could not find entry with given id' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete entry' });
  }
});

router.put('/:log_entry_id', async (req, res) => {
  const { log_entry_id } = req.params;
  const updates = { ...req.body, user_id: req.user_id };

  try {
    const logEntry = await Log.update(log_entry_id, updates);

    if (logEntry) {
      res.status(201).json({
        message: 'Log entry updated successfully',
        logEntry,
      });
    } else {
      res.status(400).json({ message: 'Could not find entry with given id' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update log entry',
      error: error.message,
    });
  }
});

module.exports = router;

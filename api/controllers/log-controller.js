const db = require('../../db/config');
const Measurement = require('../controllers/measurement-controller');
const DailyTotals = require('../controllers/daily-totals-controller');
const _ = require('lodash');
/********************************************************
 *                      ADD NEW LOG                      *
 ********************************************************/
const add = async (log_entry_data) => {
  const trx = await db.transaction();
  const { all_measurements } = log_entry_data;

  return addLog(log_entry_data, trx)
    .then(async ([log_entry]) => ({
      ...log_entry,
      all_measurements: await Measurement.addMany(
        all_measurements,
        log_entry.id,
        trx
      ),
    }))
    .then(async (log_entry) => {
      await DailyTotals.refresh(log_entry.user_id, log_entry.date, trx);
      return log_entry;
    })
    .then((log_entry) => {
      trx.commit();
      return log_entry;
    })
    .catch((error) => {
      trx.rollback();
      throw new Error(error);
    });
};

const addLog = (log_entry, trx) => {
  delete log_entry.all_measurements;
  return db('log_entry').transacting(trx).returning('*').insert(log_entry);
};

/********************************************************
 *                       UPDATE LOG                      *
 ********************************************************/
const update = async (log_entry_id, log_entry_data) => {
  const trx = await db.transaction();
  const { all_measurements } = log_entry_data;

  return updateLog(log_entry_id, log_entry_data, trx)
    .then(async ([log_entry]) => {
      return {
        ...log_entry,
        all_measurements: await Measurement.updateMany(
          all_measurements,
          log_entry.id,
          trx
        ),
      };
    })
    .then(async (log_entry) => {
      await DailyTotals.refresh(log_entry.user_id, log_entry.date, trx);
      return log_entry;
    })
    .then((log_entry) => {
      trx.commit();
      return log_entry;
    })
    .catch((error) => {
      trx.rollback();
      throw new Error(error);
    });
};

const updateLog = (log_entry_id, log_entry_data, trx) => {
  delete log_entry_data.all_measurements;
  return db('log_entry')
    .transacting(trx)
    .returning('*')
    .update(log_entry_data)
    .where({ id: log_entry_id });
};

/********************************************************
 *                       DELETE LOG                      *
 ********************************************************/
const remove = async (log_entry_id) => {
  const trx = await db.transaction();

  return Measurement.removeAll(log_entry_id, trx)
    .then(() => {
      return removeLog(log_entry_id, trx);
    })
    .then(async ([removed_log]) => {
      await DailyTotals.refresh(removed_log.user_id, removed_log.date, trx);
      return removed_log;
    })
    .then((removed_log) => {
      trx.commit();
      return removed_log;
    })
    .catch((error) => {
      trx.rollback();
      throw new Error(error);
    });
};

const removeLog = (id, trx) => {
  return db('log_entry').transacting(trx).returning('*').where({ id }).del();
};

/********************************************************
 *                        GET LOG                        *
 ********************************************************/

const getByDate = async (user_id, date) => {
  const trx = await db.transaction();
  return db('log_entry as le')
    .transacting(trx)
    .select('*')
    .where({ 'le.date': date, 'le.user_id': user_id })
    .then(async (logEntries) => {
      return await Promise.all(
        logEntries.map(async (log_entry) => ({
          ...log_entry,
          all_measurements: await Measurement.getAll(log_entry.id, trx),
        }))
      );
    })
    .then(async (logEntries) => {
      return {
        meals: _.groupBy(logEntries, (entry) => entry.meal_type),
        dailyTotals: await DailyTotals.getByDate(user_id, date, trx),
      };
    })
    .then((logEntries) => {
      trx.commit();
      return logEntries;
    })
    .catch((error) => {
      trx.rollback();
      throw new Error(error);
    });
};

const getById = (id) => {
  return db('log_entry as l').where('l.id', id).first();
};

module.exports = {
  add,
  remove,
  update,
  getByDate,
  getById,
};

const db = require('../../db/config');
const Measurement = require('../controllers/measurement-controller');
const DailyTotals = require('../controllers/daily-totals-controller');

const add = async (log_data) => {
  const { all_measurements } = log_data;
  const trx = await db.transaction();

  return addLog(log_data, trx)
    .then(async ([log_entry]) => ({
      ...log_entry,
      all_measurements: await Measurement.addMany(
        all_measurements,
        log_entry.id,
        trx
      ),
    }))
    .then(async (log_entry) => ({
      ...log_entry,
      daily_totals: (await DailyTotals.update(log_entry, trx))[0],
    }))
    .then((log_entry) => {
      trx.commit();
      return log_entry;
    })
    .catch((error) => {
      trx.rollback();
      throw new Error(error);
    });
};

const addLog = (log, trx) => {
  delete log.all_measurements;
  return db('log_entry').transacting(trx).returning('*').insert(log);
};

const remove = (id) => {
  return db('log_entry').where({ id }).del();
};

const update = (id, body) => {
  return db('log_entry').returning('*').where({ id }).update(body);
};

const getById = (id) => {
  return db('log_entry as l').where('l.id', id).first();
};

const getByDate = (user_id, date) => {
  return db('log_entry as l')
    .join('user as u', 'u.id', 'l.user_id')
    .select(
      'l.id',
      'l.user_id',
      'l.date',
      'l.meal_type',
      'l.edamam_food_id',
      'l.measurement_uri',
      'l.measurement_name',
      'l.food_name',
      'l.quantity',
      'l.calories_kcal',
      'l.fat_g',
      'l.carbs_g',
      'l.protein_g'
    )
    .where({ 'l.date': date, 'l.user_id': user_id });
};

module.exports = {
  add,
  addLog,
  remove,
  update,
  getByDate,
  getById,
};

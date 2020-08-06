const db = require('../../db/config');

/********************************************************
 *                    ADD MEASUREMENTS                   *
 ********************************************************/
const addMany = (all_measurements, log_entry_id, trx) => {
  return Promise.all(
    all_measurements.map(async (measurement) => {
      const [added_measurement] = await add(measurement, log_entry_id, trx);
      return added_measurement;
    })
  );
};

const add = (measurement, log_entry_id, trx) => {
  return db('edamam_measurements as em')
    .transacting(trx)
    .returning('*')
    .insert({ ...measurement, log_entry_id });
};

/********************************************************
 *                  UPDATE MEASUREMENTS                  *
 ********************************************************/
const updateMany = (all_measurements, log_entry_id, trx) => {
  return Promise.all(
    all_measurements.map(async (measurement) => {
      const [added_measurement] = await update(measurement, log_entry_id, trx);
      return added_measurement;
    })
  );
};

const update = (measurement, log_entry_id, trx) => {
  return db('edamam_measurements as em')
    .transacting(trx)
    .returning('*')
    .update({ ...measurement, log_entry_id });
};

/********************************************************
 *                  REMOVE MEASUREMENTS                  *
 ********************************************************/
const removeAll = (log_entry_id, trx) => {
  return db('edamam_measurements as em')
    .transacting(trx)
    .where({ log_entry_id })
    .del();
};

module.exports = {
  add,
  addMany,
  update,
  updateMany,
  removeAll,
};

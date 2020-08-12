const db = require('../../db/config');

/********************************************************
 *                    GET MEASUREMENTS                  *
 ********************************************************/
// const getAll = (log_entry_id, trx) => {
//   return Promise.all(
//     all_measurements.map(async (measurement) => {
//       const [added_measurement] = await add(measurement, log_entry_id, trx);
//       return added_measurement;
//     })
//   );
// };

const getAll = (log_entry_id, trx) => {
  return db('edamam_measurements as em')
    .transacting(trx)
    .select('*')
    .where({ log_entry_id });
};

/********************************************************
 *                    ADD MEASUREMENTS                  *
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
 *                  UPDATE MEASUREMENTS                 *
 ********************************************************/
const updateMany = (all_measurements, trx) => {
  return Promise.all(
    all_measurements.map(async (measurement) => {
      const [added_measurement] = await update(measurement, trx);
      return added_measurement;
    })
  );
};

const update = (measurement, trx) => {
  delete measurement.log_entry_id;
  return db('edamam_measurements as em')
    .transacting(trx)
    .where({ id: measurement.id })
    .update({ ...measurement })
    .returning('*');
};

/********************************************************
 *                  REMOVE MEASUREMENTS                 *
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
  getAll,
};

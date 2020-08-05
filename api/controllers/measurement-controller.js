const db = require('../../db/config');

const addMany = (all_measurements, log_entry_id, trx) => {
  console.log('addMany', all_measurements, log_entry_id);
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

module.exports = {
  add,
  addMany,
};

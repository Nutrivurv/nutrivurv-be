const db = require('../../db/config');

const add = (entry) => {
  return db('log_entry')
    .insert(entry)
    .then((ids) => ({ id: ids[0] }));
};

const remove = (id) => {
  return db('log_entry').where({ id }).del();
};

const update = (id, body) => {
  return db('log_entry').where({ id }).update(body);
};

function getByDate(date) {
  return db('log_entry as l').where('l.date', date).first();
}

module.exports = {
  add,
  remove,
  update,
  getByDate
};



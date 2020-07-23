const db = require('../../db/config');

const add = (entry) => {
  return db('log_entry')
  .insert(entry)
  .then(ids => ({ id: ids[0] }));
}



module.exports = {
    add,
}



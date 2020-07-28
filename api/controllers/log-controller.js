const db = require('../../db/config');

const add = (entry) => {
  return db('log_entry').returning('*').insert(entry);
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
    .join('users as u', 'u.id', 'l.user_id')
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
  remove,
  update,
  getByDate,
  getById,
};

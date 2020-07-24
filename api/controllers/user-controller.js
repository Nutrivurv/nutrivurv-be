const db = require('../../db/config');
const table = 'users';

const getAllUsers = () => {
  return db(table);
};

const getUserBy = (filter) => {
  return db(table).where(filter);
};

const getById = (id) => {
  return db('users').where({ id }).first();
};

const getUserEntry = (date, id) => {
  return db('log_entry as l')
    .join('users as u', 'u.id', 'l.user_id')
    .select(
      'u.name',
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
    .where({ 'l.date': date, 'l.user_id': id });
};

const addUser = (user) => {
  return db(table).insert(user).returning('*');
};

const updateUser = (id, updates) => {
  return db(table).where({ id }).update(updates).returning('*');
};

const deleteUser = (id) => {
  return db(table).where({ id }).del();
};

module.exports = {
  getAllUsers,
  getUserBy,
  getUserEntry,
  getById,
  addUser,
  updateUser,
  deleteUser,
};

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
  getById,
  addUser,
  updateUser,
  deleteUser,
};

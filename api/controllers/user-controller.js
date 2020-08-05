const db = require('../../db/config');
const table = 'user';

const getAllUsers = () => {
  return db(table);
};

const getUserBy = (filter) => {
  return db(table).where(filter);
};

const getById = (id) => {
  return db(table).where({ id }).first();
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

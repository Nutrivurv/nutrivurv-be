const db = require('../../db/config');
const table = 'users';

const getAllUsers = async () => {
  return await db(table);
};

const getUserBy = async (filter) => {
  return await db(table).where(filter).first();
};

const addUser = async (user) => {
  const [id] = await db(table).insert(user).returning('id');

  return await getUserBy({ id });
};

const updateUser = async (id, updates) => {
  return await db(table).where({ id }).update(updates);
};

const deleteUser = async (id) => {
  return await db(table).where({ id }).del();
};

module.exports = {
  getAllUsers,
  getUserBy,
  addUser,
  updateUser,
  deleteUser,
};

const db = require('../../db/config');
const table = 'users';

const getAllUsers = async () => {
  return await db(table);
};

const getUserBy = async (filter) => {
  return await db(table).where(filter).first();
};

const addUser = async ({ name, email, password }) => {
  const user = {
    name,
    email,
    password,
  };

  const [id] = await db(table).insert(user).returning('id');

  return await getUserBy({ id });
};

const updateUser = async (userID, changes) => {
  const userChanges = { ...changes, updated_at: Date.now() };

  return await db(table).where(userID).update(userChanges);
};

const deleteUser = async (userID) => {
  return await db(table).where({ userID }).del();
};

module.exports = {
  getAllUsers,
  getUserBy,
  addUser,
  updateUser,
  deleteUser,
};

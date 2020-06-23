const db = require('../../db/config');
const table = 'users';

const getAllUsers = async () => {
  const users = await db(table);
  return users;
};

const getUserBy = async (filter) => {
  const user = await db(table).where(filter).first();

  return user;
};

const addUser = async ({ name, email, password }) => {
  const user = {
    name,
    email,
    password,
  };

  const [id] = await db(table).insert(user).returning('id');
  const registeredUser = await getUserBy({ id });

  return registeredUser;
};

const updateUser = async (userID, changes) => {
  const userChanges = { ...changes, updated_at: Date.now() };
  const updated = await db(table).where(userID).update(userChanges);

  return updated;
};

const deleteUser = async (userID) => {
  const deleted = await db(table).where({ userID }).del();
};

module.exports = {
  getAllUsers,
  getUserBy,
  addUser,
  updateUser,
  deleteUser,
};

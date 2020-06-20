const db = require('../../db/config');
const table = 'users';

const getAllUsers = async () => {
  try {
    const users = await db(table);
    return users
  } catch (error) {
    return error    
  }
}

const getUserBy = async (filter) => {
  try {
    const user = await db(table).where(filter).first();
    return user
  } catch (error) {
    return error 
  }
}

const addUser = async ({ username, email, password}) => {
  const user = { 
    username,
    email,
    password,
    created_at: Date.now(),
    updated_at: Date.now()
  }
  try {
    const inserted = await db(table).insert(user, {userID, username, email});
    return inserted;
  } catch (error) {
    return error
  }
}

const updateUser = async (userID, changes) => {
  const userChanges = {...changes, updated_at: Date.now()}
  try {
    const updated = await db(table).where(userID).update(userChanges)
    return updated;
  } catch (error) {
    return error
  }
}

const  deleteUser = async (userID) => {
  try {
    const deleted = await db(table).where({ userID }).del()
    return deleted;
  } catch (error) {
    return error
  }
}

module.exports = {
  getAllUsers,
  getUserBy,
  addUser,
  updateUser,
  deleteUser,
};
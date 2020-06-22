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
  console.log(filter);
  try {
    const user = await db(table).where(filter).first();
    return user
  } catch (error) {
    return error 
  }
}

const addUser = async (user) => {
  const today = new Date(Date.now())
  const newUser = { 
    ...user,
    created_at: today,
    updated_at: today,
  }
  try {
    const [id] = await db(table).insert(newUser, 'id');
    return getUserBy({ id });
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

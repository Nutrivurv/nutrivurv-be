const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
  const minCharLength = 8;
  const maxCharLength = 16;
  if (password.length < minCharLength && password.length > maxCharLength) {
    throw new Error(
      `Password must be between ${minCharLength} and ${maxCharLength} characters`
    );
  }
  return bcrypt.hash(password, 10);
};

module.exports = hashPassword;

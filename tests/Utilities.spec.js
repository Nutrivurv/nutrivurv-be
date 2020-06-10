const hashPassword = require('../utils/hashPassword.js');
const validateLogin = require('../utils/validateLogin.js');
const authorization = require('../utils/authorization');
const formatDate = require('../utils/formatDate');
const jwt = require('jsonwebtoken');

describe('utility test cases', () => {
  test('hashPassword hashes the password', async () => {
    const password = 'secure12';
    const hash = await hashPassword(password);

    expect(password).not.toBe(hash);
  });

  test('hashPassword does not allow pw < 8 char', async () => {
    const short = 'short';
    try {
      const invalid = hashPassword(short);
    } catch (error) {
      expect(error).toEqual(
        new Error(
          'Password must be greater than 8 characters and less than 16 characters'
        )
      );
    }
  });

  test('hashPassword does not allow pw > 16 char', async () => {
    const long = 'omgthispasswordiswaytoolong';
    try {
      const alsobad = hashPassword(long);
    } catch (error) {
      expect(error).toEqual(
        new Error(
          'Password must be greater than 8 characters and less than 16 characters'
        )
      );
    }
  });

  test('login will not work with no user', async () => {
    try {
      validateLogin('testing123');
    } catch (error) {
      expect(error).toEqual(new Error('Unable to login'));
    }
  });

  test('login will not work with mismatched passwords', async () => {
    const user = {
      password: 'testing123',
    };
    try {
      validateLogin('testing13', user);
    } catch (error) {
      expect(error).toEqual(new Error('Unable to login'));
    }
  });

  test('authorization allows login route', async () => {
    const login = {
      request: {
        request: {
          headers: {
            authorization: 'token',
          },
          body: {
            query: 'login',
          },
        },
      },
    };

    const loggedIn = await authorization(
      () => {
        return 'yay';
      },
      null,
      null,
      login
    );

    expect(loggedIn).toBe('yay');
  });

  test('authorization allows createuser route', async () => {
    const login = {
      request: {
        request: {
          headers: {
            authorization: 'token',
          },
          body: {
            query: 'createUser',
          },
        },
      },
    };

    const loggedIn = await authorization(
      () => {
        return 'yay';
      },
      null,
      null,
      login
    );

    expect(loggedIn).toBe('yay');
  });
  describe('formatDate()', () => {
    const expected = '09-06-2020';
    test('formats "MM/DD/YYYY" date string into "DD-MM-YYYY', () => {
      const date = '06/09/2020'
            
      expect(formatDate(date)).toBe(expected);
    });
    test('formats "MM-DD-YY" date string into "DD-MM-YYYY"', () => {
      const date = '06/09/2020';
      
      expect(formatDate(date)).toBe(expected);
    });
    test('formats "AbrMon DD, YYYY" date string into "DD-MM-YYYY"', () => {
      const date = 'Jun 09, 2020';
      
      expect(formatDate(date)).toBe(expected);
    });
    test('formats "Month DD, YYYY" date string in "DD-MM-YYYY"', () => {
      const date = 'June 09, 2020';
      
      expect(formatDate(date)).toBe(expected);
    });
  });
});

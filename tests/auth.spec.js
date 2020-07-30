const request = require('supertest');
const server = require('../api/server.js');

describe('POST / Register', () => {
  // Creates a new account everytime I refresh
  //   it('should return 201', async () => {
  //       return request(server).post('/api/auth/register').send({
  //           name: 'alessandra144',
  //           email: 'alessandra144@email.com',
  //           password: 'password144',
  //           date_of_birth: '4/14/1994',
  //           gender: 'female',
  //           net_weekly_weight_change_lbs: 1,
  //           weight_lbs: 130,
  //           height_ft: 5,
  //           height_in: 2,
  //           target_weight_lbs: 125,
  //           activity_level: 2,
  //           fat_ratio_prct: null,
  //           carb_ratio_prct: null,
  //           protein_ratio_prct: null
  //       })
  //       .then(res => {
  //           expect(res.status).toBe(201)
  //       })
  //   });
  it('should return JSON type', () => {
    return request(server)
      .post('/api/auth/register/')
      .then((res) => {
        expect(res.type).toBe('application/json');
      });
  });
  it('should return status 400', () => {
    return request(server)
      .post('/api/auth/register')
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });
  it('should return Missing credentials message', async () => {
    return request(server)
      .post('/api/auth/register')
      .send({
        email: 'alessandra3@email.com',
        password: 'password123',
        date_of_birth: '4/14/1994',
        gender: 'female',
        net_weekly_weight_change_lbs: 1,
        weight_lbs: 130,
        height_ft: 5,
        height_in: 2,
        target_weight_lbs: 125,
        activity_level: 2,
        fat_ratio_prct: null,
        carb_ratio_prct: null,
        protein_ratio_prct: null,
      })
      .then((res) => {
        expect(res.body).toEqual({ message: 'Missing credentials' });
      });
  });
});

describe('POST / Login', () => {
  it('should return 200', async () => {
    return request(server)
      .post('/api/auth/login')
      .send({
        email: 'alessandra2@email.com',
        password: 'password123',
      })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
  it('should return JSON type', async () => {
    return request(server)
      .post('/api/auth/login')
      .send({
        email: 'alessandra2@email.com',
        password: 'password123',
      })
      .then((res) => {
        expect(res.type).toBe('application/json');
      });
  });
  it('should return message User authenticated', async () => {
    return request(server)
      .post('/api/auth/login')
      .send({
        email: 'alessandra2@email.com',
        password: 'password123',
      })
      .then((res) => {
        expect(res.body.message).toEqual('User authenticated');
      });
  });
  it('should return message Missing credentials', async () => {
    return request(server)
      .post('/api/auth/login')
      .then((res) => {
        expect(res.body.message).toEqual('Missing credentials');
      });
  });
  it('should return status 400', async () => {
    return request(server)
      .post('/api/auth/login')
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });
});

describe('POST / Register ios', () => {
  // it('should return 201', async () => {
  //     return request(server).post('/api/auth/ios/register').send({
  //       name: 'alessandra144',
  //       email: 'alessandra144@email.com',
  //       password: 'password123',
  //       date_of_birth: '4/14/1994',
  //       gender: 'female',
  //       net_weekly_weight_change_lbs: 1,
  //       weight_lbs: 130,
  //       height_ft: 5,
  //       height_in: 2,
  //       target_weight_lbs: 125,
  //       activity_level: 2,
  //       fat_ratio_prct: null,
  //       carb_ratio_prct: null,
  //       protein_ratio_prct: null
  //     })
  //     .then( res => {
  //         expect(res.status).toBe(201)
  //     })
  // })
  it('should return status 409', async () => {
    return request(server)
      .post('/api/auth/ios/register')
      .send({
        name: 'alessandra4',
        email: 'alessandra4@email.com',
        password: 'password123',
        date_of_birth: '4/14/1994',
        gender: 'female',
        net_weekly_weight_change_lbs: 1,
        weight_lbs: 130,
        height_ft: 5,
        height_in: 2,
        target_weight_lbs: 125,
        activity_level: 2,
        fat_ratio_prct: null,
        carb_ratio_prct: null,
        protein_ratio_prct: null,
      })
      .then((res) => {
        expect(res.status).toBe(409);
      });
  });
  it('should return message Account with email already exist', async () => {
    return request(server)
      .post('/api/auth/ios/register')
      .send({
        name: 'alessandra4',
        email: 'alessandra4@email.com',
        password: 'password123',
        date_of_birth: '4/14/1994',
        gender: 'female',
        net_weekly_weight_change_lbs: 1,
        weight_lbs: 130,
        height_ft: 5,
        height_in: 2,
        target_weight_lbs: 125,
        activity_level: 2,
        fat_ratio_prct: null,
        carb_ratio_prct: null,
        protein_ratio_prct: null,
      })
      .then((res) => {
        expect(res.body).toEqual({
          message: 'Account with email alessandra4@email.com is already exists',
        });
      });
  });
  it('should return message Missing Credentials', async () => {
    return request(server)
      .post('/api/auth/ios/register')
      .then((res) => {
        expect(res.body).toEqual({
          message: 'Missing credentials',
        });
      });
  });
  it('should return status 400', async () => {
    return request(server)
      .post('/api/auth/ios/register')
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });
  it('should return JSON type', async () => {
    return request(server)
      .post('/api/auth/ios/register')
      .then((res) => {
        expect(res.type).toBe('application/json');
      });
  });
});

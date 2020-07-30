const request = require('supertest');
const server = require('../api/server.js');

let token;

beforeAll((done) => {
  request(server)
    .post('/api/auth/login')
    .send({
      email: 'alessandra2@email.com',
      password: 'password123',
    })
    .end((err, response) => {
      token = response.body.token; // save the token!
      done();
    });
});

describe('GET / getByDate ', () => {
  it('should be JSON type', () => {
    return request(server)
      .get('/api/log/date/:date')
      .then((res) => {
        expect(res.type).toBe('application/json');
      });
  });
  // it('should return 200 status', () => {
  //     return request(server).get('/api/log/date/:date')
  //     .set('Authorization', `bearer ${token}`)
  //     .then(res => {
  //         expect(res.status).toBe(200)
  //     });
  // });
  it('should return 401 status', () => {
    return request(server)
      .get('/api/log/date/:date')
      .then((res) => {
        expect(res.status).toBe(401);
      });
  });
  it('should return no authorization header message', () => {
    return request(server)
      .get('/api/log/date/:date')
      .then((res) => {
        expect(res.body.message).toEqual('no authorization header');
      });
  });
});

describe('GET / getById', () => {
  it('should be JSON type', () => {
    return request(server)
      .get('/api/log/:log_entry_id')
      .then((res) => {
        expect(res.type).toBe('application/json');
      });
  });
  it('should be JSON type', () => {
    return request(server)
      .get('/api/log/:log_entry_id')
      .then((res) => {
        expect(res.status).toBe(401);
      });
  });
  it('should return no authorization header message', () => {
    return request(server)
      .get('/api/log/:log_entry_id')
      .then((res) => {
        expect(res.body.message).toEqual('no authorization header');
      });
  });
});

const request = require('supertest');
const server = require('../api/server.js');

describe('Put / update user', () => {
  it('should return status 401', () => {
    return request(server)
      .put('/api/user/:user_id')
      .then((res) => {
        expect(res.status).toBe(401);
      });
  });
  it('should return status 401', () => {
    return request(server)
      .put('/api/user/:user_id')
      .then((res) => {
        expect(res.type).toBe('application/json');
      });
  });
  it('should return status 401', () => {
    return request(server)
      .put('/api/user/:user_id')
      .then((res) => {
        expect(res.body.message).toEqual('no authorization header');
      });
  });
});

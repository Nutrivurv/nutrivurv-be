const request = require('supertest');
const server = require('../api/server.js');

describe('server', () => {
  test('GET /api/status should return status 200 OK', async () => {
    const response = await request(server).get('/api/status');
    expect(response.status).toBe(200);
  });
  test('GET /api should return JSON data type', async () => {
    const response = await request(server).get('/api/status');
    expect(response.type).toMatch(/json/i);
  });
  test('GET /api should return json with body of { status: "up" }', async () => {
    const response = await request(server).get('/api/status');
    expect(response.body.status).toBe('up');
  });
});

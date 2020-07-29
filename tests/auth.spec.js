const request = require('supertest');
const server = require('../api/server.js');

describe('POST / Register', () => {
    // Creates a new account everytime I refresh
    // it('should return 201', async () => {
    //     return request(server).post('/api/auth/register').send({
    //         name: 'alessandra3',
    //         email: 'alessandra3@email.com',
    //         password: 'password123',
    //         date_of_birth: '4/14/1994',
    //         gender: 'female',
    //         net_weekly_weight_change_lbs: 1,
    //         weight_lbs: 130,
    //         height_ft: 5,
    //         height_in: 2,
    //         target_weight_lbs: 125,
    //         activity_level: 2,
    //         fat_ratio_prct: null,
    //         carb_ratio_prct: null,
    //         protein_ratio_prct: null
    //     })
    //     .then(res => {
    //         expect(res.status).toBe(201)
    //     })
    // });
});

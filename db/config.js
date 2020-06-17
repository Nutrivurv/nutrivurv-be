const knex = require('knex');
const config = require('../knexfile.js');

const ENVIRONMENT = process.env.ENVIRONMENT || 'development';

return knex(config[ENVIRONMENT]);

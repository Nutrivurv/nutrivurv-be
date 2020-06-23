const knex = require('knex');
const config = require('../knexfile.js');

const ENVIRONMENT = process.env.ENVIRONMENT || 'development';

const db = knex(config[ENVIRONMENT]);

module.exports = db;

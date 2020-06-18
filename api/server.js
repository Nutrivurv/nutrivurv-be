const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

//Third Party Middleware
server.use(helmet());
server.use(express.json());
server.use(cors());

// API status
server.get('/api', (req, res) => {
  res.send({ status: 'up' });
});

module.exports = server;

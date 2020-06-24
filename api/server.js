const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const router = require('./routes');

const server = express();

//Third Party Middleware
server.use(helmet());
server.use(express.json());
server.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://www.nutrivurv.com',
      'https://nutrivurv.herokuapp.com',
    ],
    credentials: true,
  })
);

// Routes
server.use('/api/', router);

module.exports = server;

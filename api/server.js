const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const router = require('./routes');

const server = express();

//Third Party Middleware
server.use(helmet());
server.use(express.json());
server.use(cors());

// Routes
server.use('/api/', router);

module.exports = server;

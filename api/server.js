const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

// MIDDLEWARE
server.use(helmet());
server.use(express.json());
server.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://www.nutrivurv.com',
      'http://nutrivurv.com',
      'https://nutrivurv.herokuapp.com',
    ],
    credentials: true,
  })
);

// ROUTES
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const authenticate = require('./middleware/authenticate');

server.get('/status', (req, res) => {
  res.send({ status: 'up' });
});

server.use('/auth', authRouter);
server.use('/user', authenticate, userRouter);

module.exports = server;

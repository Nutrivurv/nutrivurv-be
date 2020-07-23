const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

/********************************************************
 *                       MIDDLEWARE                     *
 ********************************************************/
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

/********************************************************
 *                         ROUTERS                      *
 ********************************************************/
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const logRouter = require('./routes/logEntry');
const authenticate = require('./middleware/authenticate');

server.get('/status', (req, res) => {
  res.send({ status: 'up' });
});

server.use('/api/auth', authRouter);
server.use('/api/user', authenticate, userRouter);
server.use('/api/user', authenticate, logRouter);

// ROOT
server.use('/', (req, res) => {
  res.send('Nutrivurv Back-End');
});

module.exports = server;

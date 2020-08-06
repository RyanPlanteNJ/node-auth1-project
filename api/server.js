const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const restricted = require('../auth/restricted-middleware.js');

const usersRouter = require('../users/users-router.js')
const authRouter = require('../auth/auth-router.js')

const server = express();

const sessionConfig = {
  name: 'usersession',
  secret: 'iwannaplayagame',
  cookie: {
    maxAge: 1000 * 60 * 30,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false,
  store: new knexSessionStore({
    knex: require('../database/connection.js'),
    tablename: 'usertbl',
    sidfieldname: 'userid',
    createtable: true,
    clearInterval: 1000 * 60 * 30
  })
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(morgan('dev'));

server.use(session(sessionConfig));

server.use('/api/users', restricted, usersRouter)
server.use('/api/auth', authRouter)

server.get('/', (req, res) => {
  res.json({api: "What about second breakfast"})
})

module.exports = server;

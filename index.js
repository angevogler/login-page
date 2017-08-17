// required
const express = require('express');
const mustache = require('mustache-express');
const bodyparser = require('body-parser');
const session = require('express-session');

// configure server
const server = express();

server.use(bodyparser.urlencoded({ extended: false }));
server.use(session({
    secret: '4494@-tuckerbug',
    resave: false,
    saveUninitialized: true
}));

// configure mustache-express
server.engine('mustache', mustache());
server.set('views', './views')
server.set('view engine', 'mustache');

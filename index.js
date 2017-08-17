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

// array for members
const members = [
  { username: 'angela', password: 'wings' },
  { username: 'sarah', password: 'pizza' },
  { username: 'gigi', password: 'tacos' },
];


// original route
server.get('/', function (req, res) {
  res.render('login');
});

// home page route
server.get('/home', function (req, res) {
  res.render('home', {
    username: req.session.who.username,
  });
});

// message post
// redirect to home

// login post
// redirect to home
server.post ('/login', function (req, res) {
  // define constant variables for username and password
  const username = req.body.username;
  const password = req.body.password;

  // id for members
  let member = null;

  // is username valid?
  // if so is password a match?
  for (let i = 0; i < members.length; i++) {
    if (username === members[i].username &&
        password === members[i].password) {
          member = members[i];
        }
    }

    // if it is a match redirect them to the home screen otherwise return error message
    if ( member !== null) {
      // create session
      req.session.who = member;

      console.log('user info sent')
      res.redirect('/home');
    } else {
      console.log(username)
      console.log(password)
      console.log(member)
      res.redirect('/');
    }
});

// run the server
server.listen(3000, function () {
    console.log('Peanut butter jelly time');
});

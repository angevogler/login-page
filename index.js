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
  { username: 'angela', password: 'abc', logins: 0, firstname: 'Angela', lastname: 'Vogler' },
];


// original route
server.get('/', function (req, res) {
  res.render('login');
});

// home page route
server.get('/home', function (req, res) {
  res.render('home', {
    firstName: req.session.who.firstname,
    numberLogins: req.session.who.logins,
  });
});

// signup route
server.get('/signup', function (req, res) {
  res.render('signup');
})

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
      // count # of logins (how many times user has pressed login button)
      req.session.who.logins++;

      res.redirect('/home');
    } else {
      res.redirect('/');
    }
});

// signup post
// redirect to home
server.post('/signup', function (req, res) {
  // define variable to hold profile info
  const profile = req.body;

  // set up session for new member
  req.session.who = {
    username: profile.username,
    password: profile.password,
    login: 0,
    firstname: profile.firstname,
    lastname: profile.lastname,
  }

  // push to members array
  members.push(req.session.who);

  console.log(members)
  res.redirect('/home');
});

// run the server
server.listen(3000, function () {
    console.log('Peanut butter jelly time');
});

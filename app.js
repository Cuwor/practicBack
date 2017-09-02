var express = require('express')
var models = require('./models')
var app = express()
var bodyParser = require('body-parser')
var Joi = require('joi')
var session = require('express-session')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy


app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.set('view engine', 'ejs')

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
},
async function(email, password, done) {
  let currentUser = await models.User.findOne({
    where: {
      email: email
    }
  })
  if (!currentUser) {
    return done(null, false)
  }
  if (!currentUser.comparePassword(password)) {
    return done(null, false)
  }
  return done(null, currentUser)
}
))

passport.serializeUser(async function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(async function(id, done) {
  let user = await models.User.findById(id)
  done(null, user)
})

app.get('/', async function(req, res) {
  var timestamp = 1002074726404
  var date = new Date(timestamp).toISOString().slice(0, 10)
  var data = {
    title: 'Все статьи',
    posts: [{
      id: 1,
      postName: 'пост 1',
      author: 'Семен',
      date: date,
      postText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum... '
    }]
  }
  data.user = req.user
  res.render('index', data)
})

app.get('/page/:page', async function(req, res) {
  var date = new Date().toISOString().slice(0, 10)
  var data = {
    title: 'Все статьи',
    posts: [{
      id: 1,
      postName: 'пост 1',
      author: 'Семен',
      date: date,
      postText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum... '
    }]
  }
  data.user = req.user
  res.render('index', data)
})

app.get('/register', async function(req, res) {
  if (req.isAuthenticated()) return res.redirect('/')
  var data = {
    title: 'Регистрация'
  }
  data.errors = []
  data.user = req.user
  res.render('register', data)
})

app.post('/register', async function(req, res) {
  if (req.isAuthenticated()) return res.redirect('/')
  var schema = Joi.object().keys({
    name: Joi.string().max(30).required(),
    email: Joi.string().email().max(40).required(),
    password: Joi.string().min(6).max(20).required(),
    password2: Joi.any().valid(Joi.ref('password')).required().options({
      language: {
        any: {
          allowOnly: 'Введенные пароли не совпадают'
        }
      }
    })
  })

  var reqData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    password2: req.body.password2,
  }
  var result = Joi.validate(reqData, schema)

  if (reqData.email) {
    var wantedEmail = await models.User.findOne({
      where: {
        email: reqData.email
      }
    })
  }

  if (!result.error && !wantedEmail) {
    await models.User.create({
      name: reqData.name,
      email: reqData.email,
      password: reqData.password,
      isAdmin: false
    })
    res.redirect('/')
  } else {
    var data = {
      title: 'Регистрация'
    }
    data.errors = []
    if (wantedEmail) {
      data.errors.push({
        message: 'Данный email уже существует'
      })
    }
    if (result.error) {
      for (let err of result.error.details) {
        data.errors.push({
          'message': err.message.slice(err.message.indexOf('2" ') + 3)
        })
      }
    }
  }
  data.user = req.user
  res.render('register', data)
})

app.post('/auth', async function(req, res, next) {
  if (req.isAuthenticated()) return res.redirect('/')
  var data = {
    title: 'Авторизация'
  }
  data.user = req.user
  data.errors = []
  return passport.authenticate('local',
    function(err, user) {
      if (err) return next(err)
      if (!user) {
        data.errors = []
        data.errors.push({
          message: 'Неверный логин или пароль'
        })
        return res.render('auth', data)
      }
      req.login(user, function(err) {
        if (err) return next(err)
        return res.redirect('/')
      })
    }
  )(req, res, next)

})

app.get('/auth', async function(req, res) {
  var data = {
    title: 'Авторизация'
  }
  data.errors = []
  data.user = req.user
  res.render('auth', data)
})

app.get('/post/new', async function(req, res) {
  if (!req.isAuthenticated()) return res.redirect('/auth')
  var data = {
    title: 'Новая статья'
  }
  data.errors = []
  data.user = req.user
  res.render('new', data)
})

app.post('/post/new', async function(req, res) {
  if (!req.isAuthenticated()) return res.redirect('/auth')
  var data = {
    title: 'Новая статья'
  }
  data.errors = []
  data.user = req.user
  res.render('new', data)
})

app.get('/post/:id', async function(req, res) {
  var data = {
    title: 'Статья',
    author: 'Семен',
    date: '15.15.2015',
    postText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laboru Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incid :) '
  }
  data.user = req.user
  res.render('post', data)
})

app.post('/post/:id', async function(req, res) {
  var data = {
    title: 'Статья',
    author: 'Семен',
    date: '15.15.2015',
    postText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laboru Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incid :) '
  }
  data.user = req.user
  res.render('post', data)
})

app.put('/post/:id', async function(req, res) {
  var data = {
    title: 'Статья',
    author: 'Семен',
    date: '15.15.2015',
    postText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laboru Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incid :) '
  }
  data.user = req.user
  res.render('post', data)
})

app.get('/post/:id/edit', async function(req, res) {
  if (!req.isAuthenticated()) return res.redirect('/auth')
  var data = {
    title: 'Редактировать статью'
  }
  data.errors = []
  data.user = req.user
  res.render('edit', data)
})

app.get('/author/:id', function(req, res) {
  var data = {
    title: 'Карточка автора',
    author: 'Семен',
    posts: [{
      id: 1,
      postName: 'пост 1'
    },
    {
      id: 2,
      postName: 'пост 2'
    }
    ]
  }
  data.user = req.user
  res.render('author', data)
})

app.get('/logout', function(req, res) {
  console.log('logging out')
  req.logout()
  res.redirect('/')
})

models.sequelize.authenticate().then(function() {
  console.log('CONNECTED! ')
  app.listen(3000, function() {
    console.log('3000 port activated')
  })
}).catch(function(err) {
  console.log(err)
})

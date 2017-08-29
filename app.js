var express = require('express')
var models = require('./models')
var app = express()
var bodyParser = require('body-parser')
var passport = require('passport')
require('./config/passport/passport.js')(passport, models.user)
var Joi = require('joi')

app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.set('view engine', 'ejs')
app.get('/', async function(res, res) {
  var timestamp = 1002074726404
  var date = new Date(timestamp).toISOString().slice(0, 10)
  res.render('index', {
    title: 'Все статьи',
    posts: [{
        id: 1,
        postName: 'пост 1',
        author: 'Семен',
        date: date,
        postText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum... '
      },
      {
        id: 2,
        postName: 'пост 2',
        author: 'Семен',
        date: date,
        postText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laboru... '
      }
    ]
  })
})

app.get('/page/:page', async function(req, res) {
  var timestamp = 1502774726404
  var date = new Date().toISOString().slice(0, 10)
  res.render('index', {
    title: 'Все статьи',
    posts: [{
        id: 1,
        postName: 'пост 1',
        author: 'Семен',
        date: date,
        postText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum... '
      },
      {
        id: 2,
        postName: 'пост 2',
        author: 'Семен',
        date: date,
        postText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laboru... '
      }
    ]
  })
})

app.get('/register', async function(req, res) {
  var data = {
    'title': 'Регистрация'
  }
  data.errors = []
  res.render('register', data)
})

app.post('/register', async function(req, res) {

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

  if (!result.error && wantedEmail == null) {
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

  }

  res.render('register', data)
})

app.post('/auth', async function(req, res) {
  res.render('auth', {
    title: 'Авторизация',
    error: 'Неверный логин или пароль',
    visibleError: false
  })
})
app.get('/auth', async function(req, res) {
  res.render('auth', {
    title: 'Авторизация',
    error: 'Неверный логин или пароль',
    visibleError: false
  })
})


app.get('/post/:id', async function(req, res) {
  res.render('post', {
    title: 'Статья',
    author: 'Семен',
    date: '15.15.2015',
    postText: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laboru Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incid :) "
  })
})

app.post('/post/:id', async function(req, res) {
  res.render('post', {
    title: 'Статья',
    author: 'Семен',
    date: '15.15.2015',
    postText: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laboru Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor in cid :) "
  })
})

app.get('/post/new', async function(req, res) {
  res.render('new', {
    title: 'Новая статья',
    error: 'Проверьте правильность заполнения',
    visibleError: false
  })
})

app.get('/post/:id/edit', async function(req, res) {
  res.render('edit', {
    title: 'Редактировать статью',
    error: 'Проверьте правильность заполнения',
    visibleError: false
  })
})

app.put('/post/:id', async function(req, res) {
  res.render('post', {
    title: 'Статья',
    author: 'Семен',
    date: '15.15.2015',
    postText: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laboru Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incid :) "
  })
})

app.post('/post/new', async function(req, res) {
  res.render('new', {
    title: 'Новая статья',
    error: 'Проверьте правильность заполнения',
    visibleError: false
  })
})

app.get('/author/:id', function(req, res) {
  res.render('author', {
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
  })
})

models.sequelize.authenticate().then(function() {
  console.log("CONNECTED! ")
  app.listen(3000, function() {
    console.log('3000 port activated')
  })
}).catch(function(err) {
  console.log("No No No")
})

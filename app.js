var express = require('express')
var passport = require('./auth')
var models = require('./models')
var app = express()


app.use(passport.initialize())
app.use(passport.session())

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
  res.render('register', {
    title: 'Регистрация',
    error: 'Проверьте правильность заполнения',
    visibleError: false
  })
})

app.post('/register', async function(req, res) {
  res.render('register', {
    title: 'Регистрация',
    error: 'Проверьте правильность заполнения',
    visibleError: false
  })
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

models.sequelize.authenticate().then(function () {
        console.log("CONNECTED! ")
    }).catch(function (err) {
        console.log("No No No")
    }).done()

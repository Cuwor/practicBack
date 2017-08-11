var express = require('express');
var app = express();

app.set('view engine', 'ejs')
app.get('/', function(res, res) {
  res.render('index', {
    title: 'Все статьи',
    author: 'Семен',
    date: '15.15.2015'
  });
})
app.listen(3000, function() {
  console.log('Example 3000 port');
})

app.get('/register', function(req, res) {
  res.render('register', {
    title: 'Регистрация',
    error: 'Проверьте правильность заполнения',
    "visibleError":false
  });
});

app.post('/register', function(req, res) {
  res.render('register', {
    title: 'Регистрация',
    error: 'Проверьте правильность заполнения',
    "visibleError":false
  });
});

app.post('/auth', function(req, res) {
  res.render('auth', {
    title: 'Авторизация',
    error: 'Неверный логин или пароль',
    "visibleError":false
  });
});
app.get('/auth', function(req, res) {
  res.render('auth', {
    title: 'Авторизация',
    error: 'Неверный логин или пароль',
    "visibleError":false
  });
});

app.get('/page/:page', function(req, res) {
  res.render('index', {
    title: 'Все статьи',
    author: 'Семен',
    date: '15.15.2015'
  });
});

app.get('/post/:id', function(req, res) {
  res.render('post', {
    title: 'Статья',
    author: 'Семен',
    date: '15.15.2015'
  });
});

app.post('/post/:id', function(req, res) {
  res.render('post', {
    title: 'Статья',
    author: 'Семен',
    date: '15.15.2015'
  });
});

app.get('/post/new', function(req, res) {
  res.render('new', {
    title: 'Новая статья',
    error: 'Проверьте правильность заполнения',
    "visibleError":false
  });
});

app.get('/post/:id/edit', function(req, res) {
  res.render('edit', {
    title: 'Редактировать статью',
    error: 'Проверьте правильность заполнения',
    "visibleError":false
  });
});

app.put('/post/:id', function(req, res) {
  res.render('post', {
    title: 'Cтатья'
  });
});

app.post('/post/new', function(req, res) {
  res.render('new', {
    title: 'Новая статья',
    error: 'Проверьте правильность заполнения',
    "visibleError":false
  });
});

app.get('/author/:id', function(req, res) {
  res.render('author', {
    title: 'Карточка автора',
    author: 'Семен',
    posts: [{'id':1, 'postName':'пост 1'},
    {'id':2, 'postName':'пост 2'}]
  });
});

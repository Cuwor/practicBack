var express = require('express');
var app = express();

app.set('view engine', 'ejs')
app.get('/', function(res, res) {
  res.render('index', {
    title: 'Все статьи',
    author: 'Семен',
    date: '15.15.2015',
    posts: [{
        'id': 1,
        'postName': 'пост 1',
        'postText': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum... '
      },
      {
        'id': 2,
        'postName': 'пост 2',
        'postText': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laboru... '
      }
    ]
  });
});

app.get('/page/:page', function(req, res) {
  res.render('index', {
    title: 'Все статьи',
    author: 'Семен',
    date: '15.15.2015',
    posts: [{
        'id': 1,
        'postName': 'пост 1',
        'postText': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum... '
      },
      {
        'id': 2,
        'postName': 'пост 2',
        'postText': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laboru... '
      }
    ]
  });
});

app.listen(3000, function() {
  console.log('Example 3000 port');
})

app.get('/register', function(req, res) {
  res.render('register', {
    title: 'Регистрация',
    error: 'Проверьте правильность заполнения',
    "visibleError": false
  });
});

app.post('/register', function(req, res) {
  res.render('register', {
    title: 'Регистрация',
    error: 'Проверьте правильность заполнения',
    "visibleError": false
  });
});

app.post('/auth', function(req, res) {
  res.render('auth', {
    title: 'Авторизация',
    error: 'Неверный логин или пароль',
    "visibleError": false
  });
});
app.get('/auth', function(req, res) {
  res.render('auth', {
    title: 'Авторизация',
    error: 'Неверный логин или пароль',
    "visibleError": false
  });
});


app.get('/post/:id', function(req, res) {
  res.render('post', {
    title: 'Статья',
    author: 'Семен',
    date: '15.15.2015',
    postText: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laboru Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incid :) "
  });
});

app.post('/post/:id', function(req, res) {
  res.render('post', {
    title: 'Статья',
    author: 'Семен',
    date: '15.15.2015',
    postText: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laboru Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incid :) "
  });
});

app.get('/post/new', function(req, res) {
  res.render('new', {
    title: 'Новая статья',
    error: 'Проверьте правильность заполнения',
    "visibleError": false
  });
});

app.get('/post/:id/edit', function(req, res) {
  res.render('edit', {
    title: 'Редактировать статью',
    error: 'Проверьте правильность заполнения',
    "visibleError": false
  });
});

app.put('/post/:id', function(req, res) {
  res.render('post', {
    title: 'Статья',
    author: 'Семен',
    date: '15.15.2015',
    postText: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laboru Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incid :) "
  });
});

app.post('/post/new', function(req, res) {
  res.render('new', {
    title: 'Новая статья',
    error: 'Проверьте правильность заполнения',
    "visibleError": false
  });
});

app.get('/author/:id', function(req, res) {
  res.render('author', {
    title: 'Карточка автора',
    author: 'Семен',
    posts: [{
        'id': 1,
        'postName': 'пост 1'
      },
      {
        'id': 2,
        'postName': 'пост 2'
      }
    ]
  });
});

var express = require('express');
var app = express();

app.set('view engine', 'ejs')
app.get('/', function(res, res) {
  res.render('index');
})
app.listen(3000, function() {
  console.log('Example 3000 port');
})

app.get('/register', function (req, res) {
  res.render('register');
});

app.post('/register', function (req, res) {
  res.render('register');
});

app.post('/auth', function (req, res) {
  res.render('auth');
});
app.get('/auth', function (req, res) {
  res.render('auth');
});

app.get('/page/:page', function (req, res) {
  res.render('index');
});

app.get('/post/:id', function (req, res) {
  res.render('post');
});

app.post('/post/:id', function (req, res) {
  res.render('post');
});

app.get('/post/new', function (req, res) {
  res.render('new');
});

app.get('/post/:id/edit', function (req, res) {
  res.render('edit');
});

app.put('/post/:id', function (req, res) {
  res.render('post');
});

app.post('/post/new', function (req, res) {
  res.render('new');
});

app.get('/author/:id', function (req, res) {
  res.render('author');
});
